# Read the YAML config file
config=$(cat validation.yml)

# Extract values using yq
api_url=$(echo "$config" | yq -r '.api_url')
branch=$(echo "$config" | yq -o=json '.variables.prototype_branch')
folder_name=$1
owner=$2
repo=$3

project_styles_json_resp=$(curl --silent --location ''$api_url'/variable/get-project-styles-json?folderName='$folder_name'')

# Get styles_json_path and project_styles_json_content from project_styles_json_resp
styles_json_path=$(echo "$project_styles_json_resp" | jq -r '.path')
project_styles_json_content=$(echo "$project_styles_json_resp" | jq -r '.fileContent' | tr -d '\n')

# Concatenate request data
branch_request_data='{
  "owner": "'"$owner"'",
  "repo": "'"$repo"'",
  "branch": '"$branch"',
  "path": "'"$styles_json_path"'"
}'

hardcoded_vars_json_resp=$(curl --silent --location ''$api_url'/variable/get-variables-hardcoded?folderName='$folder_name'&exclude=**/'$styles_json_path'')

echo " "
if [ -n "$hardcoded_vars_json_resp" ]; then
    # Print the formatted output
    echo "Warning: The following hardcoded variables were found:"
    echo "$hardcoded_vars_json_resp" | jq -r '
      .[] | 
      .path as $path | 
      .lines as $lines | 
      .colors as $colors | 
      range(0; $lines | length) as $i | 
      "\($path): \($lines[$i]) | \($colors[$i])"
    ' 
else
    echo "No hardcoded variables found"
fi


# Make the curl request to validate the variables
prototype_styles_json_resp=$(curl --silent --location ''$api_url'/variable/get-branch-styles-json' \
--header 'Content-Type: application/json' \
--data-raw "$branch_request_data")

prototype_styles_json_content=$(echo "$prototype_styles_json_resp" | jq -r '.fileContent' | tr -d '\n')

validation_request_data='{
  "figmaVariables": '"$prototype_styles_json_content"',
  "projectVariables": '"$project_styles_json_content"'
}'

validation_resp=$(curl --silent --location ''$api_url'/variable/validate' \
--header 'Content-Type: application/json' \
--data-raw "$validation_request_data")

# Check for inconsistent variables
inconsistent_variables=$(echo "$validation_resp" | jq -r '.inconsistent[] | .name + ": " + .figmaValue + " != " + .projectValue')

echo " "
if [ -n "$inconsistent_variables" ]; then
    echo "Error: The following inconsistant variables were found:"
    echo "<name>: <prototype_value> != <system_value>"
    echo "$inconsistent_variables"
    exit 1
else
    echo "All variables are consistent"
fi
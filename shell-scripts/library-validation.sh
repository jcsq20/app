# Read the YAML config file
config=$(cat validation.yml)

# Extract values using yq
api_url=$(echo "$config" | yq -r '.api_url')
libraries=$(echo "$config" | yq -o=json '.libraries.validate')
matchTypeRequirement=$(echo "$config" | yq -r '.libraries.matchTypeRequirement // "total"')
folder_name=$1

package_json_location_resp=$(curl --silent --location ''$api_url'/repository/package-json-paths?folderName='$folder_name'')

# Get package_json_path from package_json_location_resp
package_json_path=$(echo "$package_json_location_resp" | jq -r '.[0]')

# Concatenate package_json_path and folder_name
request_data='{
  "packageJsonPath": "'"$package_json_path"'",
  "folderName": "'"$folder_name"'",
  "libraries": '$libraries'
}'

# Make the curl request to validate the libraries
validation_resp=$(curl --silent --location ''$api_url'/library/validate' \
--header 'Content-Type: application/json' \
--data-raw "$request_data")

# Check for matchType based on matchTypeRequirement
if [ $matchTypeRequirement == "total" ]; then
    echo "Total"
    null_match_type=$(echo "$validation_resp" | jq -r '.result[] | select(.matchType != "total") | .search.name + "@" + .search.version')
else
    echo "other"
    null_match_type=$(echo "$validation_resp" | jq -r '.result[] | select(.matchType == null) | .search.name + "@" + .search.version')
fi

echo " "
if [ -n "$null_match_type" ]; then
    echo "Error: The following libraries don't have $matchTypeRequirement match"
    echo "$null_match_type"
    exit 1
else
    echo "All libraries found"
fi
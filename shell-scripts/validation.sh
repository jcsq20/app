#!/bin/bash

# Install yq if it is not already installed
if ! command -v yq &> /dev/null
then
    echo "yq could not be found, installing yq..."
    curl -L https://github.com/mikefarah/yq/releases/download/v4.44.3/yq_linux_amd64 -o /usr/local/bin/yq
    chmod +x /usr/local/bin/yq
fi

# Read the YAML config file
config=$(cat validation.yml)

# Extract values using yq
api_url=$(echo "$config" | yq -r '.api_url')
github_owner=$(echo "$config" | yq -r '.github.owner')
github_repo=$(echo "$config" | yq -r '.github.repo')
libraries=$(echo "$config" | yq -o=json '.libraries' || echo null)
variables=$(echo "$config" | yq -o=json '.variables' || echo null)
ui=$(echo "$config" | yq -o=json '.ui' || echo null)

# Install jq if it is not already installed
if ! command -v jq &> /dev/null
then
    echo "jq could not be found, installing jq..."
    sudo apt-get update
    sudo apt-get install -y jq
fi

# Make the curl request and store the response in a variable
response=$(curl --silent --location ''$api_url'/repository/fetch' \
--header 'Content-Type: application/json' \
--data '{
   "owner": "'"$github_owner"'",
   "repo": "'"$github_repo"'"
}')

# Extract the desired property using jq
folder_name=$(echo "$response" | jq -r '.folderName')

if [ -z "$folder_name" ]; then
    echo "Error: folderName not found in the response"
    exit 1
fi

if [ -n "$libraries" ] && [ "$libraries" != "null" ]; then
    # Run the library-validation.sh script with the folder_name as an argument
    chmod +x library-validation.sh
    ./library-validation.sh "$folder_name"
    library_status=$?
else
    echo " "
    echo "Skipping library validation because libraries is empty"
    library_status=0
fi

if [ -n "$variables" ] && [ "$variables" != "null" ]; then
    # Run the variable-validation.sh script with the folder_name as an argument
    chmod +x variable-validation.sh
    ./variable-validation.sh "$folder_name" "$github_owner" "$github_repo"
    variable_status=$?
else
    echo " "
    echo "Skipping variable validation because variables is empty"
    variable_status=0
fi

if [ -n "$ui" ] && [ "$ui" != "null" ]; then
    # Run the ui-validation.sh script with the folder_name as an argument
    chmod +x ui-validation.sh
    ./ui-validation.sh
    ui_status=$?
else
    echo " "
    echo "Skipping ui validation because is empty"
    ui_status=0
fi

# Check the results of the validation scripts
if [ $library_status -eq 1 ] || [ $variable_status -eq 1 ] || [ $ui_status -eq 1 ]; then
    exit 1
fi
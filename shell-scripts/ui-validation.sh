#!/bin/bash

# Read the YAML config file
config=$(cat validation.yml)

# Extract values using yq
api_url=$(echo "$config" | yq -r '.api_url')
score_threshold=$(echo "$config" | yq -r '.ui.scoreThreshold')
projectID=$(echo "$config" | yq -o=json '.ui.projectID')
screenConfig=$(echo "$config" | yq -o=json '.ui.screenConfig')
screens=$(echo "$config" | yq -o=json '.ui.screens')

validation_request_data='{
  "projectID": '"$projectID"',
  "screenConfig": '$screenConfig',
  "screens": '$screens'
}'

validation_resp=$(curl --silent --location ''$api_url'/ui/validate-by-url' \
--header 'Content-Type: application/json' \
--data-raw "$validation_request_data")

# Extract scores and comments, and compare with score_threshold
low_scores=$(echo "$validation_resp" | jq --argjson threshold "$score_threshold" '
  .screens[] | .name as $screen_name | .result | 
  {color: .color, text: .text, layout: .layout} |
  to_entries | map(select(.value.score < $threshold) | {type: .key, score: .value.score, comments: .value.comments, screen: $screen_name}) |
  if length > 0 then . else empty end
')

if [ -n "$low_scores" ]; then
  echo "Error: The following scores are below the threshold of $score_threshold:"
  echo "$low_scores" | jq -r '.[] | "\(.screen) - \(.type) score: \(.score)\nComments:\n\(.comments | map("  - \(.element): \(.difference)") | join("\n"))\n"'
  exit 1
else
  echo "All scores are above the threshold of $score_threshold."
fi
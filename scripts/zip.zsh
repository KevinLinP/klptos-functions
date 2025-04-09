#!/bin/zsh

# Check if exactly one argument is provided
if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <filename>"
  exit 1
fi

input_file="$1"

# Check if the input file exists
if [ ! -f "$input_file" ]; then
  echo "Error: File '$input_file' not found."
  exit 1
fi

# Create deploy directory if it doesn't exist
mkdir -p deploy

# Get the base filename without path
base_filename=$(basename "$input_file")
# Remove extension and add .zip
output_filename="${base_filename%.*}.zip"
# Set the output path in the deploy directory
output_file="deploy/$output_filename"

# Create the zip archive
zip "$output_file" "$input_file"

if [ $? -eq 0 ]; then
  echo "Successfully created '$output_file' containing '$input_file'."
else
  echo "Error creating zip file."
  exit 1
fi

exit 0

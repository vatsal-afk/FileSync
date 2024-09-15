#!/bin/bash

CLI_JS_PATH="./cli.js"

# Check if CLI script exists
if [ ! -f "$CLI_JS_PATH" ]; then
    echo "Error: CLI script '$CLI_JS_PATH' not found!"
    exit 1
fi

if [ $# -lt 1 ]; then  # Check if at least one argument is provided
    echo "Usage: $0 {init|add|commit|branch|checkout} [arguments]"
    exit 1
fi

COMMAND=$1
shift
ARGS="$@"

# Execute the Node.js script with the command and arguments
node "$CLI_JS_PATH" "$COMMAND" "$ARGS"

# Check if node execution was successful
if [ $? -ne 0 ]; then
    echo "Error: Command execution failed!"
    exit 1
fi

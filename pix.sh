#!/bin/bash

CLI_JS_PATH="./cli.js"

if [ $# -lt 1 ]; then  # >=1 arg provided
    echo "Usage: $0 {init|add|commit|branch|checkout} [arguments]"
    exit 1
fi

COMMAND=$1
shift
ARGS="$@"

node $CLI_JS_PATH $COMMAND $ARGS

#!/bin/bash

# Set PYTHONPATH to the project root directory
export PYTHONPATH=$(pwd)

# Run the Python file
fastapi dev books.py
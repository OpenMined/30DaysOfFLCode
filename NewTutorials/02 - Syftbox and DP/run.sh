#!/usr/bin/env sh

# this will create a Python virtual environment
uv venv

# install the app's dependencies
uv pip install -r requirements.txt

# run app using the Python version from the virtual environment
uv run main.py

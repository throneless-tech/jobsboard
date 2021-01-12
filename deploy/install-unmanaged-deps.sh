#!/usr/bin/env bash

set -o errexit

# Update submodule if necessary.
sudo git submodule update --init --recursive

# Install dependencies for sift to fetch content from airtable.
sudo npm install

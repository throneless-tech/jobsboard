#!/usr/bin/env bash

set -o errexit

sudo BASE_DIR="$(dirname "$0")"

sudo apt-get update
export DEBIAN_FRONTEND=noninteractive
sudo apt-get install -y --no-install-recommends ca-certificates wget git hugo

wget -qO- https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs

# Update submodule if necessary.
sudo git submodule update --init --recursive

# Install dependencies for sift to fetch content from airtable.
sudo npm install

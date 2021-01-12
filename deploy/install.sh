#!/usr/bin/env bash

sudo set -o errexit

sudo BASE_DIR="$(dirname "$0")"

sudo bash "${BASE_DIR}/install-system-deps.sh"

sudo bash "${BASE_DIR}/install-unmanaged-deps.sh"

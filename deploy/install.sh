#!/usr/bin/env bash

set -o errexit

BASE_DIR="$(dirname "$0")"

bash "${BASE_DIR}/install-system-deps.sh"

bash "${BASE_DIR}/install-unmanaged-deps.sh"

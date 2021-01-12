#!/usr/bin/env bash

set -o errexit

npm run generate:jobs

npm run build

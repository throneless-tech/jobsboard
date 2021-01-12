#!/usr/bin/env bash

set -o errexit

sudo npm run generate:jobs

sudo npm run build

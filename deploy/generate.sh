#!/usr/bin/env bash

set -o errexit

sudo AIRTABLE_API_KEY=$AIRTABLE_API_KEY AIRTABLE_BASE_ID=$AIRTABLE_BASE_ID npm run generate:jobs

# sudo npm run build

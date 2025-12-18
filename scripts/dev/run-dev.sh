#!/usr/bin/env bash

### load env vars ###
set -a                      # export all vars
source .env                 # load env vars from .env
set +a                      # stop exporting vars
### load env vars ###

docker-compose up --build

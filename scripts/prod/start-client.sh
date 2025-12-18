#!/usr/bin/env bash
set -e

REQUIRED_VARS=("VITE_API_BASE_URL")
for VAR in "${REQUIRED_VARS[@]}"; do
  if [ -z "${!VAR}" ]; then
    echo "❌ $VAR is not set"
    exit 1
  fi
done

docker build \
  --build-arg VITE_API_BASE_URL="${VITE_API_BASE_URL}" \
  -t ecocapiba-frontend \
  ../../client

docker run -d \
  --name ecocapiba-frontend \
  -p 3000:3000 \
  ecocapiba-frontend

#!/usr/bin/env bash
set -e

REQUIRED_VARS=("DATABASE_URL", "JWT_SECRET_KEY")
for VAR in "${REQUIRED_VARS[@]}"; do
  if [ -z "${!VAR}" ]; then
    echo "❌ $VAR is not set"
    exit 1
  fi
done

docker build -t ecocapiba-backend ../../api

docker run -d \
  --name ecocapiba-backend \
  -p 8080:8080 \
  -e DATABASE_URL="${DATABASE_URL}" \
  ecocapiba-backend

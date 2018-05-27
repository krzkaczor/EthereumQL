#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"
cd ../test

solc --abi --bin -o ./contract-artifacts --overwrite ./contracts/*.sol
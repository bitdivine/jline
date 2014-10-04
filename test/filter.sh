#!/usr/bin/env bash

cd "$(dirname "$0")/.."

set -eux

    ./bin/filter.js --help                || (($? == 2))
    ./bin/filter.js "foo.bar > 6" <test/data.jsonl

echo OK

#!/usr/bin/env bash

cd "$(dirname "$0")/.."

set -eux

    ./bin/foreach.js --help                || (($? == 2))
    ./bin/foreach.js "if(record.gump){emit(record);}" <test/data.jsonl || (($? == 0))

echo OK

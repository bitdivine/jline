
cd "$(dirname "$0")/.."

set -eux

    ./bin/by.js --help					|| (($? == 2))
    ./bin/by.js year -- sightings <test/by.jsonl

echo OK


cd "$(dirname "$0")/.."

set -eux

    ./bin/csv.js --help                || (($? == 2))
    ./bin/csv.js <test/data.csv.jsonl

echo OK

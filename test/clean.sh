
cd "$(dirname "$0")/.."

set -eux

    ./bin/clean.js --help                || (($? == 2))
    ./bin/clean.js <test/data.jsonl      || (($? == 1))
    ./bin/clean.js <test/data.clean.jsonl|| (($? == 0))

echo OK

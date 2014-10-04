

set -eux
cat test/data.jsonl | ./bin/sort.js foo.bar
cat test/data.jsonl | ./bin/filter.js 'foo.bar<=7'


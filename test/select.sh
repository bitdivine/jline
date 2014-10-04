
cd "$(dirname "$0")/.."

set -eux

    echo '{"a":1,"b":2,"c":3,"d":4,"e":5}' | ./bin/select.js a 'e:vowel'

echo OK

jline-join-left
===============

Join stdin with zero or more JSON line files on a given common join key.

## Command line:

    printf "%s\n" '{"id":999, "price":-1}' '{"id":666, "price":1000000}' > prices.jline
    printf "%s\n" '{"id":999, "weight":2}' '{"id":666, "weight":99}' > weights.jline
    echo '{"id":999, "description":"pineapple"}' | jline-join-left id prices.jline weights.jline

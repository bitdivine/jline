jline-sort
===========

Sorts a file where each line is a JSON object by the provided key:

    cat data | jline-sort foo.bar # sorts by foo.bar
    cat data | jline-sort 'foo["key with spaces"]'
    cat data | jline-sort '[2]'


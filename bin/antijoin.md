jline-antijoin
==============

Finds records in the second file that have no counterpart in the first.

## Command line:

    printf "%s\n" '{"a":1}' '{"a":2}' > ,file1.jl
    printf "%s\n" '{"a":1}' '{"a":3}' > ,file2.jl
    jline-antijoin a ,file1.jl ,file2.jl
    -> {"a":3}


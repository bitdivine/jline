jline-select
============

Keep just the selected fields from each JSON line, optionally renaming it.


## Command line:

    cat test/data.jsonl | jline-select foo.bar bat

    echo '{"a":1,"b":2,"c":3,"d":4,"e":5}' | select a e:vowel
    # yields: {"a"1,"vowel":5}



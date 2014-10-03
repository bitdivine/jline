jline
=====

Sort, grep and join files where every line is JSON.  JSON has long surpassed CSV as the most common, useful and robust format in much of the code that I encounter but as yet it has no parallel to the array of fine tuned command line tools that target CSV.  This collection fills some of the gaps.

The JSON lines format is formally described at [http://jsonlines.org/](http://jsonlines.org/).

# Installation

    npm install -g jline

# Usage

Assume a file `dat.jsonl` with lines:

    {"foo":{"bar":9,"bat":49},"mitz":"ding"}
    {"foo":{"bar":4,"bat":9},"mitz":"do"}
    {"foo":{"bar":6,"bat":17},"mitz":"mnogo"}

Then:

    cat dat.jsonl | jline-sort foo.bar                        # Sorts on the key foo.bar
    cat dat.jsonl | jline-filter 'foo.bat>9'                  # Selects just those lines
    cat dat.jsonl | jline-select foo.bar:bar foo.bat:bat mitz # Returns lines such as {"bar":9,"bat":49,"mitz":"ding"}


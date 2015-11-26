jline
=====

Sort, grep and join files where every line is JSON.  JSON has long surpassed CSV as the most common, useful and robust format in much of the code that I encounter but as yet it has no parallel to the array of fine tuned command line tools that target CSV.  This collection fills some of the gaps.

The JSON lines format is formally described at [http://jsonlines.org/](http://jsonlines.org/).  Other pages of interest are [Wikipedia](https://en.wikipedia.org/wiki/Line_Delimited_JSON) and [Newline Delimited JSON](http://trephine.org/t/index.php?title=Newline_delimited_JSON).

# Installation

Install [node](http://nodejs.org/), if you don't have it already:

    curl "https://gist.githubusercontent.com/bitdivine/309a1594e891dec70461/raw/4a96a04dfa179eee531647347c485a8750b9ea66/install-nodejs.sh" > node-installer.sh
    sudo sh node-installer.sh

Install jline with the node package manager:

    sudo npm install -g jline

# Examples

Assume a file `dat.jsonl` with lines:

    {"foo":{"bar":9,"bat":49},"mitz":"ding"}
    {"foo":{"bar":4,"bat":9},"mitz":"do"}
    {"foo":{"bar":6,"bat":17},"mitz":"mnogo"}

Then:

    cat dat.jsonl | jline-clean                               # Removes all but clean JSON lines
    cat dat.jsonl | jline-sort foo.bar                        # Sorts on the key foo.bar
    cat dat.jsonl | jline-filter 'foo.bat>9'                  # Selects just those lines
    cat dat.jsonl | jline-select foo.bar:bar foo.bat:bat mitz # Returns lines such as {"bar":9,"bat":49,"mitz":"ding"}
    cat dat.jsonl | jline-pretty                              # Pretty-prints the JSON
    # For a full awk-like tool, write javascript:
    cat dat.jsonl | jline-foreach 'console.log(Math.round(record.foo.bar / record.foo.bat))'
    cat dat.jsonl | jline-foreach begin::global.sum=0 sum+=record.foo.bar end::'emit(sum)'
    cat dat.jsonl | jline-foreach 'begin::global.c=require("crypto")' 'record.hash=c.createHash("sha512").update(record.passwd).digest("hex");emit(record)'
    echo '{"url":"http://winning.gold"}' | jline-foreach 'beg::req=require("request-promise")' 'req(record.url).then(console.log)'
    ... etc
    # Import from other formats:
    cat data.csv  | jline-csv2jl                              # Convert CSV into lines of JSON dictionaries
    cat data.csv  | jline-csv2jla                             # Convert CSV into lines of JSON arrays
    echo "SELECT 1,2,3;" | mysql | jline-mysql2jl             # Get data from MySQL, one line per record
    jline-json2jl -a --path=data.sales dump.json              # Extract an array from inside a JSON blob
    # Export to other formats:
    cat data.jline | jline-csv

# Documentation

Use `--help` or refer to the markdown files:

### Manipulate jlines
* [clean](./bin/clean.md) - keeps only well formed JSON lines
* [filter](./bin/filter.md) - Keeps only the records you choose.
* [parsePath](./bin/parsePath.md) `'abba.cadabba[4].u' -> ['abba','cadabba',4,'u']`
* [sort](./bin/sort.md) - sorts by a given key.
* [select](./bin/select.md) - Selects just a few fields from each record.
* breakdown [by](./bin/by.md) - Sums fields by a breakdown.

### Power Tools
* [foreach](./bin/foreach.md) - Execute arbitrary code for each record.  Awk for JSON lines.
* [map](./bin/map.md) - DEPRECATED as foreach is much more powerful without being more complicated.

### Output
* [pretty](./bin/pretty.md) - Pretty prints the JSON.
* [csv](./bin/csv.md) - converts to csv

### Input
* [jline-mysql2jl](bin/mysql2jl.md) - EXPERIMENTAL - mysql output to JSON dictionaries
* [jline-mysql2jla](bin/mysql2jla.md) - EXPERIMENTAL - mysql output to JSON arrays
* [jline-json2jl](bin/json2jl.md) - EXPERIMENTAL - JSON to JSON lines.

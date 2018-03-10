csv.md
======

Convert JSON lines to CSV.

When reading from stdin, this uses the keys of the first line as the column headings.

When the input file is given as an argument it is scanned twice, once to collect all the keys and a second time to emit the data.

## Command line:

    cat test/data.jsonl | jline-csv > test/,data.csv

## Nodejs:

    var jline = require('jline');

    // Open a data stream of your choice:
    // var stream = process.stdin;
    var stream = require('fs').createReadStream("test/data.jsonl");

    // For every jline emit a csv line:
    jline.toCsv(jline.parseStream(stream))
    .on('csvHeader',  function(line){console.log(line);})
    .on('csv',        function(line){console.log(line);});

csv.md
======

Convert JSON lines to CSV.

This uses the keys of the first line as the column headings.

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

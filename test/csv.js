#!/usr/bin/env node

    var jline = require('../index');

    // Open a data stream of your choice:
    // var stream = process.stdin;
    var stream = require('fs').createReadStream(__dirname+"/data.csv.jsonl");

    // For every jline emit a csv line:
    jline.streamToCsv(stream)
    .on('csvHeader',  function(line){console.log(line);})
    .on('csv',        function(line){console.log(line);});


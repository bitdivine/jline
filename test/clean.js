#!/usr/bin/env node

    var parseJlineStream = require('../index').parseStream;

    // Open a data stream of your choice:
    // var stream = process.stdin;
    var stream = require('fs').createReadStream(__dirname+"/data.jsonl");

    parseJlineStream(stream)
    .on('record',     function(parsed, lineNumber, line){console.log(parsed);})
    .on('parseWarn',  function(error,  lineNumber, line){console.error("Comment or blank line on line", lineNumber);})
    .on('parseError', function(error,  lineNumber, line){console.error("Malformed JSON on line", lineNumber, error);})
    .on('end',        function(){console.log("Finito!");});



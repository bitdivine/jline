clean.md
========

Select just those JSON lines that are well formed.

## Command line:

    cat test/data.jsonl | jline-clean

Malformed lines are reported on stderr but can be ignored:

    cat test/data.jsonl | jline-clean 2>/dev/null

## Nodejs:

This emits a `jline` event for every correctly parsed JSON line:

    var parseJlineStream = require('jline').parseStream;

    // Open a data stream of your choice:
    // var stream = process.stdin;
    var stream = require('fs').createReadStream("test/data.jsonl");

    // Get the data:
    parseJlineStream(stream)
    .on('jline',      function(parsed, lineNumber, line){console.log(parsed);});

    // To detect errors:
    parseJlineStream(stream)
    .on('jline',      function(parsed, lineNumber, line){console.log(parsed);})
    .on('parseWarn',  function(error,  lineNumber, line){console.error("Comment or blank line on line", lineNumber);})
    .on('parseError', function(error,  lineNumber, line){console.error("Malformed JSON on line", lineNumber, error);})
    .on('end',        function(){console.log("Finito!");});

    // To scream if there are errors:
    parseJlineStream(stream, {loglevel:'warn', dielevel:'error'})
    .on('jline',      function(parsed, lineNumber, line){console.log(parsed);});
    
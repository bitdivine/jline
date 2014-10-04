#!/usr/bin/env node

function help(){
    console.error
    ([ "Filter JSON lines."
     , ""
     , "Simple usage:"
     , "    echo '{\"bumble\":{\"bee\":99}}' | filter 'bumble.bee>3'"
     , "    echo '{\"not\":\"here\"}'        | filter 'not !== \"there\"'"
     , ""
     , "Advanced usage:  Provide your own function that applies to each 'record':"
     , "    echo '{\"bumble\":{\"bee\":99}}' | filter -f 'return Math.sin(record.bumble.bee) > 1;'"
     ].join("\n")
    );
}

if ((process.argv[2] === undefined) || (process.argv[2] === '--help')) {
    help();
    process.exit(1);
}

var code  = (process.argv[2] === '-f')
          ? Function('record',process.argv[3])
          : Function('record', 'return ('+(process.argv[2].replace(/(^|[^"'])\b([a-zA-Z_][a-zA-Z0-9]*)/g, '$1record.$2'))+');');

var lineNumber = 0;

process.stdin
.pipe(require('split')())
.on('data', function(line){
    lineNumber++;
    var record;
    try {
        record = JSON.parse(line);
    }catch(e){
        // Does it look as if it's meant to be JSON?
        if (!/^\W+(#|$)/.test(line)) {
            console.error('Skipping malformed line', lineNumber);
        }
    }
    if(code(record)) {
        console.log(JSON.stringify(record));
    }
});


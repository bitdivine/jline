#!/usr/bin/env node

// Usage: echo '{"bumble":{"bee":99}}' | filter 'bumble.bee>3'
//        echo '{"not":"here"}'        | filter 'not !== "there"'
//        echo '{"bumble":{"bee":99}}' | filter -f 'return Math.sin(record.bumble.bee) > 1;'

var code  = (process.argv[2] === '-f')
          ? Function('record',process.argv[3])
          : Function('record', 'return ('+(process.argv[2].replace(/(^|[^"'])\b([a-zA-Z_][a-zA-Z0-9]*)/g, '$1record.$2'))+');');

process.stdin
.pipe(require('split')())
.on('data', function(line){
    if (line.charAt(0) === '{'){
        var record = JSON.parse(line);
        if(code(record)) {
            console.log(JSON.stringify(record));
        }
    }
});


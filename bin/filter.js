#!/usr/bin/env node

var parseStream = require('./clean');

function streamFilter(stream, code){
    return parseStream(stream)
    .on('jline', function(record, lineNumber, rawLine){
        if (code(record)){
            this.emit('filtered', record, lineNumber, rawLine);
        }
    });
}

module.exports = streamFilter; // trivial in node so probably won't be wanted.

if(require.main === module) {
  if ((process.argv[2] === undefined) || (process.argv[2] === '--help')) {
    console.error(require('fs').readFileSync(__filename.replace(/.js$/,'.md'),{encoding:'utf8'}));
    process.exit(2);
  }

  var code  = (process.argv[2] === '-f')
            ? process.argv[3]
            : 'return ('+(process.argv[2].replace(/(^|[^"'.[])\b([a-zA-Z_][a-zA-Z0-9]*)/g, '$1record.$2'))+');';

  streamFilter(process.stdin, Function('record',code))
  .on('filtered', function(r,n,l){console.log(l)});
}


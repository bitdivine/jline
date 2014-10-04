#!/usr/bin/env node

// Render lines of JSON as CSV.

var by = process.argv[2];

var parse = require('./clean');

function csvRecord(record){
    var json = JSON.stringify(record);
    return json.substr(1,json.length-2);
}

function streamToCsv(stream){
    var headers;
    parse(process.stdin)
    .on('record', function(line){
        if (!headers) {
            headers = Object.keys(record);
            console.log(csvRecord(headers));
        }
        this.emit('csvrecord', csvRecord(headers.map(function(col){return record[col];})));
    });
}

module.exports = streamToCsv;
module.exports.csvRecord = csvRecord;

if(require.main === module) {
  if (process.argv[2] === '--help') {
    console.error(require('fs').readFileSync(__filename.replace(/.js$/,'.md'),{encoding:'utf8'}));
    process.exit(1);
  }
  var exit = 0;
  parseJlineStream(process.stdin)
  .on('record', function(record, lineNumber, line){console.log(line);})
  .on('parseError', function(e,n,l){console.error("Malformed JSON on line", n, e); exit = 1;})
  .on('end', function(){process.exit(exit);});
}


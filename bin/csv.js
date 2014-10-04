#!/usr/bin/env node

// Render lines of JSON as CSV.

var by = process.argv[2];

var jline = require('../index');

function csvRecord(record){
    var json = JSON.stringify(record);
    return json.substr(1,json.length-2);
}

function streamToCsv(stream){
    var headers;
    return jline.parseStream(process.stdin)
    .on('jline', function(record){
        if (undefined === headers) {
            headers = Object.keys(record);
            this.emit('csvHeader', csvRecord(headers));
        }
        this.emit('csv', csvRecord(headers.map(function(col){return record[col];})));
    });
}

module.exports = streamToCsv;
module.exports.csvRecord = csvRecord;

if(require.main === module) {
  if (process.argv[2] === '--help') {
    console.error(require('fs').readFileSync(__filename.replace(/.js$/,'.md'),{encoding:'utf8'}));
    process.exit(2);
  }
  streamToCsv(process.stdin)
  .on('csvHeader', console.log)
  .on('csv'      , console.log);
}


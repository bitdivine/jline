#!/usr/bin/env node

var fs = require('fs');

// Render lines of JSON as CSV.

var by = process.argv[2];

var parseStream = require('./clean');

function csvRecord(record){
    var json = JSON.stringify(record);
    return json.substr(1,json.length-2);
}

function getHeaders(stream){
    return new Promise(function(yay, nay){
        var headers = {};
        parseStream(stream)
        .on('jline', function(record){
            Object.keys(record).forEach(function(key){
                headers[key] = null;
            })
        })
        .on('end', function(){
            yay(Object.keys(headers))
        })
    });
}

function streamToCsv(stream){
    var headers;
    return parseStream(stream)
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
  process.stdout.on('error',process.exit);
  console.log.apply(null,['#'].concat(process.argv));
  var infile = process.argv[2];
  if (infile === undefined) {
      streamToCsv(process.stdin)
      .on('csvHeader', console.log)
      .on('csv'      , console.log);
  } else {
      getHeaders(fs.createReadStream(infile))
      .then(function(headers){
          console.log(csvRecord(headers));
          parseStream(fs.createReadStream(infile))
          .on('jline', function(record){
            console.log(csvRecord(headers.map(function(col){return (record[col] === undefined)?null:record[col];})));
          });
    });
  }
}


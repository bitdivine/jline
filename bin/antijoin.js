#!/usr/bin/env node

// Find records in the second file that have no counterpart in the first.

var by    = process.argv[2]
  , files = process.argv.slice(3)
  , fs    = require('fs')
  , split = require('split');

var blacklist = {};

process.stdout.on('error',process.exit);

fs.createReadStream(files[0])
    .pipe(split())
    .on('data', function (line) {
        var record;
        try{
            record = JSON.parse(line);
        }catch(e){return;}
        blacklist[record[by]] = record;
    })
    .on('end', function(){
        fs.createReadStream(files[1])
        .pipe(split())
        .on('data', function(line){
            var record;
            try {
                record = JSON.parse(line);
            } catch(e){return;}
            var combined = blacklist[record[by]];
            if (combined === undefined){
                console.log(line);
            }
        });
    });


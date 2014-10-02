#!/usr/bin/env node

// Sorts a file where each line is a JSON object by the provided key:

var by    = process.argv[2]
  , files = process.argv.slice(3)
  , fs    = require('fs')
  , split = require('split');

var ans = {};

fs.createReadStream(files[0])
    .pipe(split())
    .on('data', function (line) {
        var record;
        try{
            record = JSON.parse(line);
        }catch(e){return;}
        ans[record[by]] = record;
    })
    .on('end', function(){
        var survivors = ans;
        ans = {};
        fs.createReadStream(files[1])
        .pipe(split())
        .on('data', function(line){
            var record;
            try {
                record = JSON.parse(line);
            } catch(e){return;}
            var combined = survivors[record[by]];
            if (combined !== undefined){
                Object.keys(record).forEach(function(k){
                    combined[k] = record[k];
                });
                ans[record[by]] = combined;
            }
        })
        .on('end', function(){
            Object.keys(ans).forEach(function(k){console.log(JSON.stringify(ans[k]));});
        });
    });


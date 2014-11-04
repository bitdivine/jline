#!/usr/bin/env node

// Sorts a file where each line is a JSON object by the provided key:

var by    = process.argv[2]
  , files = process.argv.slice(3)
  , fs    = require('fs')
  , split = require('split');

var lefts = {};
var ans = {};

fs.createReadStream(files[0])
    .pipe(split())
    .on('data', function (line) {
        var record;
        try{
            record = JSON.parse(line);
        }catch(e){return;}
        lefts[record[by]] = record;
    })
    .on('end', function(){
        fs.createReadStream(files[1])
        .pipe(split())
        .on('data', function(line){
            var record;
            try {
                record = JSON.parse(line);
            } catch(e){return;}
            var left = lefts[record[by]];
            if (left !== undefined){
                var combined = {};
                Object.keys(record).forEach(function(k){
                    if (undefined === left[k]){
                        combined[k] = '>';
                    }else{
                        combined[k] = [left[k],record[k]];
                    }
                });
                Object.keys(left).forEach(function(k){
                    if (undefined === combined[k]){
                        combined[k] = '<';
                    }
                });
                ans[record[by]] = combined;
            }
        })
        .on('end', function(){
            Object.keys(ans).forEach(function(k){console.log(JSON.stringify(ans[k]));});
        });
    });


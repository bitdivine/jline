#!/usr/bin/env node

var args = require('../lib/opt').fancy({filename:__filename, usage:
[ 'Usage: jline-antijoin (--help|--version)'
, '       jline-antijoin [-l] <join_key> <file1> <file2>'
].join("\n")});

var by    = args['<join_key>']
  , files = [args['<file1>'], args['<file1>']]
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


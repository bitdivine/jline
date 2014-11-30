#!/usr/bin/env node

if ((process.argv[2] === undefined) || (process.argv[2] === '--help')) {
    console.error(require('fs').readFileSync(__filename.replace(/.js$/,'.md'),{encoding:'utf8'}));
    process.exit(1);
}

process.stdout.on('error',process.exit);

var fs = require('fs');
var html = fs.readFileSync(__dirname+'/chart.html', {encoding:'utf8'});
var format = require('./format');

var by  = process.argv[2];  // x-axis
var val = process.argv[3];  // y-axis
var dice = process.argv[4]; // Draw a separate line for each of these (optional).

var lines = [];
process.stdin
.pipe(require('split')())
.on('data', function(line){if (line.charAt(0) === '{') lines.push(JSON.parse(line));})
.on('end', function(x){
    lines = lines.sort(function(a,b){return a[by]>b[by]?1:-1;});
    var strands = {};
    lines.forEach(function(record){
        var toss = record[dice];
        if (undefined === strands[toss]){
            strands[toss] = [];
        }
        strands[toss].push(record);
    });
    var data = Object.keys(strands).map(function(k){
	return {key:k, values:strands[k].map(function(record){

            var legend = Object
            .keys(record)
            .filter(function(s){return ['x','y'].indexOf(s) === -1;})
            .map(function(s){return '<p>'+s+': '+format(s,record[s])+'</p>';})
            .join('\n');

            return {x:record[by], y:record[val], legend:legend};

	})};
    });
    console.log(html.replace(/__X_AXIS__/g, by).replace(/__Y_AXIS__/g, val).replace(/__DATA__/g, JSON.stringify(data)));
});




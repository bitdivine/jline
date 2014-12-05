#!/usr/bin/env node

if ((process.argv[2] === undefined) || (process.argv[2] === '--help')) {
    console.error(require('fs').readFileSync(__filename.replace(/.js$/,'.md'),{encoding:'utf8'}));
    process.exit(2);
}

process.stdout.on('error',process.exit);
console.log.apply(null,['#'].concat(process.argv));

var parseStream = require('./clean');
var parsePath   = require('./parsePath');
var fields = process.argv.slice(2).map(function(s){return s.split(':').map(parsePath);});


function getPath(thing, path){
    path.map(function(bit){
        if (typeof(thing) !== 'undefined') {
            thing = thing[bit];
        }
    });
    return thing;
}
function setPath(dict, path, val){
    var last = path.pop();
    var next;
    while(path.length > 0) {
        next = path.shift(1);
        if (typeof dict[next] === 'undefined') {
            dict[next] = {};
        }
        dict = dict[next];
    }
    dict[last] = val;
}

console.log.apply(null,['#'].concat(process.argv));
var headers;
parseStream(process.stdin)
.on('comment', function(c){console.log(c);})
.on('jline', function(record){
        var filtered = {};
        fields.forEach(function(field){
            var val = getPath(record, [].concat(field[0]));
            setPath(filtered, [].concat(field[field.length-1]), val);
        });
        console.log(JSON.stringify(filtered));
});


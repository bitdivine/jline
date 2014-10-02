#!/usr/bin/env node

// Select the named fields from each record.
// Usage: echo '{"a":1,"b":2,"c":3,"d":4,"e":5}' | select a e:vowel
// yields: {"a"1,"vowel":5}

var fields = process.argv.slice(2).map(function(s){return s.split(':').map(function(s){return s.split('.');});});

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

var headers;
process.stdin
.pipe(require('split')())
.on('data', function(line){
    if (line.charAt(0) === '{'){
      try{
        var record = JSON.parse(line);
        var filtered = {};
        fields.forEach(function(field){
            var val = getPath(record, [].concat(field[0]));
            setPath(filtered, [].concat(field[field.length-1]), val);
        });
        console.log(JSON.stringify(filtered));
      }catch(e){
        console.error('Skipping malformed line');
      }
    }
});


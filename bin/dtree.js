#!/usr/bin/env node

// Sorts a file where each line is a JSON object by the provided key:

var by = process.argv[2];

var lines = [];
process.stdin
.pipe(require('split')())
.on('data', function(line){if (line.charAt(0) === '{') lines.push(JSON.parse(line));})
.on('end', function(x){
    lines = lines.sort(function(a,b){return a[by]>b[by]?1:-1;});
    lines.forEach(function(line){console.log(JSON.stringify(line));});
})

var dt = require('./node_modules/decision-tree/lib/decision-tree');
var np = require('node-psql');
var fs = require('fs');


var breakdown  = process.argv.slice(3); //['VENDOR','REFERRER'];
breakdown.sort();
var target     = process.argv[2]; // AUDIBLE
var attributes = [target].concat(breakdown);

var query = new np.Query('SELECT '+attributes.join(', ')+', COUNT(*) WHERE TIM IS 3 DAYS AGO;');


function restrictDict(keys, dict){ // Return a new dict with only the given keys.
        var ans = {};
        keys.forEach(function(k){return ans[k] = dict[k];});
        return ans;
}

function psqlResponse2dt(response, attributes){
        return response.data.map(function(record){return {weight:record.value, attr:restrictDict(attributes, record)};});
}

query.execute().then(function(response){
        var dt_input = psqlResponse2dt(response, attributes);
        dtv = dt.create_decision_tree(dt_input,target,{attributes:attributes, min_gain:-10000000, weighted:true})
        dts = JSON.stringify(dtv,null,2);
        var filename = ','+target+'__by__'+breakdown.join(',')+'.json';
        console.log(filename);
        fs.writeFile(filename, dts, console.log);
        if (dts.length < 10000) {
                console.log(JSON.stringify(dtv,null,2));
        }
});


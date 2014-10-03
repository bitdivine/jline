#!/usr/bin/env node

function help(){
    console.error
    (["Sorts a file where each line is a JSON object by the provided key:"
     ,"    cat data | jline-sort foo.bar # sorts by foo.bar"
     ,"    cat data | jline-sort 'foo[\"key with spaces\"]'"
     ,"    cat data | jline-sort '[2]'"
     ].join("\n")
    );
}

if ((process.argv[2] === undefined) || (process.argv[2] === '--help')) {
    help();
    process.exit(1);
}

var by = process.argv[2]
  , getPath = new Function("x", "try { return x"+(by.charAt(0)==='['?by:'.'+by) + ";}catch(e){}")
  , lines = []
  , lineNumber = 0;

process.stdin
.pipe(require('split')())
.on('data', function(line){
    lineNumber++;
    if (line.charAt(0) === '{') {
        try {
            lines.push(JSON.parse(line));
        }catch(e){
            console.error('Skipping malformed line', lineNumber);
        }
    }
})
.on('end', function(x){
    lines = lines.sort(function(a,b){return getPath(a)>getPath(b)?1:-1;});
    lines.forEach(function(line){console.log(JSON.stringify(line));});
});





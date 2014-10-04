
if (process.argv[2] === '--help') {
    console.error(require('fs').readFileSync(__filename.replace(/.js$/,'.md'),{encoding:'utf8'}));
    process.exit(1);
}

var lineNumber = 0;
process.stdin
.pipe(require('split')(JSON.parse))
.on('data', function(line){
    lineNumber++;
    console.log(JSON.stringify(line));
})
.on('error', function(e){
    console.error("Malformed JSON on line", ++lineNumber, e);
});


#!/usr/bin/env node

function parseJlineStream(stream, options) {
  options = options || {};
  var logcode = {none:0, error:1, warn:2}[options.loglevel];
  var diecode = {none:0, error:1, warn:2}[options.dielevel];
  var log     = function(msg,code){console.error(msg);};
  log = options.log || log;

  var lineNumber = 0;
  return stream.pipe(require('split')())
  .on('data', function(line){
    lineNumber++;
    try {
        this.emit('jline', JSON.parse(line), lineNumber, line);
    } catch(e){
      // Does it look like an error?
      var serious = !/^\w*(#|$)/.test(line);
      var code = serious?1:2;
      var name = serious?'parseError':'parseWarn';
      this.emit(name, e, lineNumber, line);
      if (code <= logcode) log("Malformed JSON on line "+String(lineNumber)+" "+String(e));
      if (code <= diecode) throw(e);
    }
  });
}

module.exports = parseJlineStream;

if(require.main === module) {
  if (process.argv[2] === '--help') {
    console.error(require('fs').readFileSync(__filename.replace(/.js$/,'.md'),{encoding:'utf8'}));
    process.exit(2);
  }
  var exit = 0;
  parseJlineStream(process.stdin)
  .on('jline',      function(record, lineNumber, line){console.log(line);})
  .on('parseError', function(e,n,l){console.error("Malformed JSON on line", n, e); exit = 1;})
  .on('end',        function(){process.exit(exit);});
}
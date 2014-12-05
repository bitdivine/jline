#!/usr/bin/env node

function parseJlineStream(stream, options) {
  options = options || {};
  var logcode = {none:0, error:1, warn:2, undefined:0}[options.loglevel];
  var diecode = {none:0, error:1, warn:2, undefined:0}[options.dielevel];
  var log     = function(msg,code){console.error(msg);};
  log = options.logger || log;

  var lineNumber = 0;
  var recordNumber = 0;
  var record;

  return stream.pipe(require('split')())
  .on('data', function(line){
    lineNumber++;
    try {
        record = JSON.parse(line);
        recordNumber++;
        this.emit('jline', record, lineNumber, line, recordNumber);
        this.emit('line',  line,   lineNumber, line, recordNumber);
    } catch(e){
      // Does it look like an error? a comment?  an empty line?
      var match   = line.match(/^[ \t]*(#.*|$)/);
      var code=(match === null )?1 // malformed line
              :(match[1].length)?2 // comment
              :                  3;// blank line
      if (code <= logcode) log("Malformed JSON on line "+String(lineNumber)+" "+String(e));
      if (code <= diecode) throw(e);
      if (code === 1) this.emit('parseError'  , e       , lineNumber, line);
      if (code === 2) this.emit('comment'     , match[1], lineNumber, line);
                      this.emit('line'        , line    , lineNumber, line);
    }
  });
}

module.exports = parseJlineStream;

if(require.main === module) {
  require('../lib/opt').fancy({filename:__filename});
  var exit = 0;
  parseJlineStream(process.stdin)
  .on('jline',      function(record,  lineNumber, line, recordNumber){console.log(line);})
  .on('comment',    function(comment, lineNumber, line, recordNumber){console.log(line);})
  .on('parseError', function(e,n,l){console.error("Malformed JSON on line", n, e); exit = 1;})
  .on('end',        function(){process.exit(exit);});
}

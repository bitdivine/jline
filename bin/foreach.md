jline-foreach
=============

Execute a function for each JSON line.  This is roughly equivalent to gawk for JSON lines.

## Command line:

    echo '{"this":24, "that":99}' | jline-foreach "console.log(record.this * record.that);"
    echo '{"a":5}' | jline-foreach 'sum += record.a;' 'end::console.log(sum);' 'beginning::GLOBAL.sum=0;'
    echo '{"a":"man"}' | jline-foreach 'console.log(require("fs").readFileSync(record.a));'

### Code

Each argument is of the form: "event::code".  If the event is omitted it is assumed to be `jline`.  Others are:

* `beginning`/`beg`/`begin`

* `end`

* `error`

The only way to share variables between separate chunks of code is to declare them global.


The preset variables are:

* `record` - the parsed JSON.

* `recordNumber` - the line number, excluding lines that are not well formed JSON.

* `line` - the raw string

* `lineNumber` - the line number.

* `error` - (when handling an error event)


jline-map
=========

Apply a function to each JSON line and re-emit it.

### Usage

The one and only argument is some javascript code that is executed for each record.

To demonstrate we will apply the filter to just one line:

    echo '{"bee":99,"wasp":27}' | jline-map 'record.sum = record.bee + record.wasp'
    returns: {"bee":99,"wasp":27,"sum":126}

    echo '{"message":"Elsken"}' | jline-map "record.sig = require('crypto').createHash('md5').update(record.message).digest('hex');"
    returns: {"message":"Elsken","sig":"98769e3110755c13e4f5e8ea2b44f3a2"}

### Predefined variables:

* `record` - the parsed JSON.

* `recordNumber` - the line number, excluding lines that are not well formed JSON.

* `line` - the raw string

* `lineNumber` - the line number.


### See also

For a more general and more powerful alternative, see `json-foreach`.


jline-filter
============

Filter JSON lines

### Simple usage:

To demonstrate we will apply the filter to just one line:

    echo '{"bumble":{"bee":99}}' | jline-filter 'bumble.bee>3'
    echo '{"not":"here"}'        | jline-filter 'not !== "there"'
    echo '{"bumble":{"bee":99},"wasp":false}' | filter 'bumble.bee>3 && !wasp'

### Advanced usage:

You can provide your own function that applies to each 'record':

     echo '{"bumble":{"bee":99}}' | filter -f 'return Math.sin(record.bumble.bee) > 1;'



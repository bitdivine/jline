jline-json2jl
=============

Convert a JSON file into JSON lines

## Command line:

    jline-json2jl data.json     # Emit the entire JSON on one line
    jline-json2jl -a data.json  # If the JSON is an array, print each entry as a JSON line.
                                # If the JSON is a dictionary, print each value.
    jline-json2jl -a --path=foo.bar package.json
                                # Get an array from inside the JSON and
                                # print each entry as a line.
                                # --path may be used with anything.
    jline-json2jl -d data.json  # Print each key value pair as a JSON line. {key:.., val:..}
    jline-json2jl -k data.json  # Print the keys of a dictionary.


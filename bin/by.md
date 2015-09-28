jline-by
========

Reduce values to some breakdown.  E.g. if you have a whole lot of records that look like this:

    {"state":"Georgia", "year":1982, "sightings":27, "validatedSightings":19}

You may want to get the total number of sightings by year.  You can do this with:

    cat data | jline-by year -- sightings

This will output one JSON line for each year together with the total number of sightings for that year:

    {"sightings":135,"year":"1982"}
    {"sightings":172,"year":"1983"}
    {"sightings":211,"year":"1984"}

## Command line:

The general form is:

    cat data | jline-by <breakdown> ... -- <value> ...

You may rename a breakdown or value using colon notation: old.path:new


    cat data | jline-by state year -- sightings
    cat data | jline-by year:Y -- sightings validatedSightings
    cat data | jline-by year:Y -- sightings validatedSightings:validated



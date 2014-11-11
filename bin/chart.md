jline-chart
===========

Plot JSON lines in a simple HTML chart

    cat data | jline-chart <x> <y>

e.g.:

    printf '{"x":%s, "y":%s}\n' 1 0 2 5 3 7 4 9 5 6 | jline-chart x y > ,out.html


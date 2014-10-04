clean.md
========

Select just those JSON lines that are well formed.

    cat data | jline-clean

Malformed lines are reported on stderr but can be ignored:

    cat data | jline-clean 2>/dev/null


#!/usr/bin/env bash

cd "$(dirname "$0")"

set -eu
tests=0
errors=0
for file in [a-z]*
do if test -x "$file"
   then
        tests="$((tests+1))"
        "./$file" >,out 2>,err && {
            rm -f ,out ,err || true
            echo "$file OK" $?
        } || {
            echo "$file FAILED with exit code" $?
            errors=$((errors+1))
        }
   fi
done

if ((errors == 0))
then echo "==== All tests completed successfully. Pass rate: $tests/$tests"
else echo "==== Tests complete.  Errors: $errors  Pass rate: $((tests-errors))/$tests"
fi

exit $errors

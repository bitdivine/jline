jline-mysql2jl
==============

EXPERIMENTAL:

Converts MySQL output into JSON dictionaries, using the first line as the header

## Usage:

    echo "SELECT 1,2,3;" | mysql | jline-mysql2jla

## Postgres:

For postgres you probably don't need this as you can export JSON lines directly:

    echo 'SELECT row_to_json(article) FROM article;' | psql --tuples-only

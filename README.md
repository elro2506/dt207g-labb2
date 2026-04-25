# DT207G - Backend

Detta projekt är en REST-baserad webbtjänst som hanterar arbetslivserfarenheter.
Jag har byggt mitt API med node.js, Express och SQLite.

## Funktioner
- Hämta alla arbetslivserfarenheter med GET
- Lägga till arbetslivserfarenheter med POST
- Radera arbetslivserfarenheter med DELETE

## Tekniker
- Node.js
- Express
- better-SQLite3
- JSON

## Databasen
Min databas består av en tabell som jag döpt till experience

### Strukturen
- id (AUTOINCREMENT och PRIMARY KEY)
- company
- jobtitle
- location
- startdate
- enddate
- description

Mitt api finns här: https://experience-api-2lvv.onrender.com/
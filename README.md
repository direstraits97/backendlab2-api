# Workexperience - API
Detta repo innehåller filer för ett API som hanterar arbetslivserfarenheter. Det är byggt med Express och CORS är implementerat för att tillåta anrop mellan olika domäner. CRUD-funktioner är implementerade.

## Installation
För lagring använder API:et better-sqlite3. Installera nödvändiga npm-paket som finns i kodfilerna, och kör sedan skriptet install.js med "npm run install". En tabell kommer skapas med samma struktur som exemplet nedan:

| id | companyname | jobtitle | location | startdate | enddate | description |
|--- | ----------- | -------- | -------- | --------- | ------- | ----------- |
| 1  | IKEA        | Chef     | Sundsvall|2020-10-10 |2022-03-01| Beskrivning av arbetsuppgifter|

## Användning
Nedan beskrivs hur API:et kan anropas:

| Metod | Ändpunkt | Beskrivning |
| ----- | -------- | ----------- |
| GET | /workexperience | Hämtar alla tillgängliga arbetslivserfarenheter |
| GET | /workexperience/:id | Hämtar en specifikt arbetslivserfarenhet baserat på angivet id. |
| POST | /workexperience | Lagrar en ny arbetslivserfarenhet |
| PUT | /workexperience/:id | Uppdaterar en befintlig arbetslivserfarenhet |
| DELETE | /workexperience/:id | Raderar ett objekt baserat på angivet id. |

Objekten skickas och returneras i JSON-format med nedan struktur:
```
{
"id": 30,
    "companyname": "IKEA",
    "jobtitle": "Chef",
    "location": "Sundsvall",
    "startdate": "2020-10-10",
    "enddate": "2022-03-01",
    "description": "Beskrivning av arbetsuppgifter"
}
```

## Länk till video-demo
https://youtu.be/seVtNwRSIik

/**
 * Install-script av hur databas med tabell skapades.
 * Av: Josefine Backlund
 */

const database = require("better-sqlite3"); //Hämtar better-sqlite3.

const db = new database("./db/cv.db"); //Skapar en fil för tabellen och specificerar att den ska hamna i db-mappen.

db.exec(` 
    CREATE TABLE IF NOT EXISTS workexperience (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    companyname TEXT NOT NULL,
    jobtitle TEXT NOT NULL,
    location TEXT NOT NULL,
    startdate DATE NOT NULL,
    enddate DATE NOT NULL,
    description TEXT NOT NULL
    );
    `);
//Ovan skapas en tabell som ska lagra informationen tillsammans med autogenererade id-nycklar.
db.close(); //Stänger databasen.

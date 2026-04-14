const database = require("better-sqlite3");

const db = new database("./db/cv.db");

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

db.close();

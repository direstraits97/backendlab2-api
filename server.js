/**
 * Denna fil skapar ett API med data i json-format som implementerar CRUD. Input valideras innan lagring med POST och PUT, och CORS är möjligt.
 * Av: Josefine Backlund
 */

const express = require("express");
const cors = require("cors");
//Ovan hämtas express som behövs för servern, och cors för tillåta åtkomst från en annan domän.
const database = require("better-sqlite3");
const db = new database("./db/cv.db"); //Skapar databas.

const app = express(); //Startar express.
const port = 3000; //Utvald port.

app.use(cors()); //Tillåt åtkomst.
app.use(express.json()); //Kunna omvandla till js-objekt.

//Get-request som hämtar alla objekt i fallande ordning.
app.get("/workexperience", (req, res) => {
  try {
    const workexperience = db
      .prepare("SELECT * FROM workexperience ORDER BY id DESC;")
      .all();
    res.json(workexperience);
  } catch (error) {
    res.status(500).json({ message: "Could not get workexperience" }); //Meddelande om fel på servern.
  }
});
//Get-request som hämtar ett specifikt objekt med id som parameter.
app.get("/workexperience/:id", (req, res) => {
  const workexperience = db
    .prepare("SELECT * FROM workexperience WHERE id = ?;")
    .get(req.params.id);

  if (!workexperience) {
    return res.status(404).json({ error: "Not found" }); //När angivet id inte finns.
  }
  res.json(workexperience); //Fråga körs med id i url:en.
});

//Post-request som validerar input och vid lyckad inmatning lagras informationen i databasen.
app.post("/workexperience", (req, res) => {
  const { companyname, jobtitle, location, startdate, enddate, description } =
    req.body; //Data som hämtas från bodyn.

  if (
    !companyname ||
    !jobtitle ||
    !location ||
    !startdate ||
    !enddate ||
    !description
  ) {
    return res.status(400).json({
      message:
        "companyname, jobtitle, location, startdate, enddate and description is required",
    }); //Felmeddelande om information saknas.
  }

  const stmt = db.prepare(`
    INSERT INTO workexperience (companyname, jobtitle, location, startdate, enddate, description) VALUES (?, ?, ?, ?, ?, ?);
    `); //Förbereder SQL-fråga där värden ska placeras in nedan.

  try {
    const result = stmt.run(
      companyname,
      jobtitle,
      location,
      startdate,
      enddate,
      description,
    ); //Kör frågan med de lagrade värden i början av anropet.
    res.status(201).json({ id: result.lastInsertRowid, ...req.body }); //201-meddelande om att ny resurs är skapad, tillsammans med det genererade id:et och resten av objektet.
  } catch (error) {
    res.status(500).json({ message: "Could not insert workexperience" }); //Fel på servern.
  }
});

//PUT-anrop som fungerar likt POST. Specifika objekt kan uppdateras baserat på id och valideras innan lagring. Vid lyckat anrop svarar API:et med en uppdaterad samling av data.
app.put("/workexperience/:id", (req, res) => {
  const { companyname, jobtitle, location, startdate, enddate, description } =
    req.body;

  if (
    !companyname ||
    !jobtitle ||
    !location ||
    !startdate ||
    !enddate ||
    !description
  ) {
    return res.status(400).json({
      message:
        "companyname, jobtitle, location, startdate, enddate and description is required",
    }); //Klient-fel-meddelande.
  }

  const stmt = db.prepare(`
  UPDATE workexperience SET companyname=?, jobtitle=?, location=?, startdate=?, enddate=?, description=? WHERE id=?;
  `); //Förberedd SQL-fråga med UPDATE-kommando som körs nedan men lagrade värden samt id på objektet som uppdateras.

  try {
    const result = stmt.run(
      companyname,
      jobtitle,
      location,
      startdate,
      enddate,
      description,
      req.params.id,
    );
    const workexperience = db
      .prepare("SELECT * FROM workexperience ORDER BY id DESC;")
      .all();
    res.json(workexperience); //Svarar med uppdaterad samling av data.
  } catch (error) {
    res.status(500).json({ message: "Could not update workexperience" }); //Felmeddelande, server-fel.
  }
});

app.delete("/workexperience/:id", (req, res) => {
  try {
    const result = db
      .prepare("DELETE FROM workexperience WHERE id = ?;")
      .run(req.params.id); //Förberedd fråga med DELETE-kommando som körs med relevant id.
    const workexperience = db
      .prepare("SELECT * FROM workexperience ORDER BY id DESC;")
      .all();
    res.json(workexperience); //Svarar med uppdaterat innehåll i fallande ordning.
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not delete workexperience" }); //Server-fel.
  }
});

app.listen(port, () => console.log("Server started on port: " + port)); //Servern startas på port som angivits ovan.

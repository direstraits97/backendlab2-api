const express = require("express");
const database = require("better-sqlite3");
const cors = require("cors");

const db = new database("./db/cv.db");

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/workexperience", (req, res) => {
  try {
    const workexperience = db.prepare("SELECT * FROM workexperience;").all();
    res.json(workexperience);
  } catch (error) {
    res.status(500).json({ message: "Could not get workexperience" });
  }
});

app.get("/workexperience/:id", (req, res) => {
  const workexperience = db
    .prepare("SELECT * FROM workexperience WHERE id = ?;")
    .get(req.params.id);

  if (!workexperience) {
    return res.status(404).json({ error: "Not found" });
  }
  res.json(workexperience);
});

app.post("/workexperience", (req, res) => {
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
    });
  }

  const stmt = db.prepare(`
    INSERT INTO workexperience (companyname, jobtitle, location, startdate, enddate, description) VALUES (?, ?, ?, ?, ?, ?);
    `);

  try {
    const result = stmt.run(
      companyname,
      jobtitle,
      location,
      startdate,
      enddate,
      description,
    );
    res.status(201).json({ id: result.lastInsertRowid, ...req.body });
  } catch (error) {
    res.status(500).json({ message: "Could not insert workexperience" });
  }
});

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
    });
  }

  const stmt = db.prepare(`
  UPDATE workexperience SET companyname=?, jobtitle=?, location=?, startdate=?, enddate=?, description=? WHERE id=?;
  `);

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
    res.json({ message: "Updated" });
  } catch (error) {
    res.status(500).json({ message: "Could not update workexperience" });
  }
});

app.delete("/workexperience/:id", (req, res) => {
  try {
    const result = db
      .prepare("DELETE FROM workexperience WHERE id = ?;")
      .run(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Could not delete workexperience" });
  }
});

app.listen(port, () => console.log("Server started on port: " + port));

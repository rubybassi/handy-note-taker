const express = require("express");
const path = require("path");
const db = require("./db/db.json");
const fs = require("fs");
const { nanoid } = require("nanoid");

const app = express();
const port = process.env.port || 8000;
// middleware to parse data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// middleware to serve CSS files and JavaScript files in the public directory
app.use(express.static("public"));

//______________API ROUTES________________
app.post("/api/notes", (req, res) => {
  // console.log('req body:', req.body);
  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: nanoid(),
  };
  db.push(newNote);
  // writes to db file
  const file = path.join(__dirname, "./db/db.json");
  fs.writeFile(file, JSON.stringify(db), (err) => {
    if (err) throw err;
    console.log("New note has been saved!");
  });
  res.send(newNote);
});

app.get("/api/notes", (req, res) => {
  //console.log("db is:", db);
  res.json(db);
});

//______________HTML ROUTES________________
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => console.log("listening on port:", port));

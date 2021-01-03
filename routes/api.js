const path = require("path");
let db = require("../db/db.json");
const fs = require("fs");
const { nanoid } = require("nanoid");

module.exports = app => {
  // recieve new note
  app.post("/api/notes", (req, res) => {
    const newNote = {
      title: req.body.title,
      text: req.body.text,
      id: nanoid(),
    };
    db.push(newNote);
    // writes to db file
    const file = path.join(__dirname, "../db/db.json");
    fs.writeFile(file, JSON.stringify(db), (err) => {
      if (err) throw err;
      console.log("New note has been saved!");
    });
    res.send(newNote);
  });

  // send notes
  app.get("/api/notes", (req, res) => {
    //console.log("db is:", db);
    res.json(db);
  });

  // delete note
  app.delete("/api/notes/:id", (req, res) => {
    // console.log(req.params.id);
    const id = req.params.id;
    db = db.filter((note) => id !== note.id);
    //console.log(chosen);
    const file = path.join(__dirname, "../db/db.json");
    fs.writeFile(file, JSON.stringify(db), (err) => {
      if (err) throw err;
      console.log("New note has been saved!");
    });
    res.end();
  });
};

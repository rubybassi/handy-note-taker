const path = require("path");
let db = require("../db/db.json");
const fs = require("fs").promises;
const { nanoid } = require("nanoid");

module.exports = app => {
  // send notes
  app.get("/api/notes", (req, res) => {
    //console.log("request object:", req);
    //const notes = retrieveNotes();
    retrieveNotes().then(data => res.json(data)).catch(err => console.log(err));
    //res.json(notes);
  });

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

  // universal function for retrieving notes - set as async to allow promise chaining when called
  const retrieveNotes = async () => {
    const file = path.join(__dirname, "../db/db.json");
    const data = await fs.readFile(file);
    const notes = JSON.parse(data);
    return notes;
  };
};


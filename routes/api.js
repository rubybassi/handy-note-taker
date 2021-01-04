const path = require("path");
let db = require("../db/db.json");
const fs = require("fs").promises;
const { nanoid } = require("nanoid");

module.exports = (app) => {

  // ROUTE - send notes
  app.get("/api/notes", (req, res) => {
    retrieveNotes().then(data => res.json(data)).catch((err) => console.log(err));
  });

  // ROUTE - recieve new note
  app.post("/api/notes", (req, res) => {
    const newNote = {
      title: req.body.title,
      text: req.body.text,
      id: nanoid(),
    };
    writeNote(newNote).then(data => res.json(data)).catch((err) => console.log(err));
  });
   
  // ROUTE - delete note
  // In order to delete a note, you'll need to read all notes from the `db.json` file, 
  // remove the note with the given `id` property, and then rewrite the notes to the `db.json` file. 
  app.delete("/api/notes/:id", (req, res) => {
    // console.log(req.params.id);
    const id = req.params.id;
    deleteNote(id).then((data) => res.json(data)).catch((err) => console.log(err));

  });



  /*app.delete("/api/notes/:id", (req, res) => {
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
  });*/

  // Function for retrieving notes - set as async to allow promise chaining when called
  const retrieveNotes = async () => {
    const file = path.join(__dirname, "../db/db.json");
    const data = await fs.readFile(file);
    const notes = JSON.parse(data);
    return notes;
  };

  // Function for pushing new note and writing to db
  const writeNote = async note => {
    const allNotes = await retrieveNotes();
    //console.log('allNotes:', allNotes);
    allNotes.push(note);
    const file = path.join(__dirname, "../db/db.json");
    await fs.writeFile(file, JSON.stringify(allNotes));
    return note;
  };

  // Function for filtering deleted note by id, writing to db and returning updated notes
  const deleteNote = async (id) => {
    const allNotes = await retrieveNotes();
    const filteredNotes = await allNotes.filter((note) => id !== note.id);
    const file = path.join(__dirname, "../db/db.json");
    await fs.writeFile(file, JSON.stringify(filteredNotes));
    return updatedNotes = retrieveNotes();
  }
};

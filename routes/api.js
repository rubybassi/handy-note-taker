const path = require("path");
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
  app.delete("/api/notes/:id", (req, res) => {
    const id = req.params.id;
    deleteNote(id).then(data => res.json(data)).catch((err) => console.log(err));

  });

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
    allNotes.push(note);
    const file = path.join(__dirname, "../db/db.json");
    await fs.writeFile(file, JSON.stringify(allNotes));
    return note;
  };

  // Function for filtering deleted note by id, writing to db and returning updated notes
  const deleteNote = async id => {
    const allNotes = await retrieveNotes();
    const filteredNotes = await allNotes.filter((note) => id !== note.id);
    const file = path.join(__dirname, "../db/db.json");
    await fs.writeFile(file, JSON.stringify(filteredNotes));
    return updatedNotes = retrieveNotes();
  };
};

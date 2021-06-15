// DEPENDENCIES
const notes = require('../db/db.json');

// ROUTING
module.exports = (app) => {
  app.get('/api/notes', (req, res) => res.json(notes));
  app.post('/api/notes', (req, res) => {
    const {title, text, id} = req.body;
    notes.push({title, text, id}); res.json(req.body);
  })
  app.delete('/api/notes/:id', (req, res) => {
    let id = req.params.id.toString();
    notes.filter((note) => note.id !== id)
    .then((filteredNotes) => JSON.stringify(filteredNotes)); res.json(filteredNotes);
  })
};
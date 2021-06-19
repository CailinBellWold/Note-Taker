// DEPENDENCIES
const save = require('../db/save.js');
const router = require('express').Router();

// ROUTING
// Get Route
  router.get('/notes', (req, res) => {
    save.getNotes()
    .then((parsedNotes) => {
      return res.json(parsedNotes);
    })
    .catch((err) => res.status(500).json(err));
  })

// Post Route
  router.post('/notes', (req, res) => {
    save.addNote(req.body)
    .then((newNote) => res.json(newNote))
    .catch((err) => res.status(500).json(err));
  })

// Delete Route
  router.delete('/notes/:id', (req, res) => {
    save.removeNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch((err) => res.status(500).json(err));
  })

// EXPORT
module.exports = router;
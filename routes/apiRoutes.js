// DEPENDENCIES
const save = require('../db/save.js');
const router = requre('express').Router();

// ROUTING
  router.get('/notes', (req, res) => {
    save.getNotes()
    .then((parsedNotes) => {
      return res.json(parsedNotes);
    })
    .catch (err)
  })

  router.post('/notes', (req, res) => {
    save.addNote(req.body)
    .then((newNote) => res.json(newNote))
    .catch (err)
  })

  router.delete('/notes/:id', (req, res) => {
    save.removeNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch (err)
  })

module.exports = router;
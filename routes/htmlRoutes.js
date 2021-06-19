// DEPENDENCIES
const path = require('path');
const router = requre('express').Router();

// ROUTING
  router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });

  router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

module.exports = router;
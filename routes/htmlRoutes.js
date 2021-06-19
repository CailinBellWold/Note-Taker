// DEPENDENCIES
const path = require('path');
const router = require('express').Router();

// ROUTING
// Get Route for Notes
  router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });

// Get Route for Root
  router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });

// EXPORT
module.exports = router;
// * `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into `npm` packages that could do this for you).

// DEPENDENCIES
const notesData = require('../db/db.json');

// ROUTING
module.exports = (app) => {
  app.get('/api/notes', (req, res) => res.json(notesData));
  app.post('/api/notes', (req, res) => {
    const {title, text} = req.body;
    notesData.push({noteID, title, text}); res.json(req.body);
  })
  // app.delete('/api/notes/:id', (req, res) => {

  //   res.json();
  // })
};

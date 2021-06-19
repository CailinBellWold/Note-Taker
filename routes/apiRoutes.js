// DEPENDENCIES
const notes = require('../db/db.json');

// ROUTING
module.exports = (app) => {
  app.get('/api/notes', (req, res) => res.json(notes));

  app.post('/api/notes', (req, res) => {
    const {title, text, id} = req.body;
    notes.push(req.body); 
    res.json(notes);
  })

  app.delete('/api/notes/:id', (req, res) => {
    .removeNote(req.params.id);
    .then() => res.json(notes);
    .catch (err)
  })
};

// router.delete('/:id', async (req, res) => {
//   try {
//     const projectData = await Project.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!projectData) {
//       res.status(404).json({ message: 'No project found with this id!' });
//       return;
//     }

//     res.status(200).json(projectData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

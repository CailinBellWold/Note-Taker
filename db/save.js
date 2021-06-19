// DEPENDENCIES
const util = require('util');
const fs = require('fs');
const {v4 : uuidv4} = require('uuid');
const readFileAsynch = util.promisify(fs.readFile);
const writeFileAsynch = util.promisify(fs.writeFile);

// FUNCTIONS
class Save {

    // Return the file from db.json
    read() {
        return readFileAsynch('db/db.json', 'utf8');
    };

    // Stringify the new note for writing to the db
    write(note) {
        return writeFileAsynch('db/db.json', JSON.stringify(note));
    };

   // Retrieve the notes returned from the db, then concatinate and parse them in an array (creating a new array, if none exists)
    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes;
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }
            return parsedNotes;
        })
    };

    // Create a new note and include a UUID
    addNote(note) {  
        const {title, text} = note;
        if (!title || !text) {
            throw new Error ('Notes cannot be blank. Please enter your text.');
        } else {
            const newNote = {title, text, id: uuidv4()};
            return this.getNotes()
            .then((notes) => [...notes, newNote])
            .then((updatedNotes) => this.write(updatedNotes))
            .then(() => newNote);
        }
    };

    // Delete a new note, referencing its UUID
    removeNote(id) {
        return this.getNotes()
        .then((parsedNotes) => parsedNotes.filter((note) => note.id !== id))
        .then((filteredParsedNotes) => this.write(filteredParsedNotes));
    };
};

// EXPORT
module.exports = new Save();
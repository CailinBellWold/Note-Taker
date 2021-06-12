const util = require('util');
const fs = require('fs');
const {v4 : uuidv4} = require('uuid');
const readFileAsynch = util.promisify(fs.readfile);
const writeFileAsynch = util.promisify(fs.writefile);

class Save {
    read() {
        return readFileAsynch('db/db.json', 'utf8');
    };
    write(note) {
        return writeFileAsynch('db/db.json', json.stringify(note));
    };
   //.then(notes) returns the read response (the db.json file containing all the notes)
    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes;
            try {
                parsedNotes = [].concat(json.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }
            return parsedNotes;
        })
    };
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
    removeNote(id) {
        return this.getNotes()
        .then((parsedNotes) => parsedNotes.filter((note) => note.id !== id))
        .then((filteredParsedNotes) => this.write(filteredParsedNotes));
    };
}   module.exports = new Save();
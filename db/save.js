const util = require('util');
const fs = require('fs');
const {v4 : uuidv4} = require('uuid');
const readFileAsynch = util.promisify(fs.readfile);
const writeFileAsynch = util.promisify(fs.writefile);

class Save {
    //Function to return the whole file from db.json
    read() {
        return readFileAsynch('db/db.json', 'utf8');
    };
    //Function to stringify the new note for writing to the db
    write(note) {
        return writeFileAsynch('db/db.json', JSON.stringify(note));
    };
   //Function to get the notes returned from the db, then concatinate and parse them in an array
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
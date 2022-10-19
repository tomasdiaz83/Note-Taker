const notes = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');

// GET Route for retrieving all the notes
notes.get('/notes', (req, res) => {
    console.log(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/notes', (req, res) => {
    console.log(`${req.method} received for notes.`)
    console.log(req.body);
    
    const { title, text } = req.body;

    if (req.body) {
        let id;

        readFromFile('./db/db.json')
        .then((data) => {
            noteList = JSON.parse(data);
            console.log(noteList);
            id = noteList[noteList.length-1].id + 1;
            console.log("working??")
        })
        .then(() => {
        const newNote = {
            title,
            text,
            id
            }
        return newNote;
        })
        .then((newNote) => {
            readAndAppend(newNote, './db/db.json');
            res.json('Note added succesfully!');
        })
    } else {
        res.error('Cannot add note.')
    }
})

module.exports = notes;
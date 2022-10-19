const notes = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');
const { v4: uuidv4} = require('uuid');

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

        const newNote = {
            title,
            text,
            id: uuidv4(),
            }
        readAndAppend(newNote, './db/db.json');
        res.json('Note added succesfully!');
    } else {
        res.error('Cannot add note.')
    }
})

module.exports = notes;
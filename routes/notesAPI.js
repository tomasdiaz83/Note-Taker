const notes = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');
//to create unique ids
const { v4: uuidv4} = require('uuid');

// GET Route for retrieving all the notes
notes.get('/notes', (req, res) => {
    console.log(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

//POST route for creating new notes
notes.post('/notes', (req, res) => {
    console.log(`${req.method} request received for notes.`)
    
    const { title, text } = req.body;

    if (req.body) {
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

//DELETE route for removing notes
notes.delete('/notes/:id', (req, res) => {
    console.log(`${req.method} request received for notes.`)
    readFromFile('./db/db.json')
    .then((data) => {
        let noteList = JSON.parse(data);
        const newNoteList = noteList.filter(noteList => noteList.id != req.params.id);
        return newNoteList;
    })
    .then((newNoteList) => {
        writeToFile('./db/db.json', newNoteList)
        res.json(newNoteList);
    })
})

module.exports = notes;
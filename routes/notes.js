const notes = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');

// GET Route for retrieving all the notes
notes.get('/notes', (req, res) => {
    console.log(`${req.method} request received for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

module.exports = notes;
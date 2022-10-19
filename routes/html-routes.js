const htmlRoute = require('express').Router();
const path = require('path');

// GET Route for notes taking page
htmlRoute.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '../public/notes.html'))
);

htmlRoute.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = htmlRoute;
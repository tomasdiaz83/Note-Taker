//helpers, dependencies, etc
const express = require('express');
const { json } = require('express');
const { dirname } = require('path');

//routes
const htmlAPI = require('./routes/html-routes')
const notesAPI = require('./routes/notesAPI')

//Setting up express
const app = express();
const PORT = 3001;

//Middleware for parsing JSONs
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', notesAPI);
app.use('/', htmlAPI);

//Static Pages
app.use(express.static('public'));

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
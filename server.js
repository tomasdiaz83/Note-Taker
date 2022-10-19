//helpers, dependencies, etc
const express = require('express');
const { json } = require('express');
const path = require('path');
const { dirname } = require('path');

//routes
const htmlRoute = require('./routes/html-routes')
const notesAPI = require('./routes/notesAPI')

//Setting up express
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));

//Static Pages
app.use(express.static('public'));

//Middleware for parsing JSONs
app.use(express.json());

//api endpoints
app.use('/api', notesAPI);
app.use('/', htmlRoute);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);
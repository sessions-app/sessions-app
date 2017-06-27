const express = require('express');
const exhbs = require('./views/exhbs');
const path = require('path');

// Route imports
const homeRoute = require('./controllers/home');

// Initializations
const app = express();

// Configuration
app.engine('.hbs', exhbs.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// Router wiring
app.use('/', homeRoute);

app.listen(process.env.PORT || 8080);

const express = require('express');
const exhbs = require('../client/views/exhbs');
const path = require('path');
const serveStatic = require('serve-static');

// Route imports
const homeRoute = require('./controllers/home');

// Initializations
const app = express();

// Configuration
app.engine('.hbs', exhbs.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '..', 'client', 'views'));
app.locals.assetPrefix = process.env.NODE_ENV === 'development' ? 'http://localhost:8082/assets' : '';

// Static files
app.use(serveStatic(path.join(__dirname, '..', '..', 'dist')));

// Router wiring
app.use('/', homeRoute);

app.listen(process.env.PORT || 8080);
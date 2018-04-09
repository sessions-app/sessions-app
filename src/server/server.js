const express = require('express');
const exhbs = require('../client/views/exhbs');
const path = require('path');
const serveStatic = require('serve-static');
const config = require('config');
const bodyParser = require('body-parser');

// Route imports
const homeRoute = require('./controllers/home');
const sessionsRoute = require('./controllers/sessions');

// Initializations
const app = express();

// View Configuration
app.engine('.hbs', exhbs.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '..', 'client', 'views'));
app.locals.assetPrefix = config.get('assetPrefix');

// Session/Authentication Configuration


if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
  sessOptions.cookie.secure = true;
}




app.use(bodyParser.json());

// Static files
app.use(serveStatic(path.join(__dirname, '..', '..', 'dist')));

// Router wiring
app.use('/', homeRoute);
app.use('/sessions', sessionsRoute);

app.listen(process.env.PORT || 8080);

const express = require('express');
const exhbs = require('../client/views/exhbs');
const path = require('path');
const serveStatic = require('serve-static');
const config = require('config');
const { session, store, passport } = require('./controllers/auth/setup');
const bodyParser = require('body-parser');

// Route imports
const homeRoute = require('./controllers/home');
const authRoute = require('./controllers/auth');
const sessionsRoute = require('./controllers/sessions');

// Initializations
const app = express();

// View Configuration
app.engine('.hbs', exhbs.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '..', 'client', 'views'));
app.locals.assetPrefix = config.get('assetPrefix');

// Session/Authentication Configuration
const sessOptions = {
  secret: 'change me',
  store,
  resave: false,
  saveUninitialized: false,
  cookie: {},
};

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
  sessOptions.cookie.secure = true;
}

app.use(session(sessOptions));
store.sync();

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

// Static files
app.use(serveStatic(path.join(__dirname, '..', '..', 'dist')));

// Router wiring
app.use('/', homeRoute);
app.use('/auth', authRoute);
app.use('/sessions', sessionsRoute);

app.listen(process.env.PORT || 8080);

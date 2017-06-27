const express = require('express');
const exhbs = require('./views/exhbs');
const path = require('path');
const sequelize = require('./models').sequelize;

const homeRoute = require('./controllers/home');

const app = express();

app.engine('.hbs', exhbs.engine);
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', homeRoute);

app.get('/db-check', (req, res) => {
  sequelize.authenticate().then(() => {
    res.send('Was able to connect to database');
  }).catch(() => {
    res.send('Was unable to connect to database');
  });
});

app.listen(process.env.PORT || 8080);

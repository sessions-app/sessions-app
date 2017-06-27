const express = require('express');
const sequelize = require('./models').sequelize;

const homeRoute = require('./controllers/home');

const app = express();

app.use('/', homeRoute);

app.get('/db-check', (req, res) => {
  sequelize.authenticate().then(() => {
    res.send('Was able to connect to database');
  }).catch(() => {
    res.send('Was unable to connect to database');
  });
});

app.listen(process.env.PORT || 8080);

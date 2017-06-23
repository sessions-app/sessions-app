const express = require('express');
const sequelize = require('./models').sequelize;

const app = express();

app.get('/', (req, res) => {
  sequelize.authenticate().then(() => {
    res.send('Was able to connect to database');
  }).catch(() => {
    res.send('Was unable to connect to database');
  });
});

app.listen(8080);

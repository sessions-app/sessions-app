const sequelize = require('../../models').sequelize;

module.exports = (req, res) => {
  sequelize.authenticate().then(() => {
    res.send('Was able to connect to database');
  }).catch(() => {
    res.send('Was unable to connect to database');
  });
};

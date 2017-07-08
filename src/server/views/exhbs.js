const expressHandlebars = require('express-handlebars');

const exbhs = expressHandlebars.create({
  defaultLayout: 'main',
  layoutsDir: 'src/server/views/layouts',
  partialsDir: 'src/server/views/partials',
  extname: '.hbs',
});

module.exports = exbhs;

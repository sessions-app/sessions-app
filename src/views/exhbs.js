const expressHandlebars = require('express-handlebars');

const exbhs = expressHandlebars.create({
  defaultLayout: 'main',
  layoutsDir: 'src/views/layouts',
  partialsDir: 'src/views/partials',
  extname: '.hbs',
});

module.exports = exbhs;

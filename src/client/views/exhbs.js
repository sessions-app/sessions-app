const expressHandlebars = require('express-handlebars');

const exbhs = expressHandlebars.create({
  defaultLayout: 'main',
  layoutsDir: 'src/client/views/layouts',
  partialsDir: 'src/client/views/partials',
  extname: '.hbs',
});

module.exports = exbhs;

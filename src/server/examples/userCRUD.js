const User = require('../models').User;

const queryMatt = () => (
  User.findOne({
    where: {
      username: {
        $like: 'matt%',
      },
    },
  })
);

const log = (operation, matt) => console.log(`${operation} User: ${JSON.stringify(matt)}\n`);

queryMatt()
  .then((matt) => {
    log('BEFORE CREATE', matt);

    return User.create({ username: 'matt' }).then(queryMatt);
  })
  .then((matt) => {
    log('AFTER CREATE', matt);

    return User.update({ username: 'matthew' }, { where: { username: 'matt' } }).then(queryMatt);
  })
  .then((matt) => {
    log('AFTER UPDATE', matt);
    return User.destroy({ where: { username: 'matthew' } }).then(queryMatt);
  })
  .then((matt) => {
    log('AFTER DESTROY', matt);

    return 'Done';
  });

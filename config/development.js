
module.exports = {
  protocol: 'http',
  hostname: 'localhost:8080',
  assetPrefix: 'http://localhost:8082/assets',
  database: {
    username: 'sessions_user',
    password: 'password',
    database: 'sessions_app',
    host: 'db',
    dialect: 'postgres',
    logging: false,
  },
};

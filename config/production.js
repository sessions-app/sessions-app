
module.exports = {
  protocol: 'https',
  hostname: 'sessions-mvp.herokuapp.com',
  assetPrefix: '',
  database: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
  },
};

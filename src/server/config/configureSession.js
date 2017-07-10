const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('../models');
const passport = require('passport');

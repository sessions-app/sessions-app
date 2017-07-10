const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const db = require('../../models');
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;

const store = new SequelizeStore({ db: db.sequelize });

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => db.User
  .findById(id)
  .then((user) => {
    const { dataValues } = user;
    delete dataValues.createdAt;
    delete dataValues.updatedAt;
    delete dataValues.deletedAt;

    done(null, dataValues);
    return null;
  })
  .catch(err => done(err)));

passport.use(new SpotifyStrategy({
  clientID: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  callbackURL: 'http://localhost:8080/auth/spotify/callback',
}, (accessToken, refreshToken, profile, done) => db.User
  .findOrCreate({ where: { username: profile.id } })
  .spread((user) => {
    const { dataValues } = user;

    const authParams = { accessToken, refreshToken, profile };
    Object.assign(dataValues, authParams);

    done(null, dataValues);
    return null;
  })
  .catch(err => done(err))));

const authMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/');
  }
};

module.exports = {
  session,
  store,
  passport,
  authMiddleware,
};

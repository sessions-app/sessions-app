const loggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/auth/spotify');
  }
};

module.exports = {
  loggedIn,
};

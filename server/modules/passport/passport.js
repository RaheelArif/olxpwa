const passport = require('passport');
const User = require('../../Models/User');
module.exports = function (app) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user, done) {
    const id = user._id;
    done(null, id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(null, user);
    });
  });

  require('./strategies/local.strategy')();
}

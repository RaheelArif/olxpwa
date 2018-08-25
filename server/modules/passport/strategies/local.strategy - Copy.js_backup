const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../../../Models/User');
// const Donor = require('../../../Models/Donor');

module.exports = function () {
/*
  passport.use('donor', new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function (req, email, password, done) {
      let query = Donor.findOne({ email: email });
      query.select('email password userType');
      query.exec(function (error, user) {
        if (error) {
          done(error, null);
        } else if (user) {
          bcrypt.compare(password, user.password, function (err, valid) {
            if (valid) {
              done(null, user);
            } else {
              done(err, null);
            }
          });
        } else {
          done(error, null);
        }
      });
    }
  ));
*/
  passport.use('local-user', new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    function (req, username, password, done) {
      let query = User.findOne({ username: username });
      query.select('username password userRole');
      query.exec(function (error, user) {
        if (error) {
          done(error, null);
        } else if (user) {
          bcrypt.compare(password, user.password, function (err, valid) {
            if (valid) {
              done(null, user)
            } else {
              done(err, null);
            }
          });
        } else {
          done(error, null);
        }
      });
    }
  ));
}
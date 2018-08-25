const bcrypt = require('bcrypt');
const config = require('../serverConfig');
const saltRounds = config.saltRounds;
// const Donor = require('../Models/Donor');
const User = require('../Models/User');
const isAlphanumeric = require('validator/lib/isAlphanumeric');
const isEmpty = require('validator/lib/isEmpty');
const isNumeric = require('validator/lib/isNumeric');
const isEmail = require('validator/lib/isEmail');

// function to validate the user registration on server side.
function _validateUser(user) {
  let valid = true;
  // let errors = this.resetErrors(); // reset errors before validating
  let errors = {};
  // let user = this.state.user;

  let response;
  if (!valid) {
    response = {
      status: 'error',
      errors: errors
    }
    return response;
  } else {
    response = {
      status: 'ok',
      errors: null
    }
    return response;
  }
}


const RegistrationController = {

  userRegister: function (user) {
    return new Promise(function (resolve, reject) {
      let validation = _validateUser(user);
      if (validation.status.toLowerCase() != "ok") {
        // validation.errors will describe the complete details of errors occured during validation.
        reject({ status: "error", message: 'Invalid form submission' });
      }
      // promise api should be available. This will work properly only if promise api is available.
      bcrypt.hash(user.password, saltRounds)
        .then(function (passwordHash) {
          let newUser = new User();
          newUser.email = user.email;
          newUser.password = passwordHash;
          // newUser.userRole = user.userRole;
          if (newUser.email && newUser.password) {
            newUser.save(function (error, user) {
              if (error) {
                let message;
                if (error.code == 11000) {
                  message = "This email is already registered, Please login.";
                }
                reject({ status: "error", message: message });
              } else {
                resolve({ status: "ok", message: "User has been registered successfully", user: user });
              }
            });
          } else {
            // no name, cnicNumber and password provided, just return false;
            reject({ status: "error", message: "No email and password is provided, we can not register without email and password" });
          }
        });
    });
  }
}

module.exports = RegistrationController;
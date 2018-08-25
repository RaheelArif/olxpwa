
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

  if(user.username.length < 3 || user.username.length > 20) {
    errors.username = "Username must be between 3 to 20 characters long";
    valid = false;
  }
  if(!isAlphanumeric(user.username)) {
    errors.username = "Username must be alphanumeric value";
    valid = false;
  }

  // email
  if(!isEmpty(user.email) && !isEmail(user.email)) {
    errors.email = "Please provide a valid email address or leave this field blank"
    valid = false;
  }
  // password
  if(user.password.length < 8) {
    errors.password = "Password must be atleast 8 characters long";
    valid = false;
  }
  // name
  if(user.name.length < 3) {
    errors.name = 'Name Must be atleast 3 characters long';
    valid = false;
  }
  // address
  if(isEmpty(user.address)) {
    errors.address = "Address is required, please provide a valid address";
    valid = false;
  }
  if(user.address.length < 5) {
    errors.address = "Address is too short, please provide a little more clear address";
    valid = false;
  }
  // city
  if(user.city.trim().length < 4) {
    errors.city = "Invalid city name, please provide the complete city name.";
    valid = false;
  }
  // phone
  if(!isEmpty(user.phone) && !isNumeric(user.phone)) {
    errors.phone = "Only numbers are allowed in phone, if you don't have a phone number, please leave this field blank"
    valid = false;
  }
  if( !isEmpty(user.phone) && ( user.phone.length < 10 || user.phone.length > 15) ) {
    errors.phone = "Phone number must be between 10 to 15 numbers, please provide a valid phone number";
    valid = false;
  }

  // cnic Number is optional but if provided then validate it.
  if(!isNumeric(user.cnicNumber)) {
    errors.cnicNumber = "Please provide a valid CNIC number.";
    valid = false;
  }
  if(user.cnicNumber.length != 13) {
    errors.cnicNumber = "CNIC Number must be 13 digits."
    valid = false;
  }

  // bankDetails
  if(!isEmpty(user.bankDetails) && user.bankDetails.length < 50) {
    errors.bankDetails = "Please provide complete bank details, including Bank Name, Bank Account Number, Account Title, Bank Branch Code or and other information required to transfer the money. it should be complete enough that someone can easily transfer money if interested.";
  }
  let response;
  if(!valid) {
    response = {
      status: 'error',
      errors: errors
    }
    return response;
  }else{
    response = {
      status: 'ok',
      errors: null
    }
    return response;
  }
}


const RegistrationController = {

  donorRegister: function (user) {
    return new Promise(function (resolve, reject) {
      // promise api should be available. This will work properly only if promise api is available.
      bcrypt.hash(user.password, saltRounds)
        .then(function (passwordHash) {
          const donor = new User();
          donor.username = user.username;
          donor.password = passwordHash;
          donor.email = user.email;
          donor.name = user.name;
          donor.city = user.city;
          donor.address = user.address;
          donor.phone = user.phone;
          donor.cnicNumber = user.cnicNumber;
          donor.userRole = user.userRole;
          if (donor.username && donor.password && donor.name) {
            donor.save(function (error, donor) {
              if (error) {
                let message;
                if (error.code == 11000) {
                  message = "This username is already registered, Please login.";
                }
                reject({ status: "error", message: message });
              } else {
                resolve({ status: "ok", message: "Account has been registered successfully", donor: donor });
              }
            });
          } else {
            // no name, username and password provided, just return false;
            reject({ status: "error", message: "No name, email and password is provided, we can not create an account without this information." });
          }
        });
    });
  },

  // return { email: '', password: '', name:'',  address:'', city: '', phone: '', cnicNumber: '',
  //  bankDetails: '', additionalInfo: '', public: false };
  userRegister: function (user) {
    return new Promise(function (resolve, reject) {
      let validation = _validateUser(user);
      if(validation.status.toLowerCase() != "ok"){
        // validation.errors will describe the complete details of errors occured during validation.
        reject({ status: "error", message: 'Invalid form submission' });
      }
      // promise api should be available. This will work properly only if promise api is available.
      bcrypt.hash(user.password, saltRounds)
        .then(function (passwordHash) {
          const newUser = new User();
          newUser.username = user.username;
          newUser.password = passwordHash;
          newUser.name = user.name;
          newUser.email = user.email;
          newUser.address = user.address;
          newUser.city = user.city;
          newUser.phone = user.phone;
          newUser.cnicNumber = user.cnicNumber;
          newUser.bankDetails = user.bankDetails;
          newUser.additionalInfo = user.additionalInfo;
          newUser.public = user.public;
          newUser.userRole = user.userRole;
          if (newUser.username && newUser.password && newUser.name) {
            newUser.save(function (error, user) {
              if (error) {
                let message;
                if (error.code == 11000) {
                  message = "This username is already registered, Please login.";
                }
                reject({ status: "error", message: message });
              } else {
                resolve({ status: "ok", message: "User has been registered successfully", user: newUser });
              }
            });
          } else {
            // no name, cnicNumber and password provided, just return false;
            reject({ status: "error", message: "No name, CNIC number and password is provided, we can not create an account without this information." });
          }
        });
    });
  }
}

module.exports = RegistrationController;
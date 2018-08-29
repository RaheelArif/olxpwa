const Message = require('../Models/Message');
const isEmpty = require('validator/lib/isEmpty');
const isNumeric = require('validator/lib/isNumeric');

// function to validate the user registration on server side.
function _validateMessage(messageObject) {
  let valid = true;
  let contact = messageObject;
  let errors = {};
  if (isEmpty(contact.name)) {
    errors.name = "Please provide your name";
    valid = false;
  } else if (contact.name.length < 3) {
    errors.name = "Name must be at least 3 characters long";
    valid = false;
  }

  if (isEmpty(contact.contactNumber)) {
    errors.contactNumber = "Please provide your contact number so that seller can contact you";
    valid = false;
  } else if (!isNumeric(contact.contactNumber)) {
    errors.contactNumber = "Only digits are allowed in contact number";
    valid = false;
  } else if (contact.contactNumber.length < 10 || contact.contactNumber.length > 15) {
    errors.contactNumber = "Please provide a valid phone number";
    valid = false;
  }

  if (isEmpty(contact.message)) {
    errors.message = "Please Enter your message";
    valid = false;
  } else if (contact.message.length < 25) {
    errors.message = "Message is too short, please describe your message breifly.";
    valid = false;
  }

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

const MessageController = {
  sendMessage: function (messageObject) {
    return new Promise(function (resolve, reject) {
      let validation = _validateMessage(messageObject);
      if (validation.status.toLowerCase() != "ok") {
        // validation.errors will describe the complete details of errors occured during validation.
        reject({ status: "error", message: 'Invalid form submission', errors: validation.errors });
      }
      let newMessage = new Message();
      newMessage.messageAd = messageObject.adId;
      newMessage.receiver = messageObject.receiver;
      newMessage.senderName = messageObject.name;
      newMessage.senderContactNumber = messageObject.contactNumber;
      newMessage.message = messageObject.message;
      newMessage.save(function (error, savedMessage) {
        if (error) {
          reject({ message: 'Error in sending your message, please make sure that you have filled the complete form.', error: error, savedMessage: null });
        } else {
          resolve({ message: 'Your message has been sent to the seller.', error: null, savedMessage: savedMessage });
        }
      });
    });
  },

  getMyMessages: function (userId) {
    return new Promise(function (resolve, reject) {
      let query = Message.find({ receiver: userId });
      query.sort({createdAt: 'desc'});
      query.populate('messageAd');
      query.exec(function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  },

  deleteMessage: function (msgId) {
    return new Promise(function (resolve, reject) {
      // let query = Message.findOneAnd(msgId);
      let query = Message.findByIdAndDelete(msgId);
      query.exec(function (error) {
        if (error) {
          reject(error);
        } else {
          resolve("Message deleted successfully");
        }
      });
    });
  }
}

module.exports = MessageController;
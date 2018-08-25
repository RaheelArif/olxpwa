const mongoose = require('mongoose');

var Schema = mongoose.Schema;
const DonorSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  password: {
    required: true,
    type: String
  },
  name: {
    required: true,
    type: String
  },
  city: {
    required: true,
    type: String
  },
  address: String,
  phone: String,
  cnicNumber: String,
  userType: {
    type: String,
    default: "donor"
  }
});

module.exports = mongoose.model('Donor', DonorSchema);
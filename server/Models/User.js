const mongoose = require('mongoose');

var Schema = mongoose.Schema;
const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    required: true,
    type: String
  },
  userRole: {
    type: String,
    default: 'user',
  },
  blocked: {
    type: Boolean,
    default: false,
  }
},{
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);

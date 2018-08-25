const mongoose = require('mongoose');

var Schema = mongoose.Schema;
const MessageSchema = new Schema({
  messageAd: {
    type: Schema.Types.ObjectId,
    ref: 'Ad'
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  senderName: {
    type: String,
    required: true,
  },
  senderContactNumber: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  }
},{
  timestamps: true
});

module.exports = mongoose.model('Message', MessageSchema);
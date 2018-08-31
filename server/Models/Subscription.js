const mongoose = require('mongoose');

var Schema = mongoose.Schema;
const SubscriptionSchema = new Schema({
  userId: {
    // type: Schema.Types.ObjectId,
    type: String,
    default: '',
  },
  endpoint: {
    type: String,
    required: true
  },
  auth: {
    type: String,
    required: true
  },
  p256dh: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model('Subscription', SubscriptionSchema);
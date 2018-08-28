const mongoose = require('mongoose');

var Schema = mongoose.Schema;
const AdSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  uploader: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  images: {
    type: [String],
    default: ['image-not-found.png']
  },
  sellerName: {
    type: String,
    required: true
  },
  itemCity: {
    type: String,
    required: true
  },
  sellerPhoneNumber: {
    type: String,
    required: true
  },
  featured: {
    type: Boolean,
    default: false,
  },
  approved: {
    type: Boolean,
    default: true,
  },
  favorites: {
    type: [String],
    default: []
  },
},
{
  timestamps: true
});
// AdSchema.index({title: 'text'}, {description: 'text'});
module.exports = mongoose.model('Ad', AdSchema);

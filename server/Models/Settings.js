const mongoose = require('mongoose');

var Schema = mongoose.Schema;
const ListingSchema = new Schema({
  orgName: {
    type: String,
    default: 'Org Name'
  },
  orgDescription: {
    type: String,
  },
  contactHeading: {
    type: String,
    default: "Contact Info"
  },
  contactAddress: {
    type: String,
    default: '123 Free web town'
  },
  contactEmail: {
    type: String,
    default: 'abdsoftfsd@gmail.com',
  },
  contactPhone: {
    type: String,
    default: '+92-1234567890'
  },

  thirdColumnHeading: {
    type: String,
    default: 'More Information'
  },

  thirdColumnText: {
    type: String,
    default: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, officia. Accusantium numquam porro quidem! Dolorem exercitationem voluptates commodi consequatur quaerat cumque magnam repudiandae reiciendis perspiciatis ipsum ut voluptatum, quibusdam repellendus?',
  }
});
ListingSchema.index({title: 'text'});
module.exports = mongoose.model('Settings', ListingSchema);
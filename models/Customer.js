const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true,
    min: 3,
    max: 225,
  },
  street: {
    type: String,
    required: true,
    min: 3,
    max: 225,
  },
  city: {
    type: String,
    required: true,
    min: 3,
    max: 225,
  },
  zip: {
    type: String,
    required: true,
    min: 3,
    max: 225,
  },
  state: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  ico: {
    type: String,
    required: true,
    min: 3,
    max: 32,
  },
  dic: {
    type: String,
    required: false,
    max: 32,
  },
  icdph: {
    type: String,
    required: false,
    max: 32,
  },
  additionalDetails: {
    type: String,
    required: false,
    min: 3,
    max: 1024,
  },
});

module.exports = mongoose.model('Customer', customerSchema);

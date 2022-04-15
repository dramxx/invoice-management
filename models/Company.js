const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
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
    max: 225,
  },
  ico: {
    type: String,
    required: true,
    min: 3,
    max: 32,
  },
  dic: {
    type: String,
    required: true,
    min: 3,
    max: 32,
  },
  icdph: {
    type: String,
    required: false,
    max: 32,
  },
  vatPayer: {
    type: Boolean,
    required: true,
  },
  bankAccount: {
    type: String,
    required: true,
    min: 3,
    max: 255,
  },
  phone: {
    type: String,
    required: false,
    max: 16,
  },
  email: {
    type: String,
    required: false,
    max: 255,
  },
  website: {
    type: String,
    required: false,
    max: 255,
  },
  additionalDetails: {
    type: String,
    required: false,
    max: 1024,
  },
  invoiceNote: {
    type: String,
    required: false,
    max: 1024,
  },
  invoiceSignature: {
    type: String,
    required: false,
    max: 255,
  },
});

module.exports = mongoose.model('Company', companySchema);

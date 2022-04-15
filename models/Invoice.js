const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({});

module.exports = mongoose.model('Invoice', invoiceSchema);

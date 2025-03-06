const mongoose = require('mongoose');

const customerSchemea = new mongoose.Schema({
    name: String,
    age: Number,
});

const Customer = mongoose.model('Customer', customerSchemea);

module.exports = Customer;

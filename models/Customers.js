const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    name        : String,
    memberid    : String,
    address     : String,
    zipcode     : Number,
    phone       : String
})

const Customers = mongoose.model('Customer', customerSchema)

module.exports = { Customers }
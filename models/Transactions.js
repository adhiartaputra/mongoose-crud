const mongoose = require('mongoose');

const Schema = mongoose.Schema

const transactionSchema = Schema({
    member      : { type: Schema.Types.ObjectId, ref: 'Customer'},
    days        : { type: Number },
    out_date    : { type: Date, default: new Date() },
    due_date    : { type: Date },
    in_date     : { type: Date, default: null },
    fine        : { type: Number, default: null },
    bookList    : [{ type: Schema.Types.ObjectId, ref: 'Book'}]

})

const Transactions = mongoose.model('Transaction', transactionSchema)

module.exports = { Transactions }
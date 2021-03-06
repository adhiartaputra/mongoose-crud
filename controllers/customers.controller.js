const { Customers } = require("../models/Customers")

module.exports = {

    showCustomers (req,res) {
        Customers.find()
        .exec()
        .then(customers => {
            res.status(200).json({
                message : "here's your data",
                data    : customers
            })
        })
        .catch(err => {
            res.status(500).json({
                err
            })
        })
    },

    addCustomer (req,res) {
        const { name, memberid, address, zipcode, phone } = req.body
        const customer =  new Customers ()
        customer.name        = name
        customer.memberid    = memberid
        customer.address     = address
        customer.zipcode     = zipcode
        customer.phone       = phone

        customer.save()
        .then(createdCustomer => {
            res.status(201).json({
                data    : createdCustomer,
                message : "create Customer success"
            })
        })
        .catch(err => {
            res.status(500).json({
                err
            })
        })
    },

    updateCustomer (req,res) {
        Customers.findOneAndUpdate({_id: req.params.id}, {$set: req.body}, { upsert: true, new: true}, ((err, data) => {
            if(err) {
                res.status(404).json({
                    message: err
                })
            } else {
                res.status(201).json({
                    message: "update data success",
                    data
                })
            }
        }))
    },

    deleteCustomer (req,res) {
        Customers.deleteOne({_id: req.params.id}, (err, r) => {
            if(err) {
                res.status(404).json({
                    message : "data not found"
                })
            } else {
                res.status(201).json({
                    message : "delete success",
                    data    : r
                })
            }
        })
    }


}
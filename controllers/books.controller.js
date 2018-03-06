const { Books } = require("../models/Books")

module.exports = {

    showBooks (req,res) {
        Books.find()
        .exec()
        .then(books => {
            res.status(200).json({
                message : "here's your data",
                data    : books
            })
        })
        .catch(err => {
            res.status(500).json({
                err
            })
        })
    },

    addBook (req,res) {
        const { isbn, title, author, category, stock } = req.body
        const book =  new Books ()
        book.isbn       = isbn
        book.title      = title
        book.author     = author
        book.category   = category
        book.stock      = stock

        book.save()
        .then(createdBook => {
            res.status(201).json({
                data    : createdBook,
                message : "create book success"
            })
        })
        .catch(err => {
            res.status(500).json({
                err
            })
        })
    },

    updateBook (req,res) {
        Books.findOneAndUpdate({title: req.body.title}, {$set: req.body}, {upsert: true}, (err => {
            if(err) {
                res.status(404).json({
                    message: err
                })
            } else {
                res.status(201).json({
                    message: "update data success",
                    data: req.body
                })
            }
        }))
    },

    deleteBook (req,res) {
        Books.deleteOne({title: req.body.title}, (err, r) => {
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
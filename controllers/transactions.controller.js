const { Transactions } = require("../models/Transactions")

module.exports = {

    showTransactions (req,res) {
        Transactions.find()
        .populate('bookList')
        .populate('member')
        .exec()
        .then(transactions => {
            res.status(200).json({
                message : "here's your data",
                data    : transactions
            })
        })
        .catch(err => {
            res.status(500).json({
                err
            })
        })
    },


    addTransaction (req,res) {
        const { member, days, out_date, due_date, in_date, fine, bookList } = req.body
        const transaction =  new Transactions ()
        transaction.member   =  member
        transaction.days     =  Number(days)
        transaction.out_date =  new Date()
        transaction.due_date =  new Date().setDate(transaction.out_date.getDate() + transaction.days)
        transaction.in_date  =  in_date
        transaction.fine     =  fine
        transaction.bookList = bookList

        console.log(transaction.bookList);
        

        transaction.save()
        .then(createdTransaction => {
            res.status(201).json({
                data    : createdTransaction,
                message : "create transaction success"
            })
        })
        .catch(err => {
            res.status(500).json({
                err
            })
        })
    },

    updateTransaction (req,res) {
        let countFine = new Date(req.body.in_date) - Transactions.due_date
        console.log(countFine);
				console.log(new Date(req.body.in_date));
				console.log(Transactions.due_date);
				
        
        
        Transactions.findOneAndUpdate({_id: req.body._id}, {
                $set: { fine: countFine > 0 ? 0 : Number(Math.abs(countFine)) * 1000,
                        in_date : req.body.in_date }
        }, {upsert: true }, (err => {
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

    deleteTransaction (req,res) {
        Transactions.deleteOne({id: req.body.id}, (err, r) => {
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
const express = require('express');
const router = express.Router();
const { showTransactions, addTransaction, updateTransaction, deleteTransaction } = require('../controllers/transactions.controller')

/* GET users listing. */
router

.get('/', showTransactions)
.post('/add', addTransaction)
.put('/update', updateTransaction)
.delete('/delete', deleteTransaction)

module.exports = router;

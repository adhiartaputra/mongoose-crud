const express = require('express');
const router = express.Router();
const { showCustomers, addCustomer, updateCustomer, deleteCustomer } = require('../controllers/customers.controller')

/* GET users listing. */
router

.get('/', showCustomers)
.post('/add', addCustomer)
.put('/update', updateCustomer)
.delete('/delete', deleteCustomer)

module.exports = router;

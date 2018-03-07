const express = require('express');
const router = express.Router();
const { showCustomers, addCustomer, updateCustomer, deleteCustomer } = require('../controllers/customers.controller')

/* GET users listing. */
router

.get('/', showCustomers)
.post('/', addCustomer)
.put('/:id', updateCustomer)
.delete('/:id', deleteCustomer)

module.exports = router;

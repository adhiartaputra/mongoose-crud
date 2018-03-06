const express = require('express');
const router = express.Router();
const { showBooks, addBook, updateBook, deleteBook } = require('../controllers/books.controller')

/* GET users listing. */
router

.get('/', showBooks)
.post('/add', addBook)
.put('/update', updateBook)
.delete('/delete', deleteBook)

module.exports = router;

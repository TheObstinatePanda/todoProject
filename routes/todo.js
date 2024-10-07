const express = require('express');
const { create, read, remove } = require('../controller/index');

const router = express.Router();

// Post
router.post('/todo/create', create);
// Get
router.get('/todos', read);
// // Delete
router.delete('/todo/:id', remove);

module.exports = router;

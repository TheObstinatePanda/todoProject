const express = require('express');
const { create, read, remove } = require('../model/todo');

const router = express.Router();

// Post
router.post('/todo/create', create);
// Get
router.get('/todos', read);
// Delete
router.delete('/todos/:id', remove);

module.exports = router;

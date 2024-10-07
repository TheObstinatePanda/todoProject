/* eslint-disable */
const formidable = require('formidable');
const { create, read, remove } = require('../model/todo');

exports.create = async (req, res) => {
    // init the forms
    console.log('trying to create')
    const { description } = req.body;
    console.log(description);

    if (!description) {
        console.error("Description is required")
        return res.status(400).json({
            error: 'Missing description'
        });
    }

    try {
        const newTask = await create(description);
        console.log('task created: ', newTask);
        return res.status(201).send({ data: newTask });
    } catch (err) {
        console.error('Errror adding task to database: ', err);
        return res.status(500).json({
            error: 'Internal server error',
        });
    }
};

exports.read = async (req, res) => {
    try {
        const task = await read();
        return res.status(200).json(task);
    } catch (err) {
        return res.status(400).json({
            error: err,
        });
    }
};

exports.remove = async (req, res) => {
    console.log('from index.js ', req.params);
    try {
        const { id } = req.params;
        console.log('Todo ID: ', id);
        if (!id) {
            return res.status(400).json({ error: 'Todo id required'})
        }
        const deletedTodo = await remove(id);
        console.log(deletedTodo);
        return res.status(200).send({ message: 'Todo successfully deleted', data: deletedTodo });
    } catch (err) {
        console.error('Error deleting todo: ', err);
        return res.status(400).json({ error: err.message });
    }
};
/* eslint-disable */
const formidable = require('formidable');
const { create, read, remove } = require('../model/todo');

exports.create = (req, res) => {
    // init the forms
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, async (err, fields) => {
        const { description } = fields;
        //if description does not exist, send an error
        if (!description) {
            return res.status(400).json({
                error: 'Description is Required',
            });
        } 
        // else add to database with create()
        try {
            const newTask = await create(description);
            return res.status(201).send({ data: newTask})
        } catch (err) {
            //log the error for debugging
            console.error('Error adding task to database:', err);
            // if description cannot be added, send an error
            return res.status(500).json({
                error: 'Internal Server Error',
            });
        }
    });
};

exports.read = async (req, res) => {
    try {
        const task = await read();
        return res.status(200).json({ data: task.rows });
    } catch (err) {
        return res.status(400).json({
            error: err,
        });
    }
};

exports.removeTodo = async (req, res) => {
    try {
        await remove(req);
        return res.status(200).send({ data: id });
    } catch (err) {
        return res.status(400).json({
            error: err
        });
    }
};
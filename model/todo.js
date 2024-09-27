/* eslint-disable */
const pool = require('./database');

const create = async (req, res) => {
    try {
        console.log('Query Results: ' + req);
        const { description } = req.body;
        console.log(`This is the req.body: ${description}`)
        if (!description) {
            return res.status(400).json({ error: 'Description is required'})
        }
    
        const result = await pool.query('INSERT INTO todo (description) VALUES ($1) RETURNING *', [
            description,
        ]);
        console.log('Query result:', result.rows[0]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: err.message });
    }
};

const read = async () => {
    try {
        const res = await pool.query('SELECT * FROM todo');
        console.log('Query results: ', res.rows);
        return res.rows;
    } catch(err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: err.message });
    }
};

const remove = (id) => {
    pool.query('DELETE FROM todo WHERE  todo_id = $1', [
        id,
    ]);
};

module.exports = {
    create,
    read,
    remove,
};

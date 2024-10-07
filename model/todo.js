/* eslint-disable */
const pool = require('./database');

const create = async (description) => {
    console.log('Creating todo with description: ', description);
    try {
        const result = await pool.query('INSERT INTO todo (description) VALUES ($1) RETURNING *', [description]);
        console.log('Query results: ', result.rows[0]);
        return result.rows[0];
    } catch (err) {
        console.error('Error executing query: ', err);
        throw new Error(err.message);
    }
};

const read = async () => {
    try {
        const res = await pool.query('SELECT * FROM todo');
        return res.rows;
    } catch(err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: err.message });
    }
};

const remove = async (id) => {
    console.log('delete has been called')
    try {
        const res = await pool.query('DELETE FROM todo WHERE todo_id = $1 RETURNING *', [id]);
        if (res.rowCount === 0) {
            throw new Error('Todos not found);')
        }
        return res.rows[0];
    } catch (err) {
        console.error('Error deleting tasks: ', err);
        return res.status(500).json({ error: err.message });
    }    
};

module.exports = {
    create,
    read,
    remove,
};

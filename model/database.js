require('dotenv').config();
const { Pool } = require('pg');

console.log(`Connection String: ${process.env.DATABSE_URL}`);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  search_path: 'public',
});

pool.connect((err, client, release) => {
  if (err) {
      console.error('Error acquiring client', err.stack);
      return; 
  }
  console.log('Database connected successfully!');
  release();
})

module.exports = pool;

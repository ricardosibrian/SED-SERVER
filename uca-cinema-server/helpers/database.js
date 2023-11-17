const mysql = require('mysql2/promise');
const debug = require('debug')('app:database');

const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_NAME || 'pelisdb',
    connectionLimit: 5
});

// Connect and check for errors
pool.getConnection((err, connection) => {
    debug('Database connection established');
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection lost');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connection');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused');
        }
    }
    if (connection) connection.release();
    return;
});

module.exports = pool;
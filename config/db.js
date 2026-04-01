const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'logipro-database-do-user-35149116-0.e.db.ondigitalocean.com',
    port: 25060,
    user: 'doadmin',
password: process.env.DB_PASSWORD,
    database: 'defaultdb',
    ssl: { rejectUnauthorized: false },
    waitForConnections: true,
    connectionLimit: 10
});

module.exports = pool.promise();
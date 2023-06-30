import mysql from 'mysql2';

// Connection to the mysql database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'messages',
});

export default db;

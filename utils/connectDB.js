//MYSQL
import mysql from 'mysql2';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'salman',
    password: process.env.DB_PASSWORD,
    database: 'messages',
});

export default db;

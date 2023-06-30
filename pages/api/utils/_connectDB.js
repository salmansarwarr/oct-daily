import mysql from 'mysql2';

// Connection to the mysql database
const db = mysql.createConnection({
    host: 'db4free.net',
    user: 'usersalman',
    password: process.env.DB_PASSWORD,
    database: 'dbmessages',
    port: 3306
});

export default db;

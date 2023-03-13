//MYSQL
import mysql from 'mysql2';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'salman',
    password: 'My@Sql@Password123',
    database: 'messages',
});

export default db;

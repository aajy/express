const mysql = require('mysql');
const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'Aajy8094!@',
    database : 'my_db'
});

connection.connect();

connection.query('SELECT * FROM Users', (error, rows, fields) => {
    if (error) throw error;
    console.log('Users info is: ', rows);
});

connection.end();


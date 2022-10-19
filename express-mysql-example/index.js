const express = require('express');
const mysql = require('mysql');
const { password } = require('./library/database.js');
const dbconfig = require('./library/database.js');
const connection = mysql.createConnection(dbconfig);

const app = express();

connection.connect();
//configuration ==================
app.set('port',process.env.PORT ||3000);

app.get('/', (req, res)=>{
    res.send('Root');
});

app.get('/users', (req,res)=> {
    connection.query('SELECT * from users', (error, rows)=> {
        console.log('User database is ', rows);
        res.send(rows);
    });
});

app.get('/api/posts/:year/:month',(req, res) => {
    res.send(req.params);
})

const courses = [
    { id: 'aaa', password: '1111'},
    { id: 'bbb', password: '2222'},
    { id: 'ccc', password: '3333'},
];
const sql = ''

app.get("/api/courses", (req, res) => {
    connection.query(sql, (error, rows)=> {
        res.send(courses);
    });
    connection.end();
})

app.listen(app.get('port'), () => {
    console.log('Express server listening on port '+ app.get('port'));
});



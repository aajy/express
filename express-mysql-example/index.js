const express = require('express');
const mysql = require('mysql');
const dbconfig = require('./library/database.js');
const connection = mysql.createConnection(dbconfig);

const app = express();

// connection.connect();
//configuration ==================
app.set('port',process.env.PORT ||3000);

app.get('/', (req, res)=>{
    res.send('Root');
});
// 조회
app.get('/users', (req,res)=> {
    connection.query('SELECT * from users', (error, rows)=> {
        console.log('User database is ', rows);
        res.send(rows);
    });
});

// 생성
app.post("/users/create", (req, res) => {
    const insertSql = `INSERT INTO users(id, password, age) VALUES('aaa','1111',20)`
    console.log('req',req.params);
    connection.query(insertSql, (error, rows)=> {
        if(error) console.log(error);
        res.send(rows);
    });
    // connection.end();
});

// 수정
app.put("/users/update", (req, res) => {
    const insertSql = `UPDATE users(id, password, age) VALUES('aaa','1111',20)`
    console.log('req',req.params);
    connection.query(insertSql, (error, rows)=> {
        if(error) console.log(error);
        res.send(rows);
    });
    // connection.end();
});

// 삭제
app.delete("/users/delete", (req, res) => {
    const insertSql = `INSERT INTO users(id, password, age) VALUES('aaa','1111',20)`
    console.log('req',req.params);
    connection.query(insertSql, (error, rows)=> {
        if(error) console.log(error);
        res.send(rows);
    });
    // connection.end();
});


app.listen(app.get('port'), () => {
    console.log('Express server listening on port '+ app.get('port'));
});

module.exports = connection;

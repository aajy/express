const express = require('express');
const mysql = require('mysql');
const dbconfig = require('./config/config.js');

// const connect = require('./module/connection.js');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//configuration ==================
app.set('port',process.env.PORT ||3000);

app.get('/', (req, res)=>{
  res.send('Root');
});

// 조회
app.get('/users', (req,res)=> {
  const connection = mysql.createConnection(dbconfig);
  connection.connect(function(error) {
    if(!error) {
      console.log('Database is connected ... nn');
    } else {
      console.log('Error connecting databases ... nn' + error);
    }

    connection.query('SELECT * from users', (error, rows)=> {
      if(error) console.log(error);
      res.send(rows);
      connection.end();
    });
  });
});

// 생성
app.post("/users", (req, res) => {
    const connection = mysql.createConnection(dbconfig);
    connection.connect(function(error) {
        if(!error) {
            console.log('Database is connected ... nn');
        } else {
            console.log('Error connecting databases ... nn' + error);
        }

        const insertSql = `INSERT INTO users (id, password, age) VALUES ("${req.body.id}","${req.body.password}",${req.body.age? req.body.age : null})`
        connection.query(insertSql, (error, rows)=> {
            if(error) console.log(error);
            res.send(rows);
            connection.end();
        });
    });
});

// 수정
app.put("/users/:seq", (req, res) => {
  let seq = req.params.seq;
  let _strBody = JSON.stringify(req.body)
  _strBody = _strBody.replace(/:/gi, '=');
  _strBody = _strBody.replace(/{|}/gi, '');

  let strBody = '';
  let _tempArr = _strBody.split(',');
  for (let item of _tempArr) {
    strBody += item.split("=")[0].replace(/"/gi, '');
    strBody += "=";
    strBody += item.split("=")[1];
    strBody += ',';
  }

  strBody = strBody.slice(0, strBody.length -1);
  console.log('strBody: ', strBody);
  const connection = mysql.createConnection(dbconfig);
  connection.connect(function(error) {
    if(!error) {
      console.log('Database is connected ... nn');
    } else {
      console.log('Error connecting databases ... nn' + error);
    }

    const insertSql = `UPDATE users SET ${strBody} WHERE seq = ${seq};`
    connection.query(insertSql, (error, rows)=> {
      if(error) console.log(error);
      res.send();
      connection.end();
    });
  });
});

// 삭제
app.delete("/users/:seq", (req, res) => {
  let seq = req.params.seq;
    const connection = mysql.createConnection(dbconfig);
    connection.connect(function(error) {
        if(!error) {
            console.log('Database is connected ... nn');
        } else {
            console.log('Error connecting databases ... nn' + error);
        }

        const insertSql = `DELETE FROM users WHERE seq = ${seq}`
        connection.query(insertSql, (error, rows)=> {
            if(error) console.log(error);
            res.send(rows);
            connection.end();
        });
    });
});


app.listen(app.get('port'), () => {
    console.log('Express server listening on port '+ app.get('port'));
});

// module.exports = connection;

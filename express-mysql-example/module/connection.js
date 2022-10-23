const mysql = require('mysql');
const dbconfig = require('../config/config.js');
/** 
 * 여기 모듈에서는 return 값으로 응답값만 보낸다.
 * res.send(rows);와 같은 코드는 index.js에서 
*/

// 조회
exports.select =  (req,res)=> {
  const connection = mysql.createConnection(dbconfig);
  connection.connect(function(error) {
    if(!error) {
      console.log('Database is connected ... nn');
    } else {
      console.log('Error connecting databases ... nn' + error);
    }
    const insertSql = 'SELECT * from users';
    connection.query(insertSql, (error, rows)=> {
      if(error) console.log(error);
      res.send(rows);
      connection.end();
    });
  });
};

// 생성
exports.insert =  (req,res)=> {
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
};

// 수정
exports.update =  (req,res)=> {
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
};

// 삭제
exports.delete =  (req,res)=> {
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
};
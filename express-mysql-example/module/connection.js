const mysql = require('mysql');
const dbconfig = require('./config/config.js');

const connection = mysql.createConnection(dbconfig);
connection.connect(function(error) {
  if(!error) {
    console.log('Database is connected ... nn');
  }

  connection.query(sql, (error, rows)=> {
    if(error) console.log(error);
    connection.end();
  });
  return error
})
/** 
 * 
 * 
 * 여기 모듈에서는 return 값으로 응답값만 보낸다.
 * res.send(rows);와 같은 코드는 index.js에서
 *  
 * 
 * */

module.exports = connection.connect();
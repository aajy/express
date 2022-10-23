const express = require('express');
// const mysql = require('mysql');
// const dbconfig = require('./config/config.js');

const connect = require('./module/connection.js');

const app = express();
// Parse requests of content-type: application/json
app.use(express.json());
// Parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

//configuration ==================
app.set('port',process.env.PORT ||3000);

app.get('/', (req, res)=>{
  res.send('Root');
});

// 조회
app.get('/users', connect.select);

// 생성
app.post("/users", connect.insert);

// 수정
app.put("/users/:seq", connect.update);

// 삭제
app.delete("/users/:seq", connect.delete);


app.listen(app.get('port'), () => {
    console.log('Express server listening on port '+ app.get('port'));
});

// module.exports = connection;

const express = require('express')
const superagent = require('superagent')
const cheerio = require('cheerio')
const Q = require('q')
const bodyParser = require('body-parser');
const multer = require('multer');
const testLogin = require('./database/testLogin')



let app = express()

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.all('*', function(req, res, next) {//开发模式下允许跨域访问
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();//对于所有的路由执行下面的操作
});

// getBook.getBook().then((data)=>{
//   app.get('/book',(req, res)=>{
//     res.send(JSON.stringify(data))
//   })
// })

app.post('/login', function (req, res) {
  let data = req.body
  console.log('data:',data)
  testLogin.testLogin(req.body.userName,req.body.pwd).then((result)=>{
    console.log(result)
    if(result.length==0) res.json("fail")
    else {res.json(result)}
  })
})


app.listen(3000,function(){
})
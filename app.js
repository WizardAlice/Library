const express = require('express')
const superagent = require('superagent')
const cheerio = require('cheerio')
const Q = require('q')
const bodyParser = require('body-parser');
const multer = require('multer');
const testLogin = require('./database/user/testLogin')
const getNews = require('./database/news/getNews')
const getHot = require('./database/book/getHotBorrow')
const getNewBook =require('./database/book/getNewBook')
const collect = require('./database/user/collect')
const getHotCollect = require('./database/book/getHotCollect')



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

app.get('/getHotCollect',(req,res)=>{
  getHotCollect.getHotCollect().then((data)=>{
    res.json(data)
  })
})


app.post('/login',(req,res)=>{
  let data = req.body
  testLogin.testLogin(req.body.userName,req.body.pwd).then((result)=>{
    console.log(result)
    if(result.length==0) res.json("fail")
    else {res.json(result)}
  })
})

app.post('/collect',(req,res)=>{
  let data = req.body
  collect.collect(req.body.userid,req.body.bookid).then((data)=>{
    res.json(data)
  })
})


app.get('/getNews5',(req,res)=>{
  getNews.getNews().then((data)=>{
    res.json(data)
  })
})

app.get('/getNewBooks',(req,res)=>{
  getNewBook.getNewBook().then((data)=>{
    res.json(data)
  })
})

app.get('/getBookHot',(req,res)=>{
  getHot.getHot().then((data)=>{
    res.json(data)
  })
})

app.listen(3000,function(){
})
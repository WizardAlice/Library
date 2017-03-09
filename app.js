const express = require('express')
const superagent = require('superagent')
const cheerio = require('cheerio')
const mysql = require('mysql')
const Q = require('q')
const bodyParser = require('body-parser');
const multer = require('multer');
const getBook = require('./database/getBookInfo')



let app = express()
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// getBook.getBook().then((data)=>{
//   app.get('/book',(req, res)=>{
//     res.send(JSON.stringify(data))
//   })
// })

app.post('/Login', function (req, res) {
   // 输出 JSON 格式
   console.log(req.body)
   res.send(JSON.stringify("11"));
}
)


app.listen(3000,function(){
})
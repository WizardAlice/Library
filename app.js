const express = require('express')

const bodyParser = require('body-parser') //中间件
const multer = require('multer')



const getInfo = require('./database/user/getInfo')  //用户的所有操作
const changeUserImg = require('./fs/testfs')   

const getNews = require('./database/news/getNews') 

const getHot = require('./database/book/getHotBorrow') //书籍相关

let app = express()

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data
app.use(express.static('qiniu'))

app.all('*', function(req, res, next) {//开发模式下允许跨域访问
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});



app.get('/getHotCollect',(req,res)=>{//首页书相关的
  getHot.getHotCollect().then((data)=>{
    res.json(data)
  })
})

app.get('/getHotComment',(req,res)=>{ 
  getHot.getHotComment().then((data)=>{
    res.json(data)
  })
})

app.get('/latestComment',(req,res)=>{
  getHot.latestComment().then((data)=>{
    res.json(data)
  })
})
app.get('/getNewBooks',(req,res)=>{
  getHot.getNewBook().then((data)=>{
    res.json(data)
  })
})

app.get('/getBookHot',(req,res)=>{
  getHot.getHot().then((data)=>{
    res.json(data)
  })
})

app.post('/getbookInfo',(req,res)=>{
  getHot.getBookInfo(req.body.id).then((data)=>{
    res.json(data)
  })
})

app.get('/getallbook',(req,res)=>{
  getHot.getallbook().then((data)=>{
    res.json(data)
  })
})



app.post('/getUserImg',(req,res)=>{
  changeUserImg.changeUserImg(req.body.id,req.body.userimg)
  res.json({result:"success"})
})


app.post('/getBorrowInfo',(req,res)=>{ //当前登录用户的借阅信息
  getInfo.getBorrowInfo(req.body.id).then((data)=>{
    res.json(data)
  })
})

app.post('/getUserInfo',(req,res)=>{
  getInfo.getInfo(req.body.id).then((data)=>{
    res.json(data)
  })
})

app.post('/changeUserInfo',(req,res)=>{
  getInfo.changeInfo(req.body).then((data)=>{
    res.json(data)
  })
})

app.post('/login',(req,res)=>{
  let data = req.body
  getInfo.testLogin(data.userName,data.pwd).then((result)=>{
    if(result.length==0) res.json("fail")
    else {res.json(result)}
  })
})

app.post('/collect',(req,res)=>{
  let data = req.body
  getInfo.collect(req.body.userid,req.body.bookid).then((data)=>{
    res.json(data)
  })
})




app.get('/getNews5',(req,res)=>{//获取最新的新闻
  getNews.getNews().then((data)=>{
    res.json(data)
  })
})



app.listen(3000,function(){
})
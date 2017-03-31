const mysql = require('mysql')
const Q = require('q')
const connect = require('../connect')
const _ = require('lodash')

function getHot(){
  let connection = connect.getConnection()
  let string1 = 'select bookID,bookName,img, count(*) AS count from library.borrowrec as a INNER JOIN library.book as b ON a.bookID=b.id group by bookID order by count DESC limit 11'
  let deferred = Q.defer()
  connection.query(string1, (err,data)=>{
    if (err){
      deferred.reject(err)
    }
    else
      deferred.resolve(data)
  })
  connection.end()
  return deferred.promise
}

exports.getHot = getHot

function getHotCollect(){
  let connection = connect.getConnection()
  let string1 = 'SELECT id,bookName,count(*) as count,img from library.collect as a INNER JOIN library.book as b ON a.bookid=b.id group by bookid order by count desc limit 11'
  let deferred = Q.defer()
  connection.query(string1, (err,data)=>{
    if (err){
      deferred.reject(err)
    }
    else
      deferred.resolve(data)
  })
  connection.end()
  return deferred.promise
}

exports.getHotCollect = getHotCollect

function getHotComment(){
  let connection = connect.getConnection()
  let string1 = 'select b.id,b.bookName,b.img,count(*) AS count from library.comment as a,library.book as b where a.bookid=b.id group by b.id order by count DESC limit 11'
  let deferred = Q.defer()
  connection.query(string1, (err,data)=>{
    if (err)
      deferred.reject(err)
    else
      deferred.resolve(data)
  })
  connection.end()
  return deferred.promise
}

exports.getHotComment = getHotComment

function getNewBook(){
  let connection = connect.getConnection()
  let string1 = 'SELECT id,bookName,img,date_format(registeDate,\'%Y-%m-%d\') as registeDate FROM library.book group by id order by registeDate desc limit 5'
  let deferred = Q.defer()
  connection.query(string1, (err,data)=>{
    if (err)
      deferred.reject(err)
    else
      deferred.resolve(data)
  })
  connection.end()
  return deferred.promise
}

exports.getNewBook = getNewBook

function latestComment(){
  let connection = connect.getConnection()
  let string1 = 'SELECT a.id as id,date_format(a.date,\'%Y-%m-%d\') as date,c.name as username,c.img as userimg,bookName as bookname,a.content,a.cryptonym FROM library.comment as a,library.book as b,library.user as c where a.userid=c.id and a.bookid=b.id group by id order by date desc limit 4'
  let deferred = Q.defer()
  connection.query(string1, (err,data)=>{
    if (err)
      deferred.reject(err)
    else{
      data.map((data)=>{
        if(data.cryptonym.toString()!=""){
          data.username="匿名"
          data.userimg="123.jpg"
        }
      })
      deferred.resolve(data)
    }
  })
  connection.end()
  return deferred.promise
}

exports.latestComment = latestComment

function getBookInfo(id){
  let connection = connect.getConnection()
  let string1 = "select * from library.book where id = \""+id+"\""
  let deferred = Q.defer()
  connection.query(string1,(err,data)=>{
    if (err) 
      deferred.reject(err)
    else{
      deferred.resolve(data)
    }
  })
  connection.end()
  return deferred.promise
}

exports.getBookInfo = getBookInfo

function getallbook(){
  let connection = connect.getConnection()
  let string1 = "select * from library.book"
  let deferred = Q.defer()
  connection.query(string1,(err,data)=>{
    if (err) 
      deferred.reject(err)
    else{
      deferred.resolve(data)
    }
  })
  connection.end()
  return deferred.promise
}

exports.getallbook = getallbook
// function getHot5(){  //傻逼代码
//   let connection = connect.getConnection()
//   let deferred = Q.defer()
//   let string1 = "SELECT bookname,img FROM library.book where"
//   getHot().then((data)=>{

//     data.map((res)=>{
//       string1 = string1 + " `id`=\""+res.bookID+"\" or"
//     })

//     string1=string1.substr(0,string1.length-2)

//     connection.query(string1,(err,data)=>{
//       if(err){
//         deferred.reject(err)
//       }
//       else {
//         deferred.resolve(data)
//       }
//     })
//     connection.end()
//   })
//   return deferred.promise
// }

// getHot5().then((res)=>{
//   console.log(res)
// })


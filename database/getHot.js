const mysql = require('mysql')
const Q = require('q')
const connect = require('./connect')
const _ = require('lodash')

function getHot(){
  let connection = connect.getConnection()
  let string1 = 'select bookID, count(*) AS count from library.borrowrec group by bookID order by count DESC limit 5'
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

exports.getHot5 = getHot5

function getHot5(){
  let connection = connect.getConnection()
  let deferred = Q.defer()
  let string1 = "SELECT bookname,img FROM library.book where"
  getHot().then((data)=>{

    data.map((res)=>{
      string1 = string1 + " `id`=\""+res.bookID+"\" or"
    })

    string1=string1.substr(0,string1.length-2)

    connection.query(string1,(err,data)=>{
      if(err){
        deferred.reject(err)
      }
      else {
        deferred.resolve(data)
      }
    })
    connection.end()
  })
  return deferred.promise
}

getHot5().then((res)=>{
  console.log(res)
})


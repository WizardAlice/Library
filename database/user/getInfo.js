const mysql = require('mysql')
const Q = require('q')
const connect = require('../connect')

function getInfo(id){
  let connection = connect.getConnection()
  let string1 = 'SELECT id,name,password,gender,address,department,phone,date_format(birthdate,\'%Y-%m-%d\') as birthdate,img FROM library.user where `id`='+id
  let deferred = Q.defer()
  connection.query(string1, (err,data)=>{
    if (err)
      deferred.reject(err)
    else{
      if(data[0].gender.toString()!=""){
        data[0].gender="女"
      }
      else{
        data[0].gender="男"
      }
      deferred.resolve(data)
    }
  })
  connection.end()
  return deferred.promise
}

exports.getInfo = getInfo

function testLogin(id, pwd) {
  let connection = connect.getConnection()
  let string1 = "SELECT id,name,img FROM library.user where id = \"" +id +"\"and password =\""+pwd+"\""
  let deferred = Q.defer()
  connection.query(string1, (err, data) => {
    if (err)
      deferred.reject(err)
    else if(data.length!=0){
      let dataInfo = {
        id:data[0].id,
        name:data[0].name,
        img:data[0].img
      }
      deferred.resolve(dataInfo)
    }
    else 
      deferred.resolve(data)
  })
  connection.end()
  return deferred.promise
}

exports.testLogin = testLogin

function getorder(id){//取得借阅信息，懒得改名字了
  let connection = connect.getConnection()
  let string1 = 'select b.bookName,b.id,c.enDate<now() as isover from library.borrowrec as c,library.book as b,library.user as a where c.readerID = '+id+' and a.id=c.readerID and b.id = c.bookID and c.borrowStatus =(1) group by b.id'
  let deferred = Q.defer()
  connection.query(string1, (err,data)=>{
    if (err)
      deferred.reject(err)
    else{
      deferred.resolve(data)
    }
  })
  connection.end()
  return deferred.promise
}

function getBorrowInfo(id){
  let result = [[],[]]
  let connection=connect.getConnection()
  let string1 = 'SELECT b.bookName,b.id FROM library.`order` as a,library.`book` as b where a.bookID=b.id and readID = '+id
  let deferred = Q.defer()
  getorder(id).then((res)=>{
    res.map((a)=>{
      result[0].push(a)
    })
    connection.query(string1,(err,data)=>{
      if(err)
        deferred.reject(err)
      else{
        data.map((a)=>{
          result[1].push(a)
        })
        deferred.resolve(result)
      }
    })
    connection.end()   
  })
  return deferred.promise 
}
// getorder(321).then((res)=>{
//   console.log(res[1],res[0])
// })


exports.getBorrowInfo = getBorrowInfo

function changeInfo(data){
  let connection = connect.getConnection()
  let [a,...b]=data
  let string =''
  b.map((res)=>{
    if(res[0]!="gender")
      string +=res[0]+" = '"+res[1]+"',"
    else{
      if(res[1]=="female")
        string +=res[0]+" = (0),"
      else
        string +=res[0]+" = (1),"
    }
  })
  string2 = "UPDATE `library`.`user` SET "+string.substr(0,string.length-1)+" where `id` ="+a[1]
  let deferred = Q.defer()
  connection.query(string2, (err,data)=>{
    if (err)
      deferred.reject(err)
    else{
      deferred.resolve({result:"success"})
    }
  })
  connection.end()
  return deferred.promise
}

exports.changeInfo = changeInfo

function isCollected(userid,bookid){
  let connection = connect.getConnection()
  let string1 = 'SELECT * FROM library.collect where userid = \''+userid+'\' and bookid = \''+bookid+'\''
  let deferred = Q.defer()
  connection.query(string1,(err,data)=>{
    if(err)
      deferred.reject(err)
    else
      deferred.resolve(data)
  })
  connection.end()
  return deferred.promise
}

function collect(userid,bookid){
  let connection = connect.getConnection()
  let string1 = 'INSERT INTO `library`.`collect` (`userid`, `bookid`) VALUES (\''+userid+'\', \''+bookid+'\')'
  let deferred = Q.defer()
  isCollected(userid,bookid).then((data)=>{
    if(data.length!=0){
      deferred.resolve({answer:"Collected Already!"})
    }
    else{
      connection.query(string1, (err,data)=>{
        if (err){
          deferred.reject(err)
        }
        else{
          deferred.resolve({answer:"Collected Success!"})
        }
      })
      connection.end()
    }
  })
  return deferred.promise
}

exports.collect = collect

function isOrder(userid,bookid){
  let connection = connect.getConnection()
  let string1 = 'SELECT * FROM library.order where userid = \''+userid+'\' and bookid = \''+bookid+'\''
  let deferred = Q.defer()
  connection.query(string1,(err,data)=>{
    if(err)
      deferred.reject(err)
    else
      deferred.resolve(data)
  })
  connection.end()
  return deferred.promise
}

function order(userid,bookid){
  let connection = connect.getConnection()
  let string1 = 'INSERT INTO `library`.`order` (`userid`, `bookid`) VALUES (\''+userid+'\', \''+bookid+'\')'
  let deferred = Q.defer()
  isOrder(userid,bookid).then((data)=>{
    if(data.length!=0){
      deferred.resolve({answer:"Collected Already!"})
    }
    else{
      connection.query(string1, (err,data)=>{
        if (err){
          deferred.reject(err)
        }
        else{
          deferred.resolve({answer:"Collected Success!"})
        }
      })
      connection.end()
    }
  })
  return deferred.promise
}

exports.order = order
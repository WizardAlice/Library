const mysql = require('mysql')
const Q = require('q')
const connect = require('./connect')

function testLogin(id, pwd) {
  let connection = connect.getConnection()
  let string1 = "SELECT * FROM library.user where cardId = \"" +id +"\"and password =\""+pwd+"\""
  console.log(string1)
  let deferred = Q.defer()
  connection.query(string1, (err, data) => {
    if (err)
      deferred.reject(err)
    else if(data.length!=0){
      let dataInfo = {
        id:data[0].cardId,
        name:data[0].name
      }
      deferred.resolve(dataInfo)
    }
    else 
      deferred.resolve(data)
  })
  return deferred.promise
}

exports.testLogin = testLogin

// testLogin(123,"dfsd").then((result)=>{
//   if(result.length==1) console.log("111")
//   else console.log("222")
// })
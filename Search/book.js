const solr = require('solr-client')
const Q = require('q')
// const fs = require('fs')
// const exec = require('child_process').exec

// Create a client
let host = "127.0.0.1"
let port = "8983"
let core = "book"
let path = "/solr"
var client = solr.createClient(host,port,core,path)

client.autoCommit = true

function searchBook(a){
  let deferred = Q.defer()
  let string = encodeURI(a)
  client.search('q='+string, function(err, obj){
    if(err) deferred.resolve(err)
    else deferred.resolve(obj.response)
  })
  return deferred.promise
}

exports.searchBook = searchBook


// var options = {   //上传的文件
//   path : 'E:\\solr-6.5.0\\example\\exampledocs\\folder',
//   format : 'folder'
// }



// client.addRemoteResource(options,function(err,obj){  //上传索引库的配置
//    if(err){
//       console.log(err)
//    }else{
//       console.log(obj)
//    }
//   client.commit(function(err,res){  //设置commit=true
//     if(err) console.log(err)
//     if(res) console.log(res)
//   })
// })

// let cmd = "cd fs && java -Dauto -Durl=http://localhost:8983/solr/Run/update -jar post.jar E:\\solr-6.5.0\\example\\exampledocs\\folder" //上传某一个文件夹
// exec(cmd,(err)=>{
//   if(err)
//     console.log(err)
// })

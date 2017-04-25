const solr = require('solr-client')
const Q = require('q')
// const fs = require('fs')
// const exec = require('child_process').exec

// Create a client
let host = "127.0.0.1"
let port = "8983"
let core = "user"
let path = "/solr"
var client = solr.createClient(host,port,core,path)

client.autoCommit = true

function searchUser(a){
  let deferred = Q.defer()
  let string = encodeURI(a)
  client.search('q='+string, function(err, obj){
    if(err) deferred.resolve(err)
    else deferred.resolve(obj.response)
  })
  return deferred.promise
}

exports.searchUser = searchUser
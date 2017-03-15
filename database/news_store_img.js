const mysql = require('mysql')
const Q = require('q')
const connect = require('./connect')

function store(id,img){
	let connection = connect.getConnection()
	let string1 = "UPDATE `library`.`news` SET `img`=\""+img+"\" WHERE `id`=\""+id+"\""
	let deferred = Q.defer()
	console.log(string1)
	connection.query(string1, (err,data)=>{
		if (err)
			deferred.reject(err)
		else
			deferred.resolve(data)
	})
	return deferred.promise
}

exports.store = store
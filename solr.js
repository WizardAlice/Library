const schedule = require('node-schedule')
const querystring = require('querystring')
const http = require('http')

let options = [{
  host: 'localhost', // 
  port:8983,
  path:"/solr/book/dataimport?command=delta-import", // 具体路径, 必须以'/'开头, 是相对于host而言的,此时是增量导入,完全导入是dataimport?command=full-import,此外对配置进行强制重新加载是/dataimport?command=reload-config
  method: 'GET', 
  headers: {
      'Content-Type': 'application/json'
  }
},{
  host: 'localhost', // 
  port:8983,
  path:"/solr/user/dataimport?command=delta-import", 
  method: 'GET', 
  headers: {
      'Content-Type': 'application/json'
  }
}]

let rule = new schedule.RecurrenceRule()

rule.second = [0,10,20,30,40,50]

var j = schedule.scheduleJob(rule, function(){
    options.map((option)=>{
      http.get(option)
    })
})
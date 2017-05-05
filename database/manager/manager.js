const mysql = require('mysql')
const Q = require('q')
const connect = require('../connect')
const lodash = require('lodash')
const fs = require('fs')

function addNews({title,subTitle,content,author,appendix = null, img = null} = {}){
  let connection = connect.getConnection()
  let string1 = appendix?(img?"INSERT INTO `library`.`news` (`title`, `subtitle`, `content`, `presonLiable` ,`appendix` , `img`) VALUES ('"+title+"', '"+subTitle+"', '"+content+"', '"+author+"', '"+appendix+"', '"+img+"')":
    "INSERT INTO `library`.`news` (`title`, `subtitle`, `content`, `presonLiable` ,`appendix` , `img`) VALUES ('"+title+"', '"+subTitle+"', '"+content+"', '"+author+"', '"+appendix+"', "+img+")"
    ):(img?"INSERT INTO `library`.`news` (`title`, `subtitle`, `content`, `presonLiable` ,`appendix` , `img`) VALUES ('"+title+"', '"+subTitle+"', '"+content+"', '"+author+"', "+appendix+", '"+img+"')":
    "INSERT INTO `library`.`news` (`title`, `subtitle`, `content`, `presonLiable` ,`appendix` , `img`) VALUES ('"+title+"', '"+subTitle+"', '"+content+"', '"+author+"', "+appendix+", "+img+")"
    )
  let deferred = Q.defer()
  connection.query(string1, (err,data)=>{
    if (err)
      deferred.reject(err)
    else{
      // console.log(lodash)
      let id = lodash.padStart(data.insertId,10,'0')
      if(img){
        fs.rename('./qiniu/img/img_of_news/'+img,'./qiniu/img/img_of_news/'+id+".jpg")
      }
      // if(appendix){     //附件文件夹直接建一个静态文件目录，就不用上传了
      //   let a = appendix.split('.')[1]
      //   fs.rename('./qiniu/appendix/'+appendix,'./qiniu/appendix/'+id+"."+a,(err)=> console.log(err))
      // }
      deferred.resolve({answer:"上传成功"})
    }
  })
  connection.end()
  return deferred.promise
}

exports.addNews = addNews

// addNews({title:"suibian",subTitle:"suibian",content:"suibian",author:"suibian",img:"suibian"})
const fs = require('fs')
// const exec = require('child_process').exec

// fs.open('../cache/123','wx',(err,fd)=>{
//     console.log(111)
// })

//上传附件之后直接写数据库？但是此时数据库里面没有这个关系啊,再建一个表吗？再建一个表就行了吧
//表的结构改成好多能空，在上传附件和上传图片的时候就创建一个表了，之后再将其他数据写入表中 
//并不需要了。在前端就能改好，设置一个上传之前的钩子

function runStore(id,oriname,path,name,type){
  let foldername = ''
  if(type=="appendix"){
    foldername = './qiniu/appendix/'    //附件暂且全部存在此目录下
  }
  else if(type="newsImg"){
    foldername = './qiniu/img/img_of_news/'
  }
  else if(type=="bookImg"){
    foldername = './database/img/img_of_book/'
  }
  fs.exists(foldername,(err,fd)=>{    //判断是否存在此文件夹
    if(err)
      console.log(err)
    else {
      fs.mkdir(foldername,(err)=>{     //如果不存在就创建一个
        if(err) console.log(err)
      })
    }
  })

  fs.readFile(path,(err,data)=>{       //将其转移到目标文件夹中
    if(err)
      console.log(err)
    else{
      fs.writeFile(foldername+oriname,data,(err)=>{
        if(err)
          console.log(err)
      })
    }
  })
  fs.unlink(path,(err)=>{               //删除最初的地址中的文件
    if(err) console.log(err)
  })
}

exports.runStore = runStore
// runStore(123)
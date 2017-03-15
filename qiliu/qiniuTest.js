const qiniu = require("qiniu")
const fnv = require('fnv-plus')
const getFiles = require('./getFile')
const store = require('../database/news_store_img')

//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'MI-TKUDiDhATmP6nbdJKOzLK2llnrCkXoVmHbZpS';
qiniu.conf.SECRET_KEY = '5DiueXDTe4etp_HWEN0IuWD5s32tvSn6j49Jez9e';

//要上传的空间
bucket = 'taskuserimg';

//上传到七牛后保存的文件名,在此生成一个哈希值



function getKey(id){
  return fnv.hash(id,64).str()+'\.jpg'
}



//构建上传策略函数
function uptoken(bucket, key) {
  var putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
  return putPolicy.token()
}

//生成上传 Token
// token = uptoken(bucket, key);

//要上传文件的本地路径,生成本地地址
// filePath = './edit.png'
function getFilePath(id){
  return './img/img_of_news/'+id+'\.jpg'
}


//构造上传函数
function uploadFile(id) {
  let key = getKey(id)
  let token = uptoken(bucket, key);
  let localFile = getFilePath(id)
  var extra = new qiniu.io.PutExtra();
  qiniu.io.putFile(token, key, localFile, extra, function(err, ret) {
    if(!err) {
      // 上传成功， 处理返回值
      store.store(id,key).then(()=>{
        return ret.key
      })   
    } else {
      // 上传失败， 处理返回代码
      console.log(err)
    }
  })
}

//调用uploadFile上传，用户id为123，图片名称是123.png
// uploadFile("0000000002");
exports.uploadFile = uploadFile

var datas = getFiles.getFiles.getImageFiles("./img/img_of_news/")
console.log(datas)
datas.map((data)=>{
  uploadFile(data)
})
const fs = require('fs')
const Q = require('q')
// const data = require(`../qiniu/img/img_of_user/123.jpg`)

fs.readFile('../qiniu/img/img_of_user/123.jpg', (err, data) => {
  if (err) {
    if (err.code === "ENOENT") {
      console.error('myfile does not exist');
      return;
    } else {
      throw err;
    }
  }
  console.log(data)
  fs.writeFile('./fs.jpg',data,(err)=>{
    if(err)
      console.log(err)
  })
  fs.writeFile('./123.text',"123",(err)=>{
    if(err)
      console.log(err)
  })
  return data
})


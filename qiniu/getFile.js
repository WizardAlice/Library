//引用文件系统模块
var fs = require("fs");
//引用imageinfo模块
var image = require("imageinfo");

const _ = require('lodash')

function readFileList(path, filesList) {
    var files = fs.readdirSync(path);
    files.forEach(function (itm, index) {
        var stat = fs.statSync(path + itm);
        if (stat.isDirectory()) {
        //递归读取文件
            readFileList(path + itm + "/", filesList)
        } else {

            var obj = {};//定义一个对象存放文件的路径和名字
            obj.path = path;//路径
            obj.filename = itm//名字
            filesList.push(obj);
        }

    })

}
var getFiles = {
//获取文件夹下的所有文件
    getFileList: function (path) {
        var filesList = [];
        readFileList(path, filesList);
        return filesList;
    },
    //获取文件夹下的所有图片
    getImageFiles: function (path) {
        var imageList = [];

        this.getFileList(path).forEach((item) => {
            var ms = image(fs.readFileSync(item.path + item.filename));

            ms.mimeType && (imageList.push(item.filename))
        })
        let data =[]
        imageList.map((file)=>{
            data.push(_.replace(file,'.jpg',''))
        })
        return data

    }
}

exports.getFiles = getFiles

//获取文件夹下的所有图片
// var datas = getFiles.getImageFiles("./img/img_of_news/")
//获取文件夹下的所有文件
// getFiles.getFileList("./public/")
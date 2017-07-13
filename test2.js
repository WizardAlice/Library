// let a = {
//  x:12,
//  y:23,
//  z:34
// }
// let b = new Map(Object.entries(a)).has('x')
// console.log(b)
// for(let i of Object.entries(a)){
//  console.log(i)
// }
// console.log(Object.entries(a)) ////将对象变成数组

// console.log(0b111110111)

// function add(x, y) {
// console.log(x+y)  
// return x + y;  
// }  
// var numbers = [4, 38,33];  
// add(...numbers)

// 100
// 99 1 2
// 98 2 3
// 97 3 5  //斐波那契数

// let s = new Set([1,2,3,3,3])  //扩展运算符和set配合使用去重
// let a = [...s]
// a.map(a=>console.log(a))

// var http = require('http')

// var request = http.get({ host: '127.0.0.1',
//   port: '8983',
//   path: '/solr/book/select?q="波"&wt=json',
//   headers: { accept: 'application/json; charset=utf-8' } })

// request.on('response',(callback)=>{
//  console.log(callback)
// })

// const _ = require('lodash')
// let a = {
//  name: "Jack",
//  age: 13 
// }

// function objToStrMap(obj) {
//   let strMap = new Map();
//   for (let k of Object.keys(obj)) {
//     strMap.set(k, obj[k]);
//   }
//   return strMap;
// }

// console.log(_.isEmpty(a))

// if(a.props == null){
//  console.log(111)
// }else{
//  console.log(222)
// }
// for(let i in a){
//  console.log(a[i])
// }

  // var flatten = function(input, shallow, strict, startIndex) {
  //   var output = [], idx = 0;
  //   for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
  //     var value = input[i];
  //     if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
  //       //flatten current level of array or arguments object
  //       if (!shallow) 
  //        value = flatten(value, shallow, strict);
  //       var j = 0, len = value.length;
  //       output.length += len;
  //       while (j < len) {
  //         output[idx++] = value[j++];
  //       }
  //     } else if (!strict) {
  //       output[idx++] = value;
  //     }
  //   }
  //   return output;
  // };

// function flattern( array, shallow = false ) {
//   let output = []
//   for( let i = 0; i < array.length; i++ ){
//     if( isArrayLike(array[i])){
//       if(shallow) {
//         return array[ai]
//       }
//     }
//   }
// }

function oneFlattern(array, shallow = false){
  let output = []
  let i = 0
  array.map((vs, index) => {
    if(vs.length && !shallow){
      oneFlattern(vs).map((v) => {
        output[i] = v
        i++
      })
    }else{
      output[i] = vs
      i++
    }
  })
  return output
}

console.log(oneFlattern([1,[1,2],[2,5,[1,3,[2,5]]]], true))
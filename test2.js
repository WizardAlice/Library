let a = {
	x:12,
	y:23,
	z:34
}
let b = new Map(Object.entries(a)).has('x')
console.log(b)
// for(let i of Object.entries(a)){
// 	console.log(i)
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
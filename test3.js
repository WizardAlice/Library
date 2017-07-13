const _ = require('lodash')

let nums = [1, 2, 3, 4, 5, 7, [2, 3, 4], [[100]]]

let its = [
	{name:'Alice', age:'21'},
	{name:'Eric', age:'21'},
	{name:'Paradiser',age:'22'}
]

let result = _.chain(nums)
	.flattenDeep()
	.filter(n => n>0)
	.map(n => n)
	.fill("su",1,5)
	// .splice(1,3)
	// .sort()
	.value()
console.log(result)

// console.log(_.findIndex(its, o => o.age == '21'))


const { timeStamp } = require("console");

function test(x,n) {
var base = x;
var power = n;
var sum = base;

for(i = 1; i < power; i++) {

    sum = sum * base;

}

return sum;

}

console.log(test(5,2));
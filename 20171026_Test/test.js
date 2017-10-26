console.log("test");
//----- Conslole Logic Format -----
var a = 0, b = 1;
console.log(a > b);
console.log(a < b);
console.log(a != b);
console.log(a == b);
console.log(a >= b);
console.log(a <= b);
console.log(a == 0 && b == 1);
//----- Fibonacci -----
console.info("----- Fibonacci -----");
var strF;
var i = 1; j = 1; s = i + j;
strF = "Output Fibonacci >> 1 1 ";
while(s <= 1000)
{
	strF = strF + s + " ";
	i = j;
	j = s;
	s = i + j;
}
console.info(strF);
console.info("\n");
//-----  -----
//----- Hello World -----
console.log("Hello World!!");
console.log("This is Kingchenkong.");
console.log("node.js - console.log() Method");
console.log("node.js - console.info() Method");

//----- Console Format String -----
console.log("%s", "this is KCK");
console.log("%s %s %s", "aaa", "bbb", "ccc");
console.log("%s:%s", "object", "string");
console.log("%s-%s", "object", "string");
console.log("%");
console.log("%%");
//----- Console Format Number -----
console.log("%d", 1234567);
console.log("%3d", 1234567);
console.log("%d - %d = %d", 8.8, 8.0, (8.8 - 8));
console.log(12345);
console.log("%d", 8+8, 8-8, 8*8, 8/8);
console.log("%d", "8+8");
console.log("%d", 8/0);
//----- Console JSON Format -----
console.log("%j", {OS:"Windows", Version:"7.1", Language:["English","Chinese"]});
var v_json = {
	OS:"Windows",
	Version:"7.1",
	Language:["English","Chinese"]
}
console.log("%j", v_json);
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
//----- Console Error - Warn -----
var fs = require('fs');
var file = 'chapter01/error-warn.txt';
var encoding = 'UTF-8';
fs.readFile(file, encoding, function(err, data){
	if(err) {
		console.error("error - \n %s", err);
		console.warn("warn - \n %s", err);
	} else {
		console.log(data);
	}
});
// ----- stderr-file.js -----
console.log("// ----- stderr-file.js -----");
var fs1 = require('fs');
var file1 = 'chapter01/not-found.txt';
var encoding1 = 'UTF-8';
fs1.readFile(file1, encoding1, function(err, data){
	if (err) {
		console.error("error - \n %s", err);
		console.warn("warn - \n %s", err);
	} else {
		console.log(data);
	}
})

// ----- Object dir -----
console.log("// ----- Object dir -----");
console.dir(123);
console.dir("abc");
console.dir({"abc":123});
console.dir(1 + 2 * 3 + 1);
console.dir(console);


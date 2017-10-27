// -- test - http - create basic server
console.info("----- http - create basic server -----");
console.info();
var httpBasicServer = require('http');
httpBasicServer.createServer(function(req, res) {
	res.writeHead(200, {'content-type' :  'text/html'});
	res.write('<h3>Node.js --- HTTP</h3>');
	res.end('<p>Create Basic HTTP Server!</p>');
}).listen(6868);




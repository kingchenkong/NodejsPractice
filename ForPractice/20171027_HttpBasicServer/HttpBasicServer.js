console.info("----- http - create basic server -----");
console.info();
var httpBasicServer = require('http');
// .createServer() - build server
httpBasicServer.createServer(function(req, res) {
    // .writeHeader() - write http header
    res.writeHead(200, {'content-type' :  'text/html'});
    // .write() - write page body
    res.write('<h3>Node.js --- HTTP</h3>');
    // .end() - send flag code, tell server message finish
	res.end('<p>Create Basic HTTP Server!</p>');
}).listen(6868);
    // listen port 6868 
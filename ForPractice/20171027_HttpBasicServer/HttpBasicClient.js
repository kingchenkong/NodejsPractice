console.info("----- http - create basic clinet -----");
console.info();
var httpBasicClient = require('http');
// define server args
// @type {{hostname: string, port: number, path: string, method: string}}
var options = {
    hostname: 'localhost',
    port: 6868,
    path: '/',
    method: 'POST'
};
// client call request to HTTP server
var req = httpBasicClient.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function(chunk) {
        console.log('Body: ' + chunk);
    });
});

// listen to 'error' event
req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});

// write data to request body
req.write('data\n');

// write end to request body
req.end();


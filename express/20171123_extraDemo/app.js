//----------------- Module require -----------------
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

// Module loading
var app = express();


// ----- vhost
// var vhost = require('vhost');
// var admin = express.Router;

// app.use(vhost('admin.*', admin));
// admin.get('/', function (req, res) {
//   res.render('admin/home');
// });
// admin.get('/user', function (req, rex) {
//   res.render('admin/users');
// });
// -----

// ----- test middleware & routes
// app.use(function (req, res, next) {
//   console.log('\n\nALLWAYS');
//   next();
// });
// app.get('/a', function (req, res) {
//   console.log('/a : route terminated.');
// });
// app.get('/a', function (req, res) {
//   console.log('/a : never called.');
// });
// app.get('/b', function (req, res, next) {
//   console.log('/b : route not terminated.');
//   next();
// });
// app.use(function (req, res, next) {
//   console.log('SOMETIMES');
//   next();
// });
// app.get('/b', function (req, res, next) {
//   console.log('/b (part 2) : error thrown');
//   throw new Error('b failed');
// });
// app.use('/b', function (err, req, res, next) {
//   console.log('/b error detected and passed on.');
//   next(err);
// });
// app.get('/c', function (err, req) {
//   console.log('/c : error thrown.');
//   throw new Error('c failed.');
// });
// app.use('/c', function(err, req, res, next){
//   console.log('/c: error deteccted but not passed on.');
//   next();
// })
// app.use(function(err, req, res, next){
//   console.log('unhandled error detected: ' + err.message);
//   res.send('500 - server error.')
// });
// app.use(function(req, res){
//   console.log('routed not handled');
//   res.send('404 - not found.');
// })
// app.listen(3001, function(){
//   console.log('listening on 3001');
// })
// ----- 

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//----------------- Router -----------------
app.use('/', index);
app.use('/users', users);

//----------------- Error -----------------
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//----------------- Module export -----------------
module.exports = app;

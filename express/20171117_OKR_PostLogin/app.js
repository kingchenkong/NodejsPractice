//----------------- Module require -----------------
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// json ajax necessary
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// router setting
var router = require('./routes/router');
var users = require('./routes/users');

// Data Base
var mysql = require('mysql');
var db_con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'test_okr_sys01',
  port: 3307
});
// mysql error
db_con.connect(function (err) {
  if (err) {
    console.log('#-- Error: ./app.js: con_sql connnect fail.');
    console.log(err);
    return;
  }
  console.log('# ./app.js: con_sql connnect success.');
})

// Module loading
var app = express();

//----------------- View engine setup -----------------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// db state
app.use(function (req, res, next) {
  req.db_con = db_con;
  next();
});

//----------------- Router -----------------
app.use('/', router);
app.use('/users', users);

//----------------- Error -----------------
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//----------------- Module export -----------------
module.exports = app;

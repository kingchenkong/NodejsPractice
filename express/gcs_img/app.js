
// ----------------- Module require -----------------
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var uuidv4 = require('uuid/v4');
var multiparty = require('multiparty');
// console.log('###### uuidv4: ' + uuidv4());

// Module loading
var app = express();
// ---------------------------------------------------

// ----------------- Data Base -----------------
var mysql = require('mysql');
var mysql_local = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  dateStrings: true,
  // database: 'okr_system_02',
  // port: 3306
  database: 'test_okr_sys_Jerry',
  port: 3307
});
var mysql_cloud = mysql.createConnection({
  host: '35.194.154.136',
  user: 'root',
  password: 'okrssysrootpwd',
  dateStrings: true,
  database: 'okr_sys_test'
});
var db_con = mysql_cloud;


//session
var session = require('express-session');
app.use(session({
  secret: 'recommand 128 bytes random string', // 建议使用 128 个字符的随机字符串
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 10 * 60 * 1000 }//ms
}));
// app.get('/', function (req, res) {
//   if(req.session.isVisit) {
//     req.session.isVisit++;
//     res.send('<p>第 ' + req.session.isVisit + '次来到此页面</p>');
//   } else {
//     req.session.isVisit = 1;
//     res.send('欢迎第一次来这里');
//   }
// });


// mysql error
db_con.connect(function (err) {
  if (err) {
    console.log('#-- Error: ./app.js: con_sql connnect fail.');
    console.log(err);
    return;
  }
  console.log('# ./app.js: con_sql connnect success.');
})

// db state
app.use(function (req, res, next) {
  req.db_con = db_con;
  next();
});
// ---------------------------------------------------

// ----------------- GCP storage -----------------
// 參考連結：
// https://googlecloudplatform.github.io/google-cloud-node/#/docs/google-cloud/0.39.0/storage/bucket
// https://googlecloudplatform.github.io/google-cloud-node/#/docs/google-cloud/0.39.0/storage/file?method=exists
// https://googlecloudplatform.github.io/google-cloud-node/#/docs/google-cloud/0.39.0/storage/bucket?method=upload


var Promise = require('bluebird');
var GCS = Promise.promisifyAll(require('@google-cloud/storage'));

var GCS_storage = GCS({
  projectId: 'workdone-okrssystem-cmoneypro',
  keyFilename: './WorkDone-OKRsSystem-CMoneyPro-856a4473eb7c.json'
});

// var GCS_bucketName = 'workdone-okrssystem-storage';
// var GCS_imgFloderPath = GCS_bucketName + '/OKRs_sys_images';
// var GCS_imgBucket = GCS_storage.bucket(GCS_bucketName + '/OKRs_sys_images');
// var GCS_sqlBucket = GCS_storage.bucket(GCS_bucketName + 'mysql_backUp');

var GCS_imgBucketName = 'okrs-sys-emp-img';
var GCS_imgBucketInstance = GCS_storage.bucket(GCS_imgBucketName);


// check if a file exists in bucket
var imgName = 'admin.jpg';
var file = GCS_imgBucketInstance.file(imgName);
file.existsAsync()
  .then(exists => {
    if (exists) {
      // file exists in bucket
      console.log('###########\nfile: ' + imgName + ' is exist.\n###########');
    }
  })
  .catch(err => {
    console.log('###########\n file: ' + imgName + 'is not exist.\n###########\n');
    return err
  });

// upload file to bucket
// let localFileLocation = './upload_buffer/images/zebra.gif';
// let localFileLocation = './public/images/hosting.png';
// GCS_imgBucketInstance.uploadAsync(localFileLocation, { public: true })
//   .then(file => {
//     // file saved
//   });
var GCS_uploadImagePublic = file_location => {
  GCS_imgBucketInstance.uploadAsync(file_location, { public: true })
    .then(file => {
      // file saved
      console.log('upload:');
      console.log('name: ' + file.name);
      console.log('bucket: ' + file.bucket)
    })
};

// get public url for file
var GCS_getPublicThumbnailUrlForItem = file_name => {
  return `https://storage.googleapis.com/${GCS_imgBucketName}/${file_name}`
};
// console.log('file_name: ' + GCS_getPublicThumbnailUrlForItem(imgName));
// https://storage.googleapis.com/OKRs_sys_images/kong.png

// get GCS Img URL
app.use(function (req, res, next) {
  req.GCS_getImgUrl = GCS_getPublicThumbnailUrlForItem;
  req.GCS_uploadImg = GCS_uploadImagePublic;
  // 在routes 用這個物件 且要丟引數 file name string
  // ex: console.log('routes: file_name: ' + req.GCS_getImgUrl('kong.png'));
  next();
});

//---------------------------------------------------

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

// parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ----------------- Router -----------------
// router setting
// -- declare
var mainRoutes = require('./routes/mainRoutes');
// var routes_login = require('./routes/routes_login');
// var routes_profile = require('./routes/routes_profile');
// var routes_othersProfile = require('./routes/routes_othersProfile');
// var routes_othersOKRs = require('./routes/routes_othersOKRs');

// -- use
app.use('/', mainRoutes);
// app.use('/login', routes_login);
// app.use('/profile', routes_profile);
// app.use('/othersProfile', routes_othersProfile); // Anvis
// app.use('/othersOKRs', routes_othersOKRs); // Frank

// ---------------------------------------------------

// ----------------- Error -----------------
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
// ---------------------------------------------------

// ----------------- Module export -----------------
module.exports = app;
// ---------------------------------------------------

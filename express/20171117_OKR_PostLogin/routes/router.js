var express = require('express');
var router = express.Router();

//----- login page -----
router.get('/', function (req, res, next) {
  // res.json(['statusCode', 'init']);
  res.render('login', { title: 'Work? Done.', statusCode: 'init' });
});

router.get('/datadismatch', function (req, res, next) {
  console.log('# datadismatch');
  // res.json(['statusCode', 'datadismatch']);
  res.render('login', { title: 'Work? Done.', statusCode: 'datadismatch' });
});

//----- login post -----
router.post('/login', function (req, res, next) {

  var acc = req.body.account;
  var pwd = req.body.password;

  // db query -----
  if (acc != '' && pwd != '') {
    var filter = 'SELECT * FROM `employee` WHERE `Emp_Account` = ? AND `Password` = ?';
    /* 
     table: employee
     column: Emp_Account (PK), 員工帳號,         varchar(30)
             Password,         密碼,             varchar(30)
             Act_Permission,   帳號權限,         int(5)
             Emp_Name,         員工名稱,         varchar(15)
             Act_Setting,      帳號偏好設定,      text
             Act_AnotherData,  帳號雜項,         text
             Company (FK),     隸屬公司(Cmp_ID), varchar(15)
             Department (FK),  隸屬部門(Dpm_id), varchar(15)
     */
    req.db_con.query(filter, [acc, pwd], function (err, rows) {
      if (err) {
        console.log('#-- Error: ./routes/index.js: .post/login: db.query: error.');
        console.log(err);
        return;
      }
      if (JSON.stringify(rows) == "[]") {
        // account or password incorrect.
        console.log('#-- Error: ./routes/index.js: .post/login: db.query: data dismatch.');
        res.redirect('/datadismatch');
      } else {
        console.log('# ./routes/index.js: .post/login: db.query: login');
        console.log(JSON.stringify(rows));
        res.render('profile', { title: 'Account Information', data: rows });
        // res.json(['success', 'Sever got a Ajax [' + type + '] request, acc = ' + acc + ', pwd = ' + pwd]);
        // res.render('profile', { title: 'Account Information', data: rows });
      }
    });
  }
});

//----- localhost:3000/ajax -----
router.get('/ajax', function (req, res, next) {
  console.log('# ./routes/router.js: .get(/ajax) ');
  res.render('ajax');
});

//----- test req_ajax -----
router.post('/req_ajax', function (req, res, next) {
  /* req.body对象
     包含POST请求参数。
     这样命名是因为POST请求参数在REQUEST正文中传递，而不是像查询字符串在URL中传递。
     要使req.body可用，可使用中间件body-parser
  */
  console.log('# ./routes/router.js: .post(/req_ajax) ');

  var urlencodedParser = req.urlencodedParser;
  var type = req.body.type;
  var info = req.body.info;

  console.log('服务器收到一个Ajax [' + type + '] 请求，信息为：' + info);
  res.json(['success', 'sever got a Ajax [' + type + '] request, message: ' + info]);
});

router.get('/req_ajax', function (req, res, next) {
  /* req.query对象
     通常称为GET请求参数。
     包含以键值对存放的查询字符串参数
     req.query不需要任何中间件即可使用
  */
  console.log('# ./routes/router.js: .get(/req_ajax) ');

  var type = req.query.type;
  var info = req.query.info;
  console.log('服务器收到一个Ajax [' + type + '] 请求，信息为：' + info);
  res.json(['success', 'sever got a Ajax [' + type + '] request, message: ' + info]);
});

//----- check account data -----
router.post('/req_ajax_check_acc_pwd', function (req, res, next) {
  /* req.body对象
     包含POST请求参数。
     这样命名是因为POST请求参数在REQUEST正文中传递，而不是像查询字符串在URL中传递。
     要使req.body可用，可使用中间件body-parser
  */
  console.log('# ./routes/router.js: .post(/req_ajax) ');

  var urlencodedParser = req.urlencodedParser;
  var type = req.body.type;
  var acc = req.body.acc;
  var pwd = req.body.pwd;

  // message -----
  console.log('Sever got a Ajax [' + type + '] request, acc = ' + acc + ', pwd = ' + pwd);
  // - send msg to console.
  // res.json(['success', 'Sever got a Ajax [' + type + '] request, acc = ' + acc + ', pwd = ' + pwd]);
  // - send msg to ./javascript/ajax.js: Check_acc_pwd():
  // -----

  // db query -----
  if (acc && pwd) {
    var filter = 'SELECT * FROM `employee` WHERE `Emp_Account` = ? AND `Password` = ?';
    /* 
     table: employee
     column: Emp_Account (PK), 員工帳號,         varchar(30)
             Password,         密碼,             varchar(30)
             Act_Permission,   帳號權限,         int(5)
             Emp_Name,         員工名稱,         varchar(15)
             Act_Setting,      帳號偏好設定,      text
             Act_AnotherData,  帳號雜項,         text
             Company (FK),     隸屬公司(Cmp_ID), varchar(15)
             Department (FK),  隸屬部門(Dpm_id), varchar(15)
     */
    req.db_con.query(filter, [acc, pwd], function (err, rows) {
      if (err) {
        console.log('#-- Error: ./routes/index.js: .post/req_ajax_check_acc_pwd: db.query: error.');
        console.log(err);
        return;
      }
      if (JSON.stringify(rows) == "[]") {
        // account or password incorrect.
        console.log('#-- Error: ./routes/index.js: .post/req_ajax_check_acc_pwd: db.query: data dismatch.');
        res.json(['success', 'data dismatch']);
      } else {
        console.log('# ./routes/index.js: .post/req_ajax_check_acc_pwd: db.query: login');
        res.json(['success', rows]);
        console.log(JSON.stringify(rows));
        // res.json(['success', 'Sever got a Ajax [' + type + '] request, acc = ' + acc + ', pwd = ' + pwd]);
        // res.render('profile', { title: 'Account Information', data: rows });
      }
    });
  }
  // -----
});

//----- /profile/check-ok -----
router.get('/profile/check-ok', function (req, res, next) {
  var acc = 'wikeyno@gmail.com';
  var pwd = 'okrroot';
  var filter = 'SELECT * FROM `employee` WHERE `Emp_Account` = ? AND `Password` = ?';
  req.db_con.query(filter, [acc, pwd], function (err, rows) {
    if (err) {
      console.log('#-- Error: ./routes/index.js: .get/profile/check-ok: db.query: error.');
      console.log(err);
      return;
    }
    if (JSON.stringify(rows) == "[]") {
      // account or password incorrect.
      res.redirect('/');
      // res.render('login', { title: "workdone" });
      console.log('#-- Error: ./routes/index.js: .get/profile/check-ok: db.query: data dismatch.');
    } else {
      console.log('# ./routes/index.js: .get/profile/check-ok: db.query: login');
      res.render('profile', { title: 'Account Information', data: rows });
    }
  });
});

//----- profile page -----
router.get('/profile', function (req, res, next) {

  var db = req.db_con;
  // - bulid database connection info
  var acc_input = "";
  var pwd_input = "";
  var filter = "";

  acc_input = req.query.account;
  pwd_input = req.query.password;

  if (acc_input != "" & pwd_input != "") {
    // query Emp_Account = ? Password = ?
    filter = 'SELECT * FROM `employee` WHERE `Emp_Account` = ? AND `Password` = ?';
    /* 
     table: employee
     column: Emp_Account (PK), 員工帳號,         varchar(30)
             Password,         密碼,             varchar(30)
             Act_Permission,   帳號權限,         int(5)
             Emp_Name,         員工名稱,         varchar(15)
             Act_Setting,      帳號偏好設定,      text
             Act_AnotherData,  帳號雜項,         text
             Company (FK),     隸屬公司(Cmp_ID), varchar(15)
             Department (FK),  隸屬部門(Dpm_id), varchar(15)
     */
    db.query(filter, [acc_input, pwd_input], function (err, rows) {
      if (err) {
        console.log('#-- Error: ./routes/index.js: .get/profile: db.query: error.');
        console.log(err);
        return;
      }
      // console.log(JSON.stringify(rows));
      if (JSON.stringify(rows) == "[]") {
        // account or password incorrect.
        res.redirect('/');
        // res.render('login', { title: "workdone" });
        console.log('#-- Error: ./routes/index.js: .get/profile: db.query: data dismatch.');
      } else {
        console.log('# ./routes/index.js: .get/profile: db.query: login');
        res.render('profile', { title: 'Account Information', data: rows });
      }
    });
  }
});

//----- Module export -----
module.exports = router;

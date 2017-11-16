var express = require('express');
var router = express.Router();

//----- login page -----
router.get('/', function (req, res, next) {
  res.render('login', { title: "workdone" });
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
        console.log('#-- Error: ./routes/index.js: db.query error.');
        console.log(err);
      }
      // console.log(JSON.stringify(rows));
      if (JSON.stringify(rows) == "[]") {
        // account or password incorrect.
        res.redirect('/');
        // res.render('login', { title: "workdone" });
        console.log('data dismatch.');
      } else {
        res.render('profile', { title: 'Account Information', data: rows });
      }
    });
  }
});

//----- Module export -----
module.exports = router;

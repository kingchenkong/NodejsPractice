var express = require('express');
var router = express.Router();

// - Original -
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// ----- home page (search page )
router.get('/', function (req, res, next) {

  var db = req.db_con; // 建立 var db 賦予 req.db_con 連線物件資訊
  var data = "";
  var user = "";
  var user = req.query.user;
  // console.log('req.query.user => ' + req.query.user);
  // console.log('req.query => ' + req.query);

  var filter = "";
  if (user) {
    filter = 'WHERE userid = ?';
    // table: account, column: userid, = ? is Method:GET parameter => req.query.user
    // ex: filter = 'WHERE password = ?';
    // will got password = req.query.user
  }

  // var test = "admin";

  db.query('SELECT * FROM account ' + filter, user, function (err, rows) {
    // - db.query( ) 為進行資料庫存取，返回結果為 err、rows
    // - 回傳資料 rows 以陣列格式儲存
    if (err) {
      console.log(err);
    }
    var data = rows;

    // console.log('filter = ' + filter);
    // console.log('user = ' + user);
    // console.log(JSON.stringify(rows));

    // use index.ejs
    res.render('index', { title: 'Account Information', data: data, user: user });
    // - 在 render 部分，我們將 rows 指定到 data 變數
    // - data: data，此為給予名稱 data，其內容為 data，將於 ejs 樣板部分使用
  });

});

// add page .GET
router.get('/add', function (req, res, next) {

  // use userAdd.ejs
  res.render('userAdd', { title: 'Add User', msg: '' });
});

// add page .POST
router.post('/userAdd', function (req, res, next) {

  var db = req.db_con;
  // check userid exist
  var userid = req.body.userid;
  // 先查詢是否重複
  var qur = db.query('SELECT userid FROM account WHERE userid = ?', userid, function (err, rows) {
    if (err) {
      console.log(err);
    }

    var count = rows.length;
    // rows.length > 0 => 表示有查詢到相符合的資料
    if (count > 0) {

      var msg_userexist = 'Userid already exists.';
      res.render('userAdd', { title: 'Add User', msg: msg_userexist });
      // use userAdd.ejs
    } else {

      var sql = {
        userid: req.body.userid,
        password: req.body.password,
        email: req.body.email
      };

      //console.log(sql);
      var qur = db.query('INSERT INTO account SET ?', sql, function (err, rows) {
        if (err) {
          console.log(err);
        }
        // -- ?
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/');
          // - 重新導向 to '/' : home page
      });
    }
  });


});

// edit page .GET
router.get('/userEdit', function (req, res, next) {
  
  var id = req.query.id;
  // get 'id' from index.ejs_btn-edit
  // console.log(id);
  var db = req.db_con;
  var data = "";

  // SELECT by 'id'
  db.query('SELECT * FROM account WHERE id = ?', id, function (err, rows) {
    if (err) {
      console.log(err);
    }

    // give data to /userEdit
    var data = rows;
    res.render('userEdit', { title: 'Edit Account', data: data });
  });

});

//edit page .POST
router.post('/userEdit', function (req, res, next) {

  var db = req.db_con;
  var id = req.body.id;
  var sql = {
    userid: req.body.userid,
    password: req.body.password,
    email: req.body.email
  };

  var qur = db.query('UPDATE account SET ? WHERE id = ?', [sql, id], function (err, rows) {
    if (err) {
      console.log(err);
    }

    res.setHeader('Content-Type', 'application/json');
    res.redirect('/');
    // - 重新導向 to '/' : home page
  });

});

// delete page
router.get('/userDelete', function (req, res, next) {

  var id = req.query.id;
  var db = req.db_con;
  var qur = db.query('DELETE FROM account WHERE id = ?', id, function (err, rows) {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  });
});

module.exports = router;

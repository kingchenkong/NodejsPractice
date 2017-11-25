var express = require('express');
var router = express.Router();

var models = require('../public/javascripts/models');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/jsonEx', function (req, res, next) {
  // res.status(311).json(models.myObj);
  res.render('json-exchange', { title: 'Json Exchange' });
})

router.post('/req_ajax', function (req, res, next) {
  /* req.body对象
     包含POST请求参数。
     这样命名是因为POST请求参数在REQUEST正文中传递，而不是像查询字符串在URL中传递。
     要使req.body可用，可使用中间件body-parser
  */
  var urlencodedParser = req.urlencodedParser;
  // request package
  var info = req.body.info;
  var type = req.body.type;
  var account = req.body.account;
  var password = req.body.password;
  // json package
  var jsonPackage = {
    req_status: 200,
    req_info: info,
    req_type: type,
    acc: account,
    pwd: password,
    acc_info: [{ color: 'black', height: 180 }],
    contact: [{ type: 'cell', val: '0912-345-678' }, { type: 'home', val: '01-2345678' }, { type: 'email', val: 'acc@mail.com' }]
  };

  console.log('服务器收到一个Ajax [' + type + '] 请求，信息为：' + info);
  console.log('status => ' + jsonPackage.req_status);
  console.log('acc => ' + account);
  console.log('pwd => ' + password);
  // res.json(['success', 'sever got a Ajax [' + type + '] request, message: ' + info]);
  res.json(jsonPackage);
});

module.exports = router;

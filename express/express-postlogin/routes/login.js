var express = require('express');
var router = express.Router();

router.post('/login', function(req, res, next) {
  res.render('login', { 
      title: 'Express',
      userid: req.body.userid,
      pwd: req.body.pwd
    });
});

module.exports = router;

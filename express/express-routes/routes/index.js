var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Express, Statement at ./routes/index.js' 
  });
});

module.exports = router;

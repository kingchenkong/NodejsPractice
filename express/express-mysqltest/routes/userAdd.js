var express = require('express');
var router = express.Router();

// add post
router.post('/userAdd', function(req, res, next) {
    
        var db = req.con;
    
        var sql = {
            userid: req.body.userid,
            password: req.body.password,
            email: req.body.email
        };
    
        //console.log(sql);
        var qur = db.query('INSERT INTO account SET ?', sql, function(err, rows) {
            if (err) {
                console.log(err);
            }
            res.setHeader('Content-Type', 'application/json');
            res.redirect('/');
        });
    
    });

module.exports = router;
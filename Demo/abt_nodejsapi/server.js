// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');

// DataBase
var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'phalcon',
    password: 'phalcon',
    database: 'phalcon'
});

con.connect(function(err) {
    if (err) {
        console.log('connecting error');
        return;
    }
    console.log('connecting success');
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// db state
app.use(function(req, res, next) {
    req.con = con;
    next();
});
var port = process.env.PORT || 5709; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.get('/albums', function(req, res, next) {
    var db = req.con;
    var data = '';

    db.query('SELECT * FROM album', function(err, rows) {
        if (err) {
            res.json({ message: err });
        } else {
            var data = rows;
            res.json({ message: data });
        }
    });
});

router.get('/album/:album_id', function(req, res, next) {
    var id = req.params.album_id;
    var db = req.con;
    var data = '';

    db.query('SELECT * FROM album WHERE id = ?', id, function(err, rows) {
        if (err) {
            res.json({ message: err + '[' + id + ']' });
        } else {
            var data = rows;
            res.json({ message: data });
        }
    });
});

router.post('/album', function(req, res, next) {
    var db = req.con;
    var sql = {
        title: req.body.title
    };

    //console.log(sql);
    var qur = db.query('INSERT INTO album SET ?', sql, function(err, rows) {
        if (err) {
            res.json({ message: err + '[' + id + ']' });
        } else {
            res.json({ message: 'Create success!' });
        }
    });
});

router.put('/album/:album_id', function(req, res, next) {
    var db = req.con;
    var id = req.params.album_id;

    var sql = {
        id: id,
        title: req.body.title
    };
    var qur = db.query('UPDATE album SET ? WHERE id = ?', [sql, id], function(err, rows) {
        if (err) {
            res.json({ message: err + '[' + id + ']' });
        } else {
            res.json({ message: 'UPDATE success!' });
        }
    });
});

router.delete('/album/:album_id', function(req, res) {
    var db = req.con;
    var id = req.params.album_id;

    var qur = db.query('DELETE FROM album WHERE id = ?', id, function(err, rows) {
        if (err) {
            res.json({ message: err + '[' + id + ']' });
        } else {
            res.json({ message: 'delete success!' });
        }
    });
});
// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

// ----- Module Require -----
var express = require('express');



// setting handlebar view engine
var handlebars = require('express-handlebars').create({ defaultLayout: 'main' });

var app = express();

app.engine('handlebars', handlebars.engine);
app.set("views", __dirname + "/views");
app.set('view engine', 'handlebars');
// app.engine("html", consolidate.handlebars);
// app.set("view engine", "html");


// set port
app.set('port', process.env.PORT || 3000);

// ----- routes -----
app.get('/', function (req, res) {
    // res.type('text/plain');
    // res.send('Meadowlark Travel');
    res.render('home');
});

app.get('/about', function (req, res) {
    // res.type('text/plain');
    // res.send('About Meadowlark Travel');
    res.render('about');
});



// ----- Error -----
// 404 - Not found
app.use(function (req, res, next) {
    // res.type('text/plain');
    res.status(404);
    // res.send('404 - Not Found');
    
    res.render('404');

});

// 500 - Server Error
app.use(function (err, req, res, next) {
    console.error(err.stack);
    // res.type('text/pllain');
    res.status(500);
    // res.send('500 - Server Error');
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl + c to terminate.');
});



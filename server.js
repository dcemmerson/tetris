/*************************************************************************************
Author: Dane Emmerson
Due Date: 10/23/2019
Description: 
************************************************************************************/

require('dotenv').config();
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
const url = require('url');

var session = require('express-session');
var mysql = require('./dbcon.js');
//var auth = require('./auth/auth');
//var bcrypt = require('bcrypt');
//const saltRounds = 10;
var AccessControl = require('express-ip-access-control')

let hbs = require('express-handlebars').create({
    defaultLayout: 'main',
    extname: 'hbs',
    layoutDir: `${__dirname}/views/layouts`,
    partialsDir: `${__dirname}/views/partials`
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({
    secret: process.env.SESSION_PASSWORD,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
	path: '/',
	secure: false,
	httpOnly: true,
	maxAge: 600 * 100000
    }
    
}));
app.use(AccessControl({
    mode: 'deny',
    denys: [],
    forceConnectionAddress: false,
    log: function(clientIp,access){
	console.log(clientIp + (access ? ' accessed.' : ' denied'));
	},
    statusCode: 401,
    redirectTo: 'www.duckduckgo.com',
    message: 'Unauthorized'
}));
require('./server/routes.js')(app);
require('./server/ajax_routes.js')(app,mysql);
app.use(express.static('public'));

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('port', 10001);

let cssFile;
app.get(`/css/${cssFile}`, function(req,res){
    res.send(`/css/${cssFile}`);
    res.end;
});
let jsFile;
app.get(`/js/${jsFile}`, function(req,res){
    res.send(`/js/${jsFile}`);
    res.end();
});
let imgFile;
app.get(`/img/${imgFile}`, function(req,res){
    res.send(`/img/${imgFile}`);
    res.end();
});




app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

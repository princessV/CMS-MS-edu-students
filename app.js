/**
 * Created by qiygu on 2016/11/16.
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./routes/index.js');
var user = require('./routes/user.js');


app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: 'I love you',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 600000
    }
}));
app.use('/static', express.static('public'));


app.use('/index', index);
app.use('/user', user);

app.listen(3000, function () {
    console.log('Server starts at port 3000...')
});
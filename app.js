/**
 * Created by qiygu on 2016/11/16.
 */
var express = require('express');
var app = express();

var index = require('./routes/index.js');
var login = require('./routes/login.js');


app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use('/static', express.static('public'));


app.use('/index', index);
app.use('/login', login);

app.listen(3000, function () {
    console.log('1')
});
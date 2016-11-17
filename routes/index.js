/**
 * Created by qiygu on 2016/11/16.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    var user = {
        name: 'Yezi',
        avatar: '/static/images/user2-160x160.jpg'
    };
    var data = {
        user: user,
        currentUrl: '/index'
    };
    res.render('index', data);
});

module.exports = router;
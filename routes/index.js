/**
 * Created by qiygu on 2016/11/16.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    var data = {
        title: 'TestFramework',
        message: 'Welcome!!'
    };
    res.render('index', data);
});

module.exports = router;
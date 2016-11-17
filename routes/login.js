/**
 * Created by puddingtea07 on 11/17/16.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    var data = {
        actionType: 'login'
    };
    res.render('login', data);
});

module.exports = router;
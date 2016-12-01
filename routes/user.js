/**
 * Created by puddingtea07 on 11/17/16.
 */
var express = require('express');
var router = express.Router();

var userDao = require('../dao/userDao');

router.get('/login', function (req, res, next) {
    var data = {
        actionType: 'login'
    };
    res.render('login', data);
});

router.post('/loginAction', function (req, res, next) {
    userDao.get(req.body.username, req.body.password, function (error, results) {
        if (error) {
            console.log(error);
            res.redirect('/user/login');
        } else if (results) {
            req.session.user = results[0];
            res.redirect('/index');
        } else {
            res.redirect('/user/login');
        }
    })
});

router.get('/logoutAction', function (req, res, next) {
   req.session.destroy(function () {
       res.redirect('/user/login')
   })
});

module.exports = router;
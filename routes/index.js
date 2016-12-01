/**
 * Created by qiygu on 2016/11/16.
 */
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    if (!req.session.user) {
        res.redirect('/user/login');
    } else {
        var user = req.session.user;
        var data = {
            user: user,
            currentUrl: '/index',
            content_title: 'Download',
            updateTime: '2016-11-09 20:00:00',
            student_name: 'test'
        };
        res.render('index', data);
    }

});

router.get('/callback', function (req, res, next) {
   if (!req.session.user) {
       res.redirect('/user/login');
   } else {
       var user = req.session.user;
       var contact_records = [{
           student_name: 'B李华',
           last_updated_time: '2016-11-30 20:00',
           last_content: 'test test content',
           stuid: 210000
       }];
       var data = {
           user: user,
           currentUrl: '/index/callback',
           content_title: 'Update callback records',
           contact_records: contact_records
       };
       res.render('callback', data);
   }
});

module.exports = router;
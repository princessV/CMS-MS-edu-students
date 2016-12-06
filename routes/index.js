/**
 * Created by qiygu on 2016/11/16.
 */
var express = require('express');
var router = express.Router();

var util = require('../util/studentsInfo');


router.get('/download', function (req, res, next) {
    if (!req.session.user) {
        res.redirect('/user/login');
    } else {
        var user = req.session.user;
        var data = {
            user: user,
            currentUrl: '/index/download',
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
       var rows = 10, page = 1;
       if (req.query.rows != null && req.query.page != null) {
           rows = req.query.rows;
           page = req.query.page;
       }
       util.getContactRecord(page, rows, function (error, contact_records) {
          if (!error) {
              var total_pages = Math.ceil(parseFloat(contact_records.total)/rows);
              var data = {
                  user: user,
                  currentUrl: '/index/callback',
                  content_title: 'Update callback records',
                  current_page: page,
                  rows: rows,
                  total_pages: total_pages,
                  contact_records: contact_records.rows
              };
              res.render('callback', data);
          } else {
              console.log(error);
              res.redirect('/user/login');
          }
       });
   }
});


module.exports = router;
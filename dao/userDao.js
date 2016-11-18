/**
 * Created by puddingtea07 on 11/17/16.
 */
var mysql = require('mysql');
var db_conf = require('../conf/db.js');
var pool = mysql.createPool(db_conf.mysql_test);

module.exports = {
    get: function (username, password, callback) {
        pool.getConnection(function (error, connection) {
            if (error) {
                callback(error, null);
            } else {
                var sql = 'SELECT * FROM user WHERE username="' + username + '" AND password="' + password + '"';
                connection.query(sql, function (err, results) {
                    connection.release();
                    callback(null, results);
                })
            }
        })
    }
};
/**
 * Created by puddingtea07 on 11/17/16.
 */
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('conf/properties.file');

module.exports = {
    mysql: {
        host: properties.get('db.host'),
        user: properties.get('db.user'),
        password: properties.get('db.password').toString(),
        database: properties.get('db.database'),
        port: properties.get('db.port').toString()
    },

    mysql_test: {
        host: properties.get('db_test.host'),
        user: properties.get('db_test.user'),
        password: properties.get('db_test.password').toString(),
        database: properties.get('db_test.database'),
        port: properties.get('db_test.port').toString()
    }
};
/**
 * Created by puddingtea07 on 12/1/16.
 */
var request = require('request');

var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('conf/properties.file');

var jsdom = require('jsdom').jsdom;
var doc = jsdom();
var window = doc.defaultView;
var $ = require('jquery')(window);

var async = require('async');


module.exports = {
    getBasic: function (lastStuId, callback) {
        var data = [];
        var options = {
            method: 'GET',
            url: properties.get('crawler.baseUrl') + '?page=1&rows=200',
            headers: {
                'Authorization': properties.get('crawler.auth')
            }
        };

        console.log('calling' + properties.get('crawler.baseUrl'));

        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var stuExists = false;
                var json_body = JSON.parse(body);


                json_body.rows.some(function (stu) {
                    console.log(stu.id);

                    if (stu.id == lastStuId) {
                        stuExists = true;
                        return true;
                    } else {
                        var lastContactRecords = '';
                        stu.lastContactRecords.forEach(function (contactRecord) {
                            lastContactRecords += (contactRecord.contactText + '\n' + '------' + '\n');
                        });
                        data.push({
                            name: stu.customer.name,
                            phone: '',
                            school: stu.currSchool,
                            major: stu.currentSpecialty,
                            degree_in_application: stu.planXl,
                            major_in_application: stu.hopeSpecialty,
                            country_in_application: stu.planCountry,
                            current_grade: stu.currGrade,
                            basic_infomation: '',
                            last_record: lastContactRecords,
                            channels: stu.stuFromName,
                            level: stu.stuLevelName,
                            stuid: stu.id,
                            createAt: stu.createdAt
                        });
                    }
                });

                if (!stuExists) {
                    callback('The database have not been updated for so long. Please contact the admin. ')
                } else {
                    console.log(data.length);
                }

            } else {
                callback('request error');
            }
        })
    },
    getContactRecord: function (page, row, callback) {
        var contact_records = {};
        var options = {
            method: 'GET',
            url: properties.get('crawler.baseUrl') + '?page=' + page + '&rows=' + row,
            headers: {
                'Authorization': properties.get('crawler.auth')
            }
        };
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var json_body = JSON.parse(body);
                contact_records.total = json_body.total;
                contact_records.rows = [];
                json_body.rows.forEach(function (stu) {
                    if (!$.isEmptyObject(stu.lastContactRecords)) {
                        var date = new Date(stu.lastContactRecords[0].createdAt);
                        contact_records.rows.push({
                            student_name: stu.customer.name,
                            last_updated_time: date.toLocaleString(),
                            last_content: stu.lastContactRecords[0].contactText,
                            stuid: stu.id
                        });
                    }
                });
                callback(null, contact_records);
            } else {
                callback(error, null);
            }
        })

    }
};
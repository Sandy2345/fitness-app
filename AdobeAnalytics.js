var getvalue = (callback) => {
    var OmnitureAPI = require('node-omniture-api')
    var omniture = new OmnitureAPI('payal.daryani@capgemini.com:Capgeminisandbox', 'e5eccca081d2a1a329ee56e41e451811');
    var pageViews;
    requestData = {
        "reportDescription": {
            "source": "realtime",
            "reportSuiteID": "geo1xxlon-we-can-mart",

            "metrics": "[{ id: 'pageviews' }]"

        }
    }
    console.log('inside value');
    omniture.queueAndFetchReport(requestData, function(success, data) {
        if (success) {

            pageViews = data.report.totals[0];
            console.log("sssssandceep");
            console.log(data.report.totals[0]);
            console.log("dgdggdgdgdgd");
            console.log(pageViews);
            callback(undefined, {
                body: 'chirag',
                page: data.report.totals[0]

            });

        } else {
            pageViews = data;
            console.error(data);
        }
    });


};

var getvalueyesterday = (callback) => {
    var OmnitureAPI = require('node-omniture-api')
    var omniture = new OmnitureAPI('payal.daryani@capgemini.com:Capgeminisandbox', 'e5eccca081d2a1a329ee56e41e451811');
    var pageViews;
    var dateFrom = new Date();
    var dateTo = new Date();
    dateFrom.setDate(dateFrom.getDate() - 1);
    requestData = {
        "reportDescription": {
            "reportSuiteID": "geo1xxlon-we-can-mart",
            "dateFrom": dateFrom.toISOString().slice(0, 10),
            "dateTo": dateTo.toISOString().slice(0, 10),
            "metrics": "[{ id: 'pageviews' }]"

        }
    }
    console.log('inside value');
    omniture.queueAndFetchReport(requestData, function(success, data) {
        if (success) {

            pageViews = data.report.totals[0];
            console.log("sssssandceep");
            console.log(data.report.totals[0]);
            console.log("dgdggdgdgdgd");
            console.log(pageViews);
            callback(undefined, {
                body: 'chirag',
                page: data.report.totals[0]

            });

        } else {
            pageViews = data;
            console.error(data);
        }
    });


};


var getvalueweek = (callback) => {
    var OmnitureAPI = require('node-omniture-api')
    var omniture = new OmnitureAPI('payal.daryani@capgemini.com:Capgeminisandbox', 'e5eccca081d2a1a329ee56e41e451811');
    var pageViews;
    var dateFrom = new Date();
    var dateTo = new Date();
    dateFrom.setDate(dateFrom.getDate() - dateFrom.getDay());
    requestData = {
        "reportDescription": {
            "reportSuiteID": "geo1xxlon-we-can-mart",
            "dateFrom": dateFrom.toISOString().slice(0, 10),
            "dateTo": dateTo.toISOString().slice(0, 10),
            "metrics": "[{ id: 'pageviews' }]"

        }
    }
    console.log('inside value');
    omniture.queueAndFetchReport(requestData, function(success, data) {
        if (success) {

            pageViews = data.report.totals[0];
            console.log("sssssandceep");
            console.log(data.report.totals[0]);
            console.log("dgdggdgdgdgd");
            console.log(pageViews);
            callback(undefined, {
                body: 'chirag',
                page: data.report.totals[0]

            });

        } else {
            pageViews = data;
            console.error(data);
        }
    });


};

var getvaluelastweek = (callback) => {
    var OmnitureAPI = require('node-omniture-api')
    var omniture = new OmnitureAPI('payal.daryani@capgemini.com:Capgeminisandbox', 'e5eccca081d2a1a329ee56e41e451811');
    var pageViews;
    var dateFrom = new Date();
    var dateTo = new Date();
    dateFrom.setDate(dateFrom.getDate() - 7);
    requestData = {
        "reportDescription": {
            "reportSuiteID": "geo1xxlon-we-can-mart",
            "dateFrom": dateFrom.toISOString().slice(0, 10),
            "dateTo": dateTo.toISOString().slice(0, 10),
            "metrics": "[{ id: 'pageviews' }]"

        }
    }
    console.log('inside value');
    omniture.queueAndFetchReport(requestData, function(success, data) {
        if (success) {

            pageViews = data.report.totals[0];
            console.log("sssssandceep");
            console.log(data.report.totals[0]);
            console.log("dgdggdgdgdgd");
            console.log(pageViews);
            callback(undefined, {
                body: 'chirag',
                page: data.report.totals[0]

            });

        } else {
            pageViews = data;
            console.error(data);
        }
    });


};

var getvaluemonth = (callback) => {
    var OmnitureAPI = require('node-omniture-api')
    var omniture = new OmnitureAPI('payal.daryani@capgemini.com:Capgeminisandbox', 'e5eccca081d2a1a329ee56e41e451811');
    var pageViews;
    var dateFrom = new Date();
    var dateTo = new Date();
    dateFrom.setDate(01);
    requestData = {
        "reportDescription": {
            "reportSuiteID": "geo1xxlon-we-can-mart",
            "dateFrom": dateFrom.toISOString().slice(0, 10),
            "dateTo": dateTo.toISOString().slice(0, 10),
            "metrics": "[{ id: 'pageviews' }]"

        }
    }
    console.log('inside value');
    omniture.queueAndFetchReport(requestData, function(success, data) {
        if (success) {

            pageViews = data.report.totals[0];
            console.log("sssssandceep");
            console.log(data.report.totals[0]);
            console.log("dgdggdgdgdgd");
            console.log(pageViews);
            callback(undefined, {
                body: 'chirag',
                page: data.report.totals[0]

            });

        } else {
            pageViews = data;
            console.error(data);
        }
    });


};
var getvaluelastmonth = (callback) => {
    var OmnitureAPI = require('node-omniture-api')
    var omniture = new OmnitureAPI('payal.daryani@capgemini.com:Capgeminisandbox', 'e5eccca081d2a1a329ee56e41e451811');
    var pageViews;
    var dateFrom = new Date();
    var dateTo = new Date();
    dateFrom.setMonth(dateFrom.getMonth() - 1);
    requestData = {
        "reportDescription": {
            "reportSuiteID": "geo1xxlon-we-can-mart",
            "dateFrom": dateFrom.toISOString().slice(0, 10),
            "dateTo": dateTo.toISOString().slice(0, 10),
            "metrics": "[{ id: 'pageviews' }]"

        }
    }
    console.log('inside value');
    omniture.queueAndFetchReport(requestData, function(success, data) {
        if (success) {

            pageViews = data.report.totals[0];
            console.log("sssssandceep");
            console.log(data.report.totals[0]);
            console.log("dgdggdgdgdgd");
            console.log(pageViews);
            callback(undefined, {
                body: 'chirag',
                page: data.report.totals[0]

            });

        } else {
            pageViews = data;
            console.error(data);
        }
    });


};


var getvalueyear = (callback) => {
    var OmnitureAPI = require('node-omniture-api')
    var omniture = new OmnitureAPI('payal.daryani@capgemini.com:Capgeminisandbox', 'e5eccca081d2a1a329ee56e41e451811');
    var pageViews;
    var dateFrom = new Date();
    var dateTo = new Date();
    dateFrom.setMonth(0);
    dateFrom.setDate(01);
    requestData = {
        "reportDescription": {
            "reportSuiteID": "geo1xxlon-we-can-mart",
            "dateFrom": dateFrom.toISOString().slice(0, 10),
            "dateTo": dateTo.toISOString().slice(0, 10),
            "metrics": "[{ id: 'pageviews' }]"

        }
    }
    console.log('inside value');
    omniture.queueAndFetchReport(requestData, function(success, data) {
        if (success) {

            pageViews = data.report.totals[0];
            console.log("sssssandceep");
            console.log(data.report.totals[0]);
            console.log("dgdggdgdgdgd");
            console.log(pageViews);
            callback(undefined, {
                body: 'chirag',
                page: data.report.totals[0]

            });

        } else {
            pageViews = data;
            console.error(data);
        }
    });


};


var getvaluelastyear = (callback) => {
    var OmnitureAPI = require('node-omniture-api')
    var omniture = new OmnitureAPI('payal.daryani@capgemini.com:Capgeminisandbox', 'e5eccca081d2a1a329ee56e41e451811');
    var pageViews;
    var dateFrom = new Date();
    var dateTo = new Date();
    dateFrom.setYear(dateFrom.getFullYear() - 1);
    requestData = {
        "reportDescription": {
            "reportSuiteID": "geo1xxlon-we-can-mart",
            "dateFrom": dateFrom.toISOString().slice(0, 10),
            "dateTo": dateTo.toISOString().slice(0, 10),
            "metrics": "[{ id: 'pageviews' }]"

        }
    }
    console.log('inside value');
    omniture.queueAndFetchReport(requestData, function(success, data) {
        if (success) {

            pageViews = data.report.totals[0];
            console.log("sssssandceep");
            console.log(data.report.totals[0]);
            console.log("dgdggdgdgdgd");
            console.log(pageViews);
            callback(undefined, {
                body: 'chirag',
                page: data.report.totals[0]

            });

        } else {
            pageViews = data;
            console.error(data);
        }
    });


};

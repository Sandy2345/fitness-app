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
            console.log(data.report.totals[0]);
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
module.exports = {
    getvalue
};

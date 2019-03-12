const request= require('request');
var base64 = require('base-64');
var utf8 = require('utf8');
var contacturl = '';
var getAuthTokenService =(callback) =>{
  console.log('Auth magento token API hit');
  //var bytes = utf8.encode(username+":"+password);
  //var newBearer = base64.encode(bytes);
  //var bearer= "Basic " +newBearer;
  //console.log(bearer);
 // console.log('sandeep:',bytes)
  request({
    url: 'https://34.242.42.128/rest/default/V1/integration/admin/token' ,
    body: {
     "username": "Admin",
      "password": "Admin@123"
    },
    method: 'POST',
    rejectUnauthorized: false,
    headers: {
       // "Authorization": bearer,
        "Content-Type": "application/json"
      },
    json: true
  }, (error, response, body) => {

    if(error){
      callback('There was an error connecting to the server');
    }
    else if(response.statusCode == 400){
      callback('Unable to get the token');
    }
    else if(response.statusCode == 200){
      console.log('getAuthTokenService API hit:', response.statusCode)
      callback(undefined, {
	  code:body
         });
      }
  });
};
var createorder = (authToken, callback) =>{
	console.log(authToken);
//var count = Object.keys(body).length;
console.log('Create order api');
console.log(authToken);
  request({
    url: `https://34.242.42.128/rest/V1/Custorder/products/1` ,
    method: 'GET',
    headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${authToken}`
      },
    rejectUnauthorized: false,
    json: true
  }, (error, response, body) => {

    if(error){
      callback('There was an error connecting to the server');
    }
    else if(response.statusCode == 400){
      console.log('Cart already present');
    }
    else if(response.statusCode == 200){ 
      console.log('createorderService API hit:',response.statusCode)
     var str1 = "You have" +" " + body[0].total_item_count +" " +  "orders in your order list, and the details are . ";
      var str2 = "";
      var str3 = "Is there anything else that I can help you with?."
      body.forEach(function(element) {
	  str2 = str2 + element.name + "it will be delivered at your shipping address in" + element.delivery_days + "days. ";
      });
     var s= str1+str2+str3;
     console.log(s)
     callback(undefined, {
	      ordernumber: s
	    //console.log(s) 
        });
      }
    });

};

var dynamicAuthToken = (callback) => {
//configuration details
//mostly extracted from Azure 
//--> app registered as native application in Azure AD
const https = require('https');
var crmorg = 'https://adc-cg-poc.crm4.dynamics.com';
var username = 'Adobe2@capgeminidcxdemo.onmicrosoft.com';
var userpassword = 'Adccrm@123';
var authhost = 'login.microsoftonline.com';
var authpath = 'https://login.microsoftonline.com/392474b0-b713-4e33-93f8-8be0836e11e3/oauth2/token';
var clientid = '5ffe4a99-49d6-47a5-857a-1df7ce25f92a';

//token request parameters
var postData = 'client_id=' + clientid;
postData += '&resource=' + encodeURIComponent(crmorg);
postData += '&username=' + encodeURIComponent(username);
postData += '&password=' + encodeURIComponent(userpassword);
postData += '&grant_type=password';

//set the token request parameters
var options = {
    host: authhost,
    path: authpath,
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
    }
};

//make the token request
var request = https.request(options, (response) => {
    let data = '';

    //  A chunk of data has been recieved
    response.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been recieved
    response.on('end', () => {
	    //console.log(data);
         var tokenresponse = JSON.parse(data);
	    console.log("check data value");
	    console.log(data);
         var access_token = tokenresponse.access_token;
       // console.log('testing token priya : ' + access_token);
	callback(undefined, {
		code:access_token
	});
    });
});

request.on('error', (e) => {
    console.error(e);
});

request.write(postData);
request.end();

};

var getdynamic = (authToken, callback) =>{
console.log('Create dynamic api');
  request({
    url: 'https://adc-cg-poc.api.crm4.dynamics.com/api/data/v9.1/contacts?$select=lastname,cg_isprimary,cg_primarycontactsemail,cg_customertoken,cg_interests&$filter=emailaddress1%20eq%20%27verma@gmail.com%27',
    method: 'GET',
    timeout: 40000,
    headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${authToken}`
      },
    rejectUnauthorized: false,
    json: true
  }, (error, response, body) => {

    if(error){
      callback('There was an error connecting to the server');
    }
    else if(response.statusCode == 400){
      console.log('400 in dynamic api');
    }
    else if(response.statusCode == 200){ 
	 
        callback(undefined, {
		//body: Parseresponse
		  name : body.value[0].contactid,
		  body : body
		
        });
      }
    });

};

var getdynamic = (authToken, callback) =>{
console.log('Create dynamic api');
  request({
    url: 'https://adc-cg-poc.api.crm4.dynamics.com/api/data/v9.1/contacts?$select=lastname,cg_isprimary,cg_primarycontactsemail,cg_customertoken,cg_interests&$filter=emailaddress1%20eq%20%27verma@gmail.com%27',
    method: 'GET',
    timeout: 40000,
    headers: {
        "content-type": "application/json",
        "authorization": `Bearer ${authToken}`
      },
    rejectUnauthorized: false,
    json: true
  }, (error, response, body) => {

    if(error){
      callback('There was an error connecting to the server');
    }
    else if(response.statusCode == 400){
      console.log('400 in dynamic api');
    }
    else if(response.statusCode == 200){ 
	 
        callback(undefined, {
		//body: Parseresponse
		  name : body.value[0].contactid,
		  body : body
		
        });
      }
    });

};

var getvalue = (callback) =>{
var OmnitureAPI = require('node-omniture-api')
var omniture = new OmnitureAPI('payal.daryani@capgemini.com:Capgeminisandbox', 'e5eccca081d2a1a329ee56e41e451811');
var pageViews;
	requestData = {
		"reportDescription": {
		"source": "realtime",
		"reportSuiteID": "geo1xxlon-we-retail-demo",

		"metrics": "[{ id: 'pageviews' }]"

		}
	}
console.log('inside value');	
omniture.queueAndFetchReport(requestData, function (success, data) {
		if (success) {

			pageViews = data.report.totals[0];
			console.log("sssssandceep");
			console.log(data.report.totals[0]);
			console.log("dgdggdgdgdgd");
			console.log(pageViews);
			callback(undefined, {
                       body: 'chirag',
	               page : data.report.totals[0]
		
        }); 
			
		} else {
			pageViews = data;
			console.error(data);
		}
	});
  

};

var getvalueyesterday = (callback) =>{
var OmnitureAPI = require('node-omniture-api')
var omniture = new OmnitureAPI('payal.daryani@capgemini.com:Capgeminisandbox', 'e5eccca081d2a1a329ee56e41e451811');
var pageViews;
var dateFrom = new Date();
var dateTo = new Date();
	dateFrom.setDate(dateFrom.getDate() - 1);
	requestData = {
		"reportDescription": {
		"reportSuiteID": "geo1xxlon-we-retail-demo",
                "dateFrom": dateFrom.toISOString().slice(0, 10),
		"dateTo": dateTo.toISOString().slice(0, 10),
		"metrics": "[{ id: 'pageviews' }]"

		}
	}
console.log('inside value');	
omniture.queueAndFetchReport(requestData, function (success, data) {
		if (success) {

			pageViews = data.report.totals[0];
			console.log("sssssandceep");
			console.log(data.report.totals[0]);
			console.log("dgdggdgdgdgd");
			console.log(pageViews);
			callback(undefined, {
                       body: 'chirag',
	               page : data.report.totals[0]
		
        }); 
			
		} else {
			pageViews = data;
			console.error(data);
		}
	});
  

};


var getvalueweek = (callback) =>{
var OmnitureAPI = require('node-omniture-api')
var omniture = new OmnitureAPI('payal.daryani@capgemini.com:Capgeminisandbox', 'e5eccca081d2a1a329ee56e41e451811');
var pageViews;
var dateFrom = new Date();
var dateTo = new Date();
	dateFrom.setDate(dateFrom.getDate() - dateFrom.getDay());
	requestData = {
		"reportDescription": {
		"reportSuiteID": "geo1xxlon-we-retail-demo",
                "dateFrom": dateFrom.toISOString().slice(0, 10),
		"dateTo": dateTo.toISOString().slice(0, 10),
		"metrics": "[{ id: 'pageviews' }]"

		}
	}
console.log('inside value');	
omniture.queueAndFetchReport(requestData, function (success, data) {
		if (success) {

			pageViews = data.report.totals[0];
			console.log("sssssandceep");
			console.log(data.report.totals[0]);
			console.log("dgdggdgdgdgd");
			console.log(pageViews);
			callback(undefined, {
                       body: 'chirag',
	               page : data.report.totals[0]
		
        }); 
			
		} else {
			pageViews = data;
			console.error(data);
		}
	});
  

};

var getvaluelastweek = (callback) =>{
var OmnitureAPI = require('node-omniture-api')
var omniture = new OmnitureAPI('payal.daryani@capgemini.com:Capgeminisandbox', 'e5eccca081d2a1a329ee56e41e451811');
var pageViews;
var dateFrom = new Date();
var dateTo = new Date();
	dateFrom.setDate(dateFrom.getDate() - 7);
	requestData = {
		"reportDescription": {
		"reportSuiteID": "geo1xxlon-we-retail-demo",
                "dateFrom": dateFrom.toISOString().slice(0, 10),
		"dateTo": dateTo.toISOString().slice(0, 10),
		"metrics": "[{ id: 'pageviews' }]"

		}
	}
console.log('inside value');	
omniture.queueAndFetchReport(requestData, function (success, data) {
		if (success) {

			pageViews = data.report.totals[0];
			console.log("sssssandceep");
			console.log(data.report.totals[0]);
			console.log("dgdggdgdgdgd");
			console.log(pageViews);
			callback(undefined, {
                       body: 'chirag',
	               page : data.report.totals[0]
		
        }); 
			
		} else {
			pageViews = data;
			console.error(data);
		}
	});
  

};

var getvaluemonth = (callback) =>{
var OmnitureAPI = require('node-omniture-api')
var omniture = new OmnitureAPI('payal.daryani@capgemini.com:Capgeminisandbox', 'e5eccca081d2a1a329ee56e41e451811');
var pageViews;
var dateFrom = new Date();
var dateTo = new Date();
	dateFrom.setDate(01);
	requestData = {
		"reportDescription": {
		"reportSuiteID": "geo1xxlon-we-retail-demo",
                "dateFrom": dateFrom.toISOString().slice(0, 10),
		"dateTo": dateTo.toISOString().slice(0, 10),
		"metrics": "[{ id: 'pageviews' }]"

		}
	}
console.log('inside value');	
omniture.queueAndFetchReport(requestData, function (success, data) {
		if (success) {

			pageViews = data.report.totals[0];
			console.log("sssssandceep");
			console.log(data.report.totals[0]);
			console.log("dgdggdgdgdgd");
			console.log(pageViews);
			callback(undefined, {
                       body: 'chirag',
	               page : data.report.totals[0]
		
        }); 
			
		} else {
			pageViews = data;
			console.error(data);
		}
	});
  

};






var updateDynamic = (authToken,contactid, callback) => {

        console.log('Update payment API hit');
	console.log(contactid);
	console.log(authToken);
	contacturl = 'https://adc-cg-poc.api.crm4.dynamics.com/api/data/v9.1/contacts(' + contactid + ')';
        console.log(contacturl);
        request({
          url: contacturl,
          method: 'PATCH',
          headers: {
           "Content-Type": "application/json",
           "Authorization": `Bearer ${authToken}`
          },
          body: {
                  "cg_interests" : "Ereaders", 
                  "cg_sendproemailforereader" : "Yes", 
                   "cg_sendproemailforclothing" : "No"  
          },
          rejectUnauthorized: false,
          json: true
          }, (error, response, body) => {
		console.log("response code of patch",response.statusCode);
          if(error){
            callback('There was an error connecting to the server');
          }
          else if(response.statusCode == 400){
            callback('Unable to get recommended products');
          }
          else if(response.statusCode == 200){
            console.log("Update Payment Service API hit:", response.statusCode);
            }
          else {
            console.log(response.statusCode);
		 console.log('testing');  
          }
         });
};



var AdobeAuthToken = (callback) => {
//configuration details
//mostly extracted from Azure 
//--> app registered as web application in Azure A
const https = require('https');
var authhost = 'https://ims-na1.adobelogin.com/ims/authorize/v1';
var authpath = 'https://ims-na1.adobelogin.com/ims/token/v1';
var clientid = 'ed54094318a645198c83cb02efa14834';
var client_secret = 'bb06ab68-9951-4d94-bf04-b6db7c580424';

//token request parameters
var postData = 'client_id=' + clientid;
//postData += '&resource=' + encodeURIComponent(crmorg);
postData += '&client_secret=' + encodeURIComponent(client_secret);
postData += '&grant_type=client_credentials';

//set the token request parameters
var options = {
    host: authhost,
    path: authpath,
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
    }
};

//make the token request
var request = https.request(options, (response) => {
    let data = '';

    //  A chunk of data has been recieved
    response.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been recieved
    response.on('end', () => {
        var tokenresponse = JSON.parse(data);
        var access_token = tokenresponse.access_token;
	    console.log('Sandeep');  
        console.log('Token: ' + access_token);
    });
});

request.on('error', (e) => {
    console.error(e);
});

request.write(postData);
request.end();

};


function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
module.exports = {
    getAuthTokenService,
    createorder,
    dynamicAuthToken,
    getdynamic,
    updateDynamic,
    AdobeAuthToken,
    getvalue,
   getvalueyesterday,
   getvalueweek,
   getvaluelastweek,
   getvaluemonth
};

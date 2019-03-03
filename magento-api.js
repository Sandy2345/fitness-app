const request= require('request');
var base64 = require('base-64');
var utf8 = require('utf8');
const https = require('https');

var getAuthTokenService = (username, password, callback) =>{

  console.log('Auth magento token API hit');
  var bytes = utf8.encode(username+":"+password);
  var newBearer = base64.encode(bytes);
  var bearer= "Basic " +newBearer;
  console.log(bearer);
  console.log('sandeep:',bytes)
  request({
    url: 'https://34.242.42.128/rest/default/V1/integration/admin/token' ,
    body: {
     "username": "Admin",
      "password": "Admin@123"
    },
    method: 'POST',
    rejectUnauthorized: false,
    headers: {
        "Authorization": bearer,
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
     // var value=response.headers['authorization'];
      callback(undefined, {
	  code:body
        //token: value.substr(7,value.length),
        //customer_id: body.customer_id,
        //email: body.email,
        //first_name: body.first_name,
        //last_name: body.last_name
        });
      }
  });
};

var createorder = (authToken, callback) => {
//var count = Object.keys(body).length;
console.log('Create order api');
  request({
    url: `https://34.242.42.128/rest/default/V1/orders/1`,
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
      console.log('Cart already present');
      //console.log(body.base_currency_code);
      callback(undefined, {
       // basketId: body.fault.arguments.basketIds
        });
    }
    else if(response.statusCode == 200){
      	  //var jsonData = JSON.parse(body);
	  //var namelengh = jsonData.items.length;   
      console.log('createorderService API hit:',body.items[1].item_id)
      callback(undefined, {
	      orderNumber :body.items[1].item_id,
	      name: body.items[0].name,
	      name1:body.items[1].name
        });
      }
    });

};

var dynamicAuthToken = (authToken, callback) => {
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
	    console.log('sandeeeeeeeeeeeepppppppp');
	    console.log(data);
	    console.log('priyaaaaaaaaaaaaaaaaa');
        var tokenresponse = JSON.parse(data);
        var access_token = tokenresponse.access_token;
        console.log('testing token priya : ' + access_token);
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
    getupdatedweather,
    createorder,
    dynamicAuthToken,
    updatePageViews
    
};

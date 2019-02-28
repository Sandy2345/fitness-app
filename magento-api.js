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

var getupdatedweather = (city,applicationid, callback) => {

        console.log('Update payment API hit');
        
        request({
          url: `https://samples.openweathermap.org/data/2.5/weather?q=London&appid=c263e59bb171900b2d224854a55d06cf`,
          method: 'GET',
		  headers: {
				"content-type": "application/json",
			},
          rejectUnauthorized: false,
          json: true
          }, (error, response, body) => {

          if(error){
            callback('There was an error connecting to the server');
          }
          else if(response.statusCode == 400){
            callback('Unable to get recommended products');
          }
          else if(response.statusCode == 200){
           // console.log("sandeep.... check weather :",body.items[22].name);
            callback(undefined, {
              code: 'Bbangalore weather is good'
              });
            }
          else {
            console.log(response.statusCode);
          }
         });
};




var getAuth2Token = (authToken, callback) => {
/configuration details
//mostly extracted from Azure 
//--> app registered as web application in Azure AD
var crmorg = 'https://adc-cg-poc.crm4.dynamics.com';
var authhost = 'login.microsoftonline.com';
var authpath = 'https://login.microsoftonline.com/organizations/oauth2/v2.0/token';
var clientid = '2a030831-e8d7-4090-9696-e8a335e85ef0';
var client_secret = 'ACXa69WrS3@iZn_yW=6=6W[ruaIgMQvHK22X4vMFKRY';

//token request parameters
var postData = 'client_id=' + clientid;
postData += '&resource=' + encodeURIComponent(crmorg);
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
    getupdatedweather,
    createorder,
   getAuth2Token 
};

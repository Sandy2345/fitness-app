const request= require('request');
var base64 = require('base-64');
var utf8 = require('utf8');

var getAuthTokenService = (callback) =>{

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
        //"Authorization": bearer,
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
//var count = Object.keys(body).length;
console.log('Create order api');
  request({
    url: `https://34.242.42.128/rest/default/V1/orders/1`,
    method: 'GET',
    timeout: 90000,
    headers: {
        "content-type": "application/json",
        "authorization": `${authToken}`
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

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

module.exports = {
    getAuthTokenService,
    createorder
    
};

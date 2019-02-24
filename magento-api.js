const request= require('request');
var base64 = require('base-64');
var utf8 = require('utf8');

var getAuthTokenService = (username, password, callback) =>{

  console.log('Auth magento token API hit');
  var bytes = utf8.encode(Admin+":"+Admin@123);
  var newBearer = base64.encode(bytes);
  var bearer= "Basic " +newBearer;
  console.log(bearer);
  console.log('sandeep:',bytes)
  request({
    url: 'https://capgemini01-alliance-prtnr-eu06-dw.demandware.net/s/CapCafe/dw/shop/v18_3/customers/auth?client_id=e4bd2b6d-1567-475d-9eb2-b2c86a37a560' ,
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
           // console.log("sandeep.... check weather :",body.weather.description);
            callback(undefined, {
              code: 'Bbangalore weather is good'
              });
            }
          else {
            console.log(response.statusCode);
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
    getupdatedweather
};

const request= require('request');

var getGpsFromZipService = (zipcode, callback) =>{
  console.log(zipcode);
  console.log('getGpsFromZip API hit');
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${zipcode}&key=AIzaSyBvrztXIMHaa-fWqtaXrpvyQ66nEH6ulzo`,
    method: 'GET',
    rejectUnauthorized: false,
    json: true
    }, (error, response, body) => {
    if(error){
      callback('There was an error connecting to the server');
    }
    else if(response.statusCode == 401){
      callback('Unable to get the result');
    }
    else if(response.statusCode == 200){
      console.log('get coordinates API hit:', response.statusCode);
      callback (undefined, {
        sLat : body.results[0].geometry.location.lat,
        sLng : body.results[0].geometry.location.lng
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
    getGpsFromZipService,
    getAuthTokenService,
    getDeviceTokenService,
    sendPushNotificationService
};

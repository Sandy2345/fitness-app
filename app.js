'use strict';

const apiai = require('apiai');
const config = require('./config');
const express = require('express');
const xml2js = require('xml2js');
const bodyParser = require('body-parser');
const sfcc = require('./sfcc-apis.js');
const magento = require('./magento-api.js');
const sfmc = require('./sfmc.js');
const mailer = require('./mailer.js');
const nodemailer = require('nodemailer');
const jwtdecode = require('jwt-decode');
const {
    dialogflow,
    Permission
} = require('actions-on-google');
const aiapp = dialogflow();
const app = express();
var recommendedName;
var fullname = '';
var lastname;
var token = '';
var text = '';
var cardId;
var basketId;
var contactid;
var payment_id;
var customer_id;
var emailId;
var orderTotal;
var customerName;
var custLastName;
var customer_address_id;
var orderCode;
var messageData = '';
var messageId;
var deviceAccessToken;
var deviceIdJ = "0B7D939DB169CF65545F29D36EBD1128E23D654B913D42057D5757A4FB755E29";
var deviceIdG = "8AD82A24FE971D3FF2E94D3BF85747E2A4DC778425045E159F88DBD71E7B27C3"; //"FDEE03619CD12091CFE6994EBFF32FB73506283F41D3F330D2AAD8896899F5A7";
var deviceIdP = "79523913A0749F3ABDB658FE9254111BCF96067DAD37E232F0CF72E27832A833";
var email; //= 'mickeyd.mcd321@gmail.com';
var password; //= 'mickeyd.mcd321@gmail.com';
debugger;


if (!config.API_AI_CLIENT_ACCESS_TOKEN) {
    throw new Error('missing API_AI_CLIENT_ACCESS_TOKEN');
}
if (!config.SERVER_URL) { //used for ink to static files
    throw new Error('missing SERVER_URL');
}


app.set('port', (process.env.PORT || 4988))

//serve static files in the public directory
app.use(express.static('public'));

// Process application/json
app.use(bodyParser.json());

const apiAiService = apiai(config.API_AI_CLIENT_ACCESS_TOKEN, {
    language: "en",
});

const sessionIds = new Map();

// Index route
app.get('/', function(req, res) {
    res.send('Hello world, I am a chat bot')
})

function pushNotification(deviceID, messageId) {
    sfmc.getDeviceTokenService(deviceAccessToken, deviceID, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            console.log("Device token :" + result.device_token);
            sfmc.sendPushNotificationService(deviceAccessToken, result.device_token, messageId, (error, finalResult) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(finalResult);
                }
            });
        }
    });
};


function notify(emailId, messageId) {

    console.log("In notify-  " + emailId);
    if (emailId == 'gwengraman12@gmail.com') {
        console.log("Gwen User");
        setTimeout(() => pushNotification(deviceIdG, messageId), 3000);

    } else if (emailId == 'josselain12@gmail.com') {
        console.log("Josselain User");
        setTimeout(() => pushNotification(deviceIdJ, messageId), 3000);

    } else if (emailId == 'pratikb365@gmail.com') {
        console.log("Pratik User");
        setTimeout(() => pushNotification(deviceIdP, messageId), 3000);

    } else {
        console.log("Different User");
    }
};

//mailer.sendMailService("pratikb365@gmail.com", "Pratik");

app.post('/webhook/', (req, res) => {

    //console.log(access_token);
    // 	function sendMessage(text) {
    // 		messageData = {
    // 				speech: text,
    // 				displayText: text
    // 				}
    // 		res.send(messageData);	
    // 	};
    console.log('checking data');
    console.log(JSON.stringify(req.body));
    console.log('ytrytyttytyt');
    console.log(req.body.sessionId);
     console.log(data);
    console.log(parameters);
    console.log(message);
    
    var data = req.body;
    var sessionId = req.body.sessionId;
    var actionName = req.body.result.action;
    var parameters = req.body.result.parameters;
    var message = req.body.result.resolvedQuery;
    switch (actionName) {

        case 'check_sign_in':
            {
                console.log('In check_sign_in');
                if (isDefined(actionName)) {
                    messageData = {
                        "data": {
                            "google": {
                                "expectUserResponse": true,
                                "systemIntent": {
                                    "intent": "actions.intent.SIGN_IN",
                                    "data": {}
                                }
                            }
                        }
                    }
                    res.send(messageData);
                }
            }
            break;

            // 		     case 'order_status': {
            // 					console.log("In order tokennnnn");
            // 					if(isDefined(actionName)){
            // 						magento.getAuthTokenService((error, result)=> {
            // 							if(error){
            // 								console.log(error);
            // 							} else {
            // 								console.log('Code----> ',result.code);
            // 								magento.createorder(result.code, (error, cartResult)=> {
            // 									if(error){
            // 										console.log(error);
            // 									} else {
            // 										console.log('Order Number----> ',cartResult.ordernumber);
            // 										//console.log(messageData);

            // 								 	      }
            // 									});
            // 								 text="I am sending you the options, please check on your app.";
            // 								messageData = {
            // 										speech: text,
            // 										displayText: text
            // 										}
            // 								res.send(messageData);
            // 							     	}
            // 						   	});
            //  						}
            // 					}
            // 		 			break;


        case 'order_status':
            {
                console.log('In case order_status');
                magento.createorder(token, (error, cartResult) => {
                    if (error) {
                        console.log(error);
                    } else {
                        //console.log(JSON.stringify(req.body));
                        // var token=req.body.originalRequest.data.user.idToken;
                        // console.log(token);
                        //console.log(JSON.stringify(decoded));
                        //console.log(decoded);

                        orderCode = cartResult.ordernumber
                        text = orderCode;
                        messageData = {
                            speech: text,
                            displayText: text
                        }

                        res.send(messageData);
                    }
                });
            }
            break;


        case 'input.welcome':
            {
                console.log('In case Tokeneeee');
                magento.getAuthTokenService((error, result) => {
                    if (error) {
                        console.log(error);
                    } else {
                        token = result.code
                        text = "Greetings! I am Marty.How can I assist?";
                        messageData = {
                            speech: text,
                            displayText: text
                        }

                        res.send(messageData);
                    }
                });
            }
            break;


        case 'tokent':
            {
                console.log('In case Tokeneeee');
                //console.log('Code--->',token);
                magento.AdobeAuthToken((error, cartResult) => {
                    if (error) {
                        console.log(error);
                    } else {
                        //token = result.code
                        //console.log('Code--->',token);
                        console.log('mandeep');
                        text = "I am sending you the options, please check on your app.";
                        messageData = {
                            speech: 'sandeep',
                            displayText: 'sandeep'
                        }

                        res.send(messageData);
                    }
                });
            }
            break;


        case 'serviceCloud':
            {
                magento.getvalue((error, cartResult) => {
                    console.log('In serviceCloud');
                    if (isDefined(actionName)) {
                        console.log('today');
                        console.log(cartResult.body)
                        console.log(cartResult.page)
                        text = "The total number of page views today is " + cartResult.page;
                        messageData = {
                            speech: text,
                            displayText: text
                        }
                        res.send(messageData);
                        //mailer.sendMailService(emailId, customerName);
                    }
                });
            }
            break;
            
            case 'yesterday':
            {
                magento.getvalueyesterday((error, cartResult) => {
                    console.log('yesterday');
                    if (isDefined(actionName)) {
                        console.log('yesterday');
                        console.log(cartResult.body)
                        console.log(cartResult.page)
                        text = "The total number of page views yesterday is  " + cartResult.page;
                        messageData = {
                            speech: text,
                            displayText: text
                        }
                        res.send(messageData);
                        //mailer.sendMailService(emailId, customerName);
                    }
                });
            }
            break;
            case 'week':
            {
                magento.getvalueweek((error, cartResult) => {
                    console.log('week');
                    if (isDefined(actionName)) {
                        console.log('yesterday');
                        console.log(cartResult.body)
                        console.log(cartResult.page)
                        text = "The total number of page views in this week is  " + cartResult.page;
                        messageData = {
                            speech: text,
                            displayText: text
                        }
                        res.send(messageData);
                        //mailer.sendMailService(emailId, customerName);
                    }
                });
            }
            break;
             case 'lastweek':
            {
                magento.getvaluelastweek((error, cartResult) => {
                    console.log('lastweek');
                    if (isDefined(actionName)) {
                        console.log('lastweek');
                        console.log(cartResult.body)
                        console.log(cartResult.page)
                        text = "The total number of page views in Last week is  " + cartResult.page;
                        messageData = {
                            speech: text,
                            displayText: text
                        }
                        res.send(messageData);
                        //mailer.sendMailService(emailId, customerName);
                    }
                });
            }
            break;
            case 'month':
            {
                magento.getvaluemonth((error, cartResult) => {
                    console.log('monthh');
                    if (isDefined(actionName)) {
                        console.log('month');
                        console.log(cartResult.body)
                        console.log(cartResult.page)
                        text = "The total number of page views in this month is  " + cartResult.page;
                        messageData = {
                            speech: text,
                            displayText: text
                        }
                        res.send(messageData);
                        //mailer.sendMailService(emailId, customerName);
                    }
                });
            }
            break;
            
           case 'viewslast':
            {
                magento.getvaluelastmonth((error, cartResult) => {
                    console.log('last month');
                    if (isDefined(actionName)) {
                        console.log('yesterday');
                        console.log(cartResult.body)
                        console.log(cartResult.page)
                        text = "The total number of page views in Last month is  " + cartResult.page;
                        messageData = {
                            speech: text,
                            displayText: text
                        }
                        res.send(messageData);
                        //mailer.sendMailService(emailId, customerName);
                    }
                });
            }
            break;
			case 'year':
            {
                magento.getvalueyear((error, cartResult) => {
                    console.log('last month');
                    if (isDefined(actionName)) {
                        console.log('yesterday');
                        console.log(cartResult.body)
                        console.log(cartResult.page)
                        text = "The total number of page views in this year is  " + cartResult.page;
                        messageData = {
                            speech: text,
                            displayText: text
                        }
                        res.send(messageData);
                        //mailer.sendMailService(emailId, customerName);
                    }
                });
            }
            break; 
			case 'previousyear':
            {
                magento.getvalueyear((error, cartResult) => {
                    console.log('last month');
                    if (isDefined(actionName)) {
                        console.log('yesterday');
                        console.log(cartResult.body)
                        console.log(cartResult.page)
                        text = "The total number of page views in this year is  " + cartResult.page;
                        messageData = {
                            speech: text,
                            displayText: text
                        }
                        res.send(messageData);
                        //mailer.sendMailService(emailId, customerName);
                    }
                });
            }
            break;
			
        case 'dynamicValue':
            {
                console.log("In shoes-in-stock");
                if (isDefined(actionName)) {
                    magento.dynamicAuthToken((error, result) => {
                        if (error) {
                            console.log(error);
                        } else {
                            magento.getdynamic(result.code, (error, cartResult) => {
                                // console.log(result.code);
                                if (error) {
                                    console.log(error);
                                } else {
                                    //console.log('sandeep')
                                    //console.log(contactid);
                                    //console.log(cartResult.body);
                                    var contactid = cartResult.name;
                                    text = "Ok. We have shared the eBook reader deals on your registered email id. Have a nice day!!";
                                    messageData = {
                                        speech: text,
                                        displayText: text
                                    }
                                    res.send(messageData);
                                    //console.log('updateDynamic');
                                    //console.log(contactid);
                                    //console.log(result.code);
                                    magento.updateDynamic(result.code, cartResult.name, (error, cartResultp) => {


                                        //var contactid = cartResult.name;
                                        //console.log(cartResult.name);
                                        //console.log('trtetteteteetet');
                                    });
                                }

                            });
                        }
                    });
                }
            }
            break;



        case 'order_status':
            {
                console.log("In shoes-in-stock");
                if (isDefined(actionName)) {
                    magento.getAuthTokenService((error, result) => {
                        if (error) {
                            console.log(error);
                        } else {
                            magento.createorder(result.code, (error, cartResult) => {
                                if (error) {
                                    console.log(error);
                                } else {
                                    console.log('Code--->', result.code);
                                    //console.log(result.token+' '+result.customer_id+" "+result.email);
                                    text = "Yes, there is currently a promotion - they are at 200 swiss francs until the end of the month and are available at your usual Cap Sports Style store. Same color as current one";
                                    messageData = {
                                        speech: text,
                                        displayText: text
                                    }
                                    res.send(messageData);
                                }
                            });
                        }
                    });
                }
            }
            break;

        default:
            //unhandled action, just send back the text
            break;
    }
});


function isDefined(obj) {
    if (typeof obj == 'undefined') {
        return false;
    }

    if (!obj) {
        return false;
    }

    return obj != null;
}

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})

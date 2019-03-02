const apiai = require('apiai');
const config = require('./config');
const express = require('express');
const xml2js = require('xml2js');
const bodyParser = require('body-parser');
const sfcc = require('./sfcc-apis.js');
const sfmc = require('./sfmc.js');
//const magento=require('./magento.js')
const magento = require('./magento-api.js');
const magentoAuth = require('./magento.js');
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
var token = '';
var text = '';
var cardId;
var basketId;
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
    // magentoAuth.sendAuth2(email, name);
    console.log('sandeep')
})


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

    console.log(JSON.stringify(req.body));
    var data = req.body;
    var sessionId = req.body.sessionId;
    var actionName = req.body.result.action;
    var parameters = req.body.result.parameters;
    var message = req.body.result.resolvedQuery;
    switch (actionName) {

        case 'weathercondition':
            {
                sfcc.getOrderService('ityccvj33mq0w4wbr0leork2vy6uqu2j', (error, result) => {
                    if (error) {
                        console.log(error);
                    } else {
                        //console.log(result.code);
                        //notify(emailId, messageId);
                        //setTimeout(() => pushNotification(deviceIdJ), 3000);
                        text = "I am sending you the options, please check on your app.";
                        messageData = {
                            speech: text,
                            displayText: text
                        }
                        res.send(messageData);
                    }
                });
            }
            break;

        case 'tokenqq':
            {
                sfcc.getAuthTokenServiceAdobe((error, result) => {
                    if (error) {
                        console.log(error);
                    } else {
                        //token=result.token
                        //console.log(result.code);
                        //notify(emailId, messageId);
                        //setTimeout(() => pushNotification(deviceIdJ), 3000);
                        text = "I am sending you the options, please check on your app.";
                        messageData = {
                            speech: text,
                            displayText: text
                        }
                        res.send(messageData);
                    }
                });
            }
            break;



        case 'color-confirmed':
            {
                console.log("In color-confirmed");
                if (isDefined(actionName)) {
                    sfcc.setShipmentIdService(token, basketId, (error, result) => {
                        if (error) {
                            console.log(error);
                        } else {
                            orderTotal = result.product_total;
                            text = "I assume I need express delivery so you have it for your race. Do you need something else?";
                            messageData = {
                                speech: text,
                                displayText: text
                            }
                            res.send(messageData);
                        }
                    });
                }
            }
            break;


        case 'order_status-yes':
            {
                magento.getupdatedweather('city', 'appid', (error, result) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(result.code);
                        text = "Ok. We have shared the eBook reader deals on your registered email id. Have a nice day!!.";
                        messageData = {
                            speech: text,
                            displayText: text
                        }
                        res.send(messageData);
                    }
                });
            }
            break;
        case 'order_status-no':
            {
                magento.getupdatedweather('city', 'appid', (error, result) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(result.code);
                        text = "We have shared the Clothing  deals on your registered email id. Have a nice day!!";
                        messageData = {
                            speech: text,
                            displayText: text
                        }
                        res.send(messageData);
                    }
                });
            }
            break;

        case 'tokeneeeeee':
            {
                requestData = {
                    "reportDescription": {
                        "source": "realtime",
                        "reportSuiteID": "geo1xxlon-we-retail-demo",

                        "metrics": "[{ id: 'pageviews' }]"

                    }
                }
                magento.updatePageViews(requestData);

            }

            break;
        case 'order_status':
            {
                console.log("In order tokennnnn");
                if (isDefined(actionName)) {
                    //var idtoken=req.body.originalRequest.data.user.idToken;
                    //var decoded = jwtdecode(idtoken);
                    //console.log(decoded);
                    //if(decoded.iss == 'https://accounts.google.com'){
                    //email=decoded.email;
                    //password=decoded.email;
                    //console.log(email+'   '+password)
                    //}
                    //var passwordTest=password.charAt(0).toUpperCase() + password.slice(1);
                    //console.log(passwordTest);
                    magento.getAuthTokenService(email, password, (error, result) => {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log(result.code);
                            //customer_id=result.customer_id
                            //oken=result.token
                            //emailId=result.email
                            //customerName=result.first_name
                            //custLastName=result.last_name
                            magento.createorder(result.code, (error, cartResult) => {
                                if (error) {
                                    console.log(error);
                                } else {
                                    var orderNumber = cartResult.orderNumber;
                                    var namee = cartResult.name;
                                    var nameee = cartResult.name1;

                                    //console.log(currency +"  "+cartResult.currency);
                                    text = 'You have' + ' ' + orderNumber + ' ' + ' orders in your order list, and the details are' + '' + namee + ' ' + 'it will be delivered at your shipping address in 5 days.' + '' + nameee + '' + 'will be delivered deliver at your shipping address in 3 days We have fantastic deals available on eBook reader would you like to check it?'

                                    messageData = {
                                        speech: text,
                                        displayText: text
                                    }
                                    res.send(messageData);
                                   // mailer.sendMailService("jagi.convonix@gmail.com", "sandeep");
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

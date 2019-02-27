'use strict';


const nodemailer= require('nodemailer');
const dateFormat = require('dateformat');

var sendMailService = (emailAddress, name, lastName)=> {
// create reusable transport method (opens pool of SMTP connections)
    
console.log("Inside mailer");
    
var d = new Date();
d.setDate(d.getDate() + (5 + 7 - d.getDay()) % 7);
console.log(d);
let options = {
    //weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};
var deliveryDate=d.toLocaleString('en-us', options);
//dateFormat(d, "dddd, mmmm dS, yyyy");
//console.log(d.toLocaleString('en-us', options));
console.log(deliveryDate);
    
 var transporter = nodemailer.createTransport({
     host: "smtp.gmail.com",
     port: 465,
     service: 'gmail',
     secure: true,
     auth: {
         user: "customersuppot23@gmail.com",
         pass: "Support@123"
     }
 });
    
    console.log(emailAddress+"  "+name);
// setup e-mail data with unicode symbols
var mailOptions = {
    from: `sandeepsinghkec@gmail.com`, // sender address
    to:   "singhsaheb105@gmai, gwengraman@gmail.com",    //"capstorelausanne@gmail.com", // list of receivers
    subject: "[PRE-ORDER] Pair of Tennis Capstyle pink & blue – Promo – Pick-up Friday", // Subject line
    text: "This email has been generated by Fitness Voice Assistant Customer has ordered a product and will pick-up the merchandise in your store. Refer to following table for product and pick-up details:", // plaintext body
    html: `<p class="x_MsoNormal"><span lang="EN-US">This email has been generated by Fitness Voice Assistant</span></p>
            <p class="x_MsoNormal"><span lang="EN-US">&nbsp;</span></p>
            <p class="x_MsoNormal"><span lang="EN-US">Customer has ordered a product and will pick-up the merchandise in your store.</span></p>
            <p class="x_MsoNormal"><span lang="EN-US">Refer to following table for product and pick-up details:</span></p>
            <p>&nbsp;</p>
            <table style="height: 254px; width: 525px; border-color: black; float: left;" border="2">
            <tbody>
            <tr>
            <td style="width: 181px; background-color: #44546a; text-align: right;"><strong><span style="color: #ffffff;">Order Details</span>&nbsp;</strong></td>
            <td style="width: 346px; background-color: #44546a; text-align: right;"><span style="color: #ffffff;"><strong>Value</strong></span></td>
            </tr>
            <tr>
            <td style="width: 181px; text-align: right;">&nbsp;Customer Last Name</td>
            <td style="width: 346px; text-align: right;">${kumar}&nbsp;</td>
            </tr>
            <tr>
            <td style="width: 181px; text-align: right;">&nbsp;Customer Email</td>
            <td style="width: 346px; text-align: right;">${emailAddress}&nbsp;</td>
            </tr>
            <tr>
            <td style="width: 181px; text-align: right;">&nbsp;Item</td>
            <td style="width: 346px; text-align: right;">CAP-2345678&nbsp;</td>
            </tr>
            <tr>
            <td style="width: 181px; text-align: right;">&nbsp;Designation</td>
            <td style="width: 346px; text-align: right;">Tennis Woman - Capstyle Sport Pink &amp; Blue&nbsp;</td>
            </tr>
            <tr>
            <td style="width: 181px; text-align: right;">&nbsp;Size</td>
            <td style="width: 346px; text-align: right;">&nbsp;39</td>
            </tr>
            <tr>
            <td style="width: 181px; text-align: right;">&nbsp;Promo</td>
            <td style="width: 346px; text-align: right;">&nbsp;Yes</td>
            </tr>
            <tr>
            <td style="width: 181px; text-align: right;">&nbsp;Price</td>
            <td style="width: 346px; text-align: right;">200 CHF&nbsp;</td>
            </tr>
            <tr>
            <td style="width: 181px; text-align: right;">&nbsp;Custom Shoe Sole</td>
            <td style="width: 346px; text-align: right;">&nbsp;Yes</td>
            </tr>
            <tr>
            <td style="width: 181px; text-align: right;">&nbsp;Delivery</td>
            <td style="width: 346px; text-align: right;">&nbsp;Pick-up at Store</td>
            </tr>
            <tr>
            <td style="width: 181px; text-align: right;">&nbsp;Delivery Location</td>
            <td style="width: 346px; text-align: right;">&nbsp;Capstore Luasanne</td>
            </tr>
            <tr>
            <td style="width: 181px; text-align: right;">&nbsp;Delivery Date</td>
            <td style="width: 346px; text-align: right;">&nbsp;${deliveryDate}</td>
            </tr>
            </tbody>
            </table>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>The product should be in your stock, please alert logistics in case not.</p>` // html body
}

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + JSON.stringify(response));
    }

    // if you don't want to use this transport object anymore, uncomment following line
    transporter.close(); // shut down the connection pool, no more messages
});

}



module.exports = {
    sendMailService

};

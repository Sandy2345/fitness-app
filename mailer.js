var mailer = require("nodemailer");

// Use Smtp Protocol to send Email

var sendMailService = (emailAddress, name)=> {
    console.log("Inside mailer");
var smtpTransport = mailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "jagi.convonix@gmail.com",
        pass: "jagi@123"
    }
});

var mail = {
    from: "johnwecanmart@gmail.com",
    to: "singhsaheb105@gmail.com",
    subject: "Send Email Using Node.js",
    text: "Node.js New world for me",
    html: "<b>Node.js New world for me</b>"
}

smtpTransport.sendMail(mail, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }

    smtpTransport.close();
});
}
module.exports = {
    sendMailService

};

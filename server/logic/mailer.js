var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var mailAccountUser = 'grachstk@gmail.com'
var mailAccountPassword = 'kpacubo2016!'

var fromEmailAddress = 'grachstk@gmail.com'
var toEmailAddress = 'egri4stk@gmail.com'

var transport = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: mailAccountUser,
        pass: mailAccountPassword
    }
}))

var mail = {
    from: fromEmailAddress,
    to: toEmailAddress,
    subject: "hello world!",
    text: "Hello!",
    html: "<b>Hello!</b><p><a href=\"http://www.yahoo.com\">Click Here</a></p>"
}

transport.sendMail(mail, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }

    transport.close();
});
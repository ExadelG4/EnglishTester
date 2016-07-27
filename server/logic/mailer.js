
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");


var smtpTransport = nodemailer.createTransport(smtpTransport({
    host : 'smtp.gmail.com',
    secureConnection : false,
    port: 465,
    auth : {
        user : 'grachstk@gmail.com',
        pass : 'kpacubo2016!'
    },
    tls: {
        rejectUnauthorized: false
    }
}));

var mailOptions={
        from : 'grachstk@gmail.com',
        to : 'egri4stk@gmail.com',
        subject : 'Your Subject',
        text : 'Your Text',
        html : 'HTML GENERATED'
    };

        smtpTransport.sendMail(mailOptions, function(error, response){
            if(error){
                console.log(error);
                
            }else{
                console.log(response.response.toString());
                console.log("Message sent: " + response.message);
               
            }
        });
   


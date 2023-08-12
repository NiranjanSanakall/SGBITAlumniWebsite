const nodemailer = require("nodemailer");
const express = require('express');
const { route } = require("./alumniRegister");
const router = express.Router()
router.post('/sendMailForForgotPassword',(req,res)=>{

    let login = req.body.login; 
    let password = req.body.password
    let toEmailId = req.body.toEmail
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'niranjansanakall@gmail.com',
          pass: 'lddypfvpwugkxsjz'
        }
      });
      
      var mailOptions = {
        from: 'niranjansanakall@gmail.com',
        to: toEmailId,
        subject: 'Dear Student Your Password',
        html: "<p>Dear Alumni, Your Alumni account has been activated.</p><br> Kindly login with your <em>login:"+login+" and password:"+password+"</em>"
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.send(info)
        }
      });
})



module.exports=router
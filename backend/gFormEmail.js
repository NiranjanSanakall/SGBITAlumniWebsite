const express = require('express')
const myDB = require('./DBConnect')
const { route } = require('./setAlumniDay')
const router = express.Router()
const nodemailer = require("nodemailer");



router.post('/expertTalkMail',(req,resp)=>{
    // console.log("i m here")
    
    let fname = req.body.fname
    let lname=req.body.lname
    let subject = req.body.subject
    let message = req.body.message
    // let link = req.body.link
    let targetAudience = req.body.targetAudience
    let emailid = req.body.emailid
    let myQuery=""
    if(targetAudience=="All")
      myQuery = "select * from alumnistudent where type='Faculty'"
    else
    myQuery = "select * from alumnistudent where type='Faculty' and branchName in"+targetAudience

    myDB.query(myQuery,(err,result)=>{
        if(err) console.log(err)
        else{

    var toEmailId
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'niranjansanakall@gmail.com',
          pass: 'lddypfvpwugkxsjz'
        }
      });
    
      
      
        toEmailId =""
            for(let i=0; i<result.length;i++){
                toEmailId+=result[i].emailid+","
            }

            var fromEmailId =req.body.fromEmailId

            var mailOptions = {
                from: fromEmailId,
                to: toEmailId,
                subject:subject,
                html: message+"<br><p>This Mail is sent to you by</p>"+fname+"  "+lname+"<span style='100px'></span><p>Email Id : "+emailid+"</p>",
              };

              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                  resp.send(info)
                }
              });
            // console.log(result)
            resp.send(result)
        }
    })
})


router.post('/internshipMail',(req,resp)=>{
  // console.log("i m here")
  
  let fname = req.body.fname
  let lname=req.body.lname
  let emailid = req.body.emailid
  let organization = req.body.organization
  let numOfInterns = req.body.numOfInterns
  let stipendAvailability = req.body.stipendAvailability
  let prerequisites = req.body.prerequisites
  let duration = req.body.duration
  let targetAudience = req.body.targetAudience

  let myQuery=""
  if(targetAudience=="All")
    myQuery = "select * from alumnistudent where type='Faculty'"
  else
  myQuery = "select * from alumnistudent where type='Faculty' and branchName in"+targetAudience

  myDB.query(myQuery,(err,result)=>{
      if(err) console.log(err)
      else{

  var toEmailId
  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'niranjansanakall@gmail.com',
        pass: 'lddypfvpwugkxsjz'
      }
    });
  
    
    
      toEmailId =""
          for(let i=0; i<result.length;i++){
              toEmailId+=result[i].emailid+","
          }

          var fromEmailId =req.body.fromEmailId

          var mailOptions = {
              from: fromEmailId,
              to: toEmailId ,
              subject:'Providing Internships',
              html: "<p>Company Name : "+organization+"</p><br><p>No. Of Interns :"+numOfInterns+"</p><br><p> Stipend Availibilty :"+stipendAvailability+"</p><br><p>Prerequisites :"+prerequisites+"</p><br><p>Duration :"+duration+"</p><br><p>Audience :"+targetAudience+"</p><br><p>This Mail is sent to you by</p>"+fname+"  "+lname+"<span style='100px'></span><p>Email Id : "+emailid+"</p>",
            };

            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
                resp.send(info)
              }
            });
          // console.log(result)
          resp.send(result)
      }
  })
})


router.post('/placementsMail',(req,resp)=>{
  // console.log("i m here")
  
  let fname = req.body.fname
  let lname=req.body.lname
  let emailid = req.body.emailid
  let organization = req.body.organization
  let numOfOpenings = req.body.numOfOpenings
  let eligibility = req.body.eligibility
  let prerequisites = req.body.prerequisites
  let package = req.body.package
  let targetAudience = req.body.targetAudience

  let myQuery=""
  if(targetAudience=="All")
    myQuery = "select * from alumnistudent where type='Faculty'"
  else
  myQuery = "select * from alumnistudent where type='Faculty' and branchName in"+targetAudience

  myDB.query(myQuery,(err,result)=>{
      if(err) console.log(err)
      else{

  var toEmailId
  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'niranjansanakall@gmail.com',
        pass: 'lddypfvpwugkxsjz'
      }
    });
  
    
    
      toEmailId =""
          for(let i=0; i<result.length;i++){
              toEmailId+=result[i].emailid+","
          }

          var fromEmailId =req.body.fromEmailId

          var mailOptions = {
              from: fromEmailId,
              to: toEmailId,
              subject:'Providing Placements',
              html: "<p>Company Name : "+organization+"</p><br><p>No. Of Posts :"+numOfOpenings+"</p><br><p> Eligibility :"+eligibility+"</p><br><p>Prerequisites :"+prerequisites+"</p><br><p>Salary Package :"+package+"</p><br><p>Audience :"+targetAudience+"</p><br><p>This Mail is sent to you by</p>"+fname+"  "+lname+"<span style='100px'></span><p>Email Id : "+emailid+"</p>",
            };

            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
                resp.send(info)
              }
            });
          // console.log(result)
          resp.send(result)
      }
  })
})



// Mail to send google form link to alumnis
router.post('/mailFromHod',(req,resp)=>{
    // console.log("i m here")
    let subject = req.body.subject
    let description = req.body.description
    let link = req.body.link
    let yearsAdded = req.body.yearsAdded
    
    let data = []

    let myQuery = "select * from alumnistudent where type='alumni' and yearOfPassing in"+yearsAdded

    myDB.query(myQuery,data,(err,result)=>{
        if(err) console.log(err)
        else{

    var toEmailId
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'niranjansanakall@gmail.com',
          pass: 'lddypfvpwugkxsjz'
        }
      });
    
      
      
        toEmailId =""
            for(let i=0; i<result.length;i++){
                toEmailId+=result[i].emailid+","
            }

            var mailOptions = {
                from: 'niranjansanakall@gmail.com',
                to: toEmailId,
                subject:subject,
                html: description+"<br>"+link,
              };

              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                  resp.send(info)
                }
              });
            console.log(result)
            resp.send(result)
        }
    })
})



module.exports=router
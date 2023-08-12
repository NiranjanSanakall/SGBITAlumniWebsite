const express = require('express')
const myDB = require('./DBConnect')
const router = express.Router()

router.post('/addDataForExpertTalk',(req,resp)=>{
    let fname = req.body.fname
    let lname=req.body.lname
    let subject = req.body.subject
    let message = req.body.message
    let emailid=req.body.emailid
    // let link = req.body.link
    let targetAudience = req.body.targetAudience
    let currDate = new Date()
    // console.log(currDate)

    let data=[]
    data.push(fname);data.push(lname);data.push(subject);
    data.push(message);data.push(targetAudience);data.push(currDate);data.push(emailid)

    let myQuery = "insert into expertTalk(fname,lname,subject,message,targetAudience,ydate,emailId) values(?,?,?,?,?,?,?)"

    myDB.query(myQuery,data,(err,result)=>{
        if(err) console.log(err)
        else resp.send(result)
    })
})



router.post('/addDataForInternship',(req,resp)=>{
    let fname = req.body.fname
    let lname=req.body.lname
    let organization = req.body.organization
    let numOfInterns = req.body.numOfInterns
    let stipendAvailability = req.body.stipendAvailability
    let prerequisites = req.body.prerequisites
    let duration = req.body.duration
    let targetAudience = req.body.targetAudience
    let emailid=req.body.emailid
    let currDate = new Date()

    let data=[]
    data.push(fname);data.push(lname);data.push(organization);
    data.push(numOfInterns);data.push(stipendAvailability);
    data.push(prerequisites);data.push(duration);data.push(targetAudience);data.push(currDate);data.push(emailid)

    let myQuery = "insert into provideinternship(fname,lname,organization,numOfInterns,stipendAvailability,prerequisites,duration,targetAudience,xdate,emailId) values(?,?,?,?,?,?,?,?,?,?)"

    myDB.query(myQuery,data,(err,result)=>{
        if(err) console.log(err)
        else resp.send(result)
    })
})




router.post('/addDataForPlacements',(req,resp)=>{
    let fname = req.body.fname
    let lname=req.body.lname
    let emailid=req.body.emailid
    let organization = req.body.organization
    let numOfOpenings = req.body.numOfOpenings
    let eligibility = req.body.eligibility
    let prerequisites = req.body.prerequisites
    let package = req.body.package
    let targetAudience = req.body.targetAudience
    let currDate = new Date()

    let data=[]
    data.push(fname);data.push(lname);data.push(organization);
    data.push(numOfOpenings);data.push(eligibility);
    data.push(prerequisites);data.push(package);data.push(targetAudience);data.push(currDate);data.push(emailid);

    let myQuery = "insert into arrangeplacements(fname,lname,organization,numOfOpenings,eligibility,prerequisites,package,targetAudience,zdate,emailId) values(?,?,?,?,?,?,?,?,?,?)"

    myDB.query(myQuery,data,(err,result)=>{
        if(err) console.log(err)
        else resp.send(result)
    })
})






module.exports=router
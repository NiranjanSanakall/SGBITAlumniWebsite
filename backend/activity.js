const express = require('express')
const myDB = require('./DBConnect')
const router = express.Router()


router.post('/activityRegistration',(req,resp)=>{
    let activityName= req.body.aname
    let resourcePerson=req.body.resourcePersonName
    let resourcePersonCompany=req.body.resourcePersonCompanyName
    let activityDate=req.body.adate
    let activityTime=req.body.atime
    let dName = req.body.dName
    let desc = req.body.desc
    
    let data = []
    data.push(activityName);data.push(resourcePerson);data.push(resourcePersonCompany);data.push(activityDate);data.push(activityTime);data.push(dName);data.push(desc);


    let MyQuery = "insert into activities(activityName,resourcePerson,resourcePersonCompanyName,activityDate,activityTime,department,description) values(?,?,?,?,?,?,?)"

    myDB.query(MyQuery,data,(err,result)=>{
        if(err) console.log("someError"+err)
        else 
        resp.send(result)
    })

})

module.exports=router
const express = require('express')
const myDB = require('./DBConnect')
const router = express.Router()

router.post('/api/viewAll',(req,resp)=>{
    let loginId = req.body.loginId
    if(loginId=="principal" || loginId=="alcord")
        myDB.query("select * from alumnistudent where type='alumni' and approvalStatus ='Approved'  order by yearOfPassing desc",(err,result)=>{
            if(err) console.log(err)
            else {
            resp.send(result)
            }
        })
    else{
        let dname
     if(loginId=="csehod"){dname='CSE'}
    else if(loginId=="ecehod") {dname='ECE'}
    else if(loginId=="eeehod"){dname='EEE'}
    else if(loginId=="civilhod") {dname='CIVIL'}//To be checked
    else if(loginId=="mechhod") {dname='MECH'}
    else if(loginId=="aidshod") {dname='AIDS'}
    else if(loginId=="csbshod") {dname='CSBS'}
    mySql = "select * from alumnistudent where branchName='"+dname+"' and type='alumni'  order by yearOfPassing desc"
    myDB.query(mySql,(err,result)=>{
        if(err) console.log(err)
        else {
        resp.send(result)
        }
    })
}
})
router.post('/viewByYear',(req,resp)=>{
    let year= parseInt(req.body.year)
    let deptName = req.body.deptName
    let data = []
    data.push(year);data.push(deptName)

    let myQuery = "select * from alumnistudent where yearOfPassing=? and type='alumni' and branchName=?"

    myDB.query(myQuery,data,(err,result)=>{
        if(err) console.log(err)
        else 
       
        resp.send(result)
    })

})


router.get('/viewAllActivity',(req,resp)=>{
    myDB.query("select * from activities",function(err,result){
        if(err) console.log(err)
        else {
        resp.send(result)
        }
    })

})
router.post('/viewActivityByYear',(req,resp)=>{
    let year= req.body.year1
    let data = []
    data.push(year);

    let myQuery = "select * from activities where YEAR(activityDate)=?"

    myDB.query(myQuery,data,(err,result)=>{
        if(err) console.log(err)
        else 
       
        resp.send(result)
    })

})
router.get('/viewCredits/:aid',(req,resp)=>{
    let aid = parseInt(req.params.aid)
    myDB.query("select * from alumnistudent where alumniID="+aid,(err,result)=>{
        if(err) console.log(err)
        else resp.send(result)
    })
})

router.post('/updateCredits',(req,resp)=>{
    let alumniId = parseInt(req.body.alumniId)
    let numLect = parseInt(req.body.numLect)
    let numInterns = parseInt(req.body.numInterns)
    let numPlacements = parseInt(req.body.numPlacements)
    let amtDonated = parseInt(req.body.amtDonated)
    let credits = parseInt(req.body.credits)
    let professionPoints = parseInt(req.body.professionPoints)
    let awardPoints = parseInt(req.body.awardPoints)

    let data = []
    
    data.push(numLect);data.push(numInterns);data.push(numPlacements);data.push(amtDonated);data.push(professionPoints);data.push(awardPoints);data.push(credits);
    // console.log(data) 
    // console.log(alumniId)
    let mysql = "update alumnistudent set numLectGiven=numLectGiven+?, numInternGot=numInternGot+?, numPlacementsGot=numPlacementsGot+?, amountDonated=amountDonated+?, professionPoints=professionPoints+?, awardPoints=awardPoints+?, alumniPerformanceIndex=alumniPerformanceIndex+? where alumniID ="+alumniId

    myDB.query(mysql,data,(err,result)=>{
    
        if(err) console.log("Some error"+err);
        else{
        console.log(result.affectedRows+" rows Updated..");
        resp.send(result)
        }
    })
})


module.exports=router
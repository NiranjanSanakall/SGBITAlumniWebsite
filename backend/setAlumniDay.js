const express = require('express')
const myDB = require('./DBConnect')
const { data } = require('jquery')
const router = express.Router()

router.post('/storeAlumniDay',(req,resp)=>{
    let aDate= req.body.alumniDayDate
    let aTime= req.body.alumniDayTime
    let aVenue = req.body.alumniDayVenue
    let dName = req.body.alumniDayForBranch
    let data=[]
    data.push(aDate);data.push(aTime);data.push(aVenue);data.push(dName)

    myQuery = "insert into alumniday(aDate,aTime,aVenue,branchName) values(?,?,?,?)"

    myDB.query(myQuery,data,(err,result)=>{
        if(err) console.log(err)
        else 
        resp.send(result)
    })
})
router.get('/getAlumniDay/:dName',(req,resp)=>{
    let dName = req.params.dName
    myDB.query("select aDate,branchName from alumniday where aDate in (select max(aDate) from alumniday where branchName='"+dName+"')",(err,result)=>{
        if(err) console.log(err)
        else{
            // console.log(result)
         resp.send(result)}
    })
})





module.exports=router
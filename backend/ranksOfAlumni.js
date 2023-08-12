const express = require('express')
const myDB = require('./DBConnect')
const router = express.Router()

router.get('/viewAlumniRanksForBranchWise/:branch',(req,resp)=>{
    let branch=req.params.branch
    // console.log(branch)
    myDB.query("select * from alumnistudent where type='alumni' and alumniPerformanceIndex>10 and branchName='"+branch+"' order by alumniPerformanceIndex desc limit 3",(err,result)=>{
        if(err) console.log(err)
        else resp.send(result)
    })
})
router.get('/viewAlumniRanksForAll',(req,resp)=>{
    myDB.query("select * from alumnistudent where type='alumni' and alumniPerformanceIndex>10 order by alumniPerformanceIndex desc limit 3",(err,result)=>{
        if(err) console.log(err)
        else resp.send(result)
    })
})

module.exports = router
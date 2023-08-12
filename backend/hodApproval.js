const express = require('express')
const myDB = require('./DBConnect')
const router = express.Router()

router.get('/updateApprovalStatus/:cell',(req,resp)=>{
    let cellNum=req.params.cell
    myDB.query(" update alumnistudent set approvalStatus = 'Approved' where cellNum ='"+cellNum+"'",function(err,result){
        if(err) console.log(err)
        else {
        resp.send(result)
        }
    })
})
router.get('/revokeApprovalStatus/:alumniHistoryId',(req,resp)=>{
    let alumniHistoryId=req.params.alumniHistoryId
    myDB.query(" update alumnistudent set approvalStatus = 'Pending' where alumniId ='"+alumniHistoryId+"'",function(err,result){
        if(err) console.log(err)
        else {
        resp.send(result)
        }
    })
})

module.exports=router
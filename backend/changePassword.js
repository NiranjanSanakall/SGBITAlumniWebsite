const express = require('express')
const myDB = require('./DBConnect')
const router = express.Router()

router.post('/changePassword',(req,resp)=>{
    let loginId = req.body.loginId
    let newPassword = req.body.newPassword
    myQuery = "update alumnistudent set password ='"+newPassword+"' where (emailid='"+loginId+"' or cellNum='"+loginId+"' or login='"+loginId+"')"
   
    myDB.query(myQuery,(err,result)=>{
        if(err) console.log(err)
        else 
        resp.send(result)
    })
})



module.exports=router
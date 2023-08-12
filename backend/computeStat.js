const express = require('express')
const myDB = require('./DBConnect')
const router = express.Router()

router.get('/getStat',(req,resp)=>{
    // console.log("is this")
    myDB.query("select branchName, category,count(*) as catCount From alumnistudent where type='alumni' group by branchName, category",(err,result)=>{
        if(err) console.log(err)
        else resp.send(result)
    })
})

module.exports = router
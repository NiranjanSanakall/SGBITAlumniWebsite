const express = require('express')
const myDB = require('./DBConnect')
const router = express.Router()

router.get('/getEvents',(req,resp)=>{
    myDB.query("select * from  activities",(err,result)=>{
        if(err) console.log(err)
        else resp.send(result)
    })
})







module.exports=router
const express = require('express')
const myDB = require('./DBConnect')
const router = express.Router()




router.get('/expertTalkList',(req,resp)=>{
    myDB.query("select * from experttalk order by ydate desc limit 5",(err,result)=>{
        if(err) console.log(err)
        else resp.send(result)
    })
})


router.get('/internshipList',(req,resp)=>{
    myDB.query("select * from provideinternship order by xdate desc limit 5",(err,result)=>{
        if(err) console.log(err)
        else resp.send(result)
    })
})


router.get('/placementsList',(req,resp)=>{
    myDB.query("select * from arrangeplacements order by zdate desc limit 5",(err,result)=>{
        if(err) console.log(err)
        else resp.send(result)
    })
})


module.exports=router
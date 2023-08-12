const express = require('express')
const myDB = require('./DBConnect')
const router = express.Router()


router.post('/authenticate',(req,resp)=>{
    let uid = req.body.uid
    let pwd = req.body.pwd
    let data = []

    data.push(uid);data.push(uid);data.push(uid);data.push(pwd)

    let myQuery = "select * from alumnistudent where (emailid=? or cellNum=? or login = ?) and password = ?"

    myDB.query(myQuery,data,(err,result)=>{
        if(err) console.log(err)
        else 
        resp.send(result)
    })


})

module.exports=router
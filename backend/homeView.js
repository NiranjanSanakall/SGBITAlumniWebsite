const express = require('express')
const myDB = require('./DBConnect')
const router = express.Router()

router.get('/getAlumniHomePage/:uName',(req,resp)=>{

    let uName = req.params.uName
    myDB.query("select * from alumnistudent where (emailid='"+uName+"' or cellNum='"+uName+"' or login='"+uName+"' or alumniId='"+uName+"')",(err,result)=>{
        if(err) console.log(err)
        else resp.send(result)
    })
})

router.post('/getUpdateProfile',(req,resp)=>{
    let uname=req.body.userName
    // console.log("im here"+uname)

    mysql="select * from alumnistudent where (emailid='"+uname+"' or cellNum='"+uname+"' or login='"+uname+"')"

    myDB.query(mysql,function(err,result){
        if(err) console.log(err)
        else {
        resp.send(result)
        }
    })
})





router.post('/viewByYear',(req,resp)=>{
    let Lid= parseInt(req.body.id)
    let data = []
    data.push(Lid);

    let myQuery = "select * from alumnistudent where=?"

    myDB.query(myQuery,data,(err,result)=>{
        if(err) console.log(err)
        else 
       
        resp.send(result)
    })

})

module.exports=router
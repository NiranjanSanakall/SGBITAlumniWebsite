const express = require('express')
const myDB = require('./DBConnect')
const router = express.Router()


router.post('/submitImgs',(req,resp)=>{
    let iName = req.body.iName
    let imgDesc = req.body.imgDesc
    // console.log("testing"+iName)
    let data=[]
    data.push(iName);data.push(imgDesc);

    let mySql = "insert into allImages(activityImgUrl,imgDescription) values(?,?)"

    myDB.query(mySql,data,(err,result)=>{
        if(err) console.log(err)
        else resp.send(result)
    })
})


router.get('/getImgs',(req,resp)=>{
    myDB.query("select * from AllImages order by imageId desc limit 6",(err,result)=>{
        if(err) console.log(err)
        else resp.send(result)
    })
})






module.exports=router
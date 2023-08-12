const express = require('express')
const myDB = require('./DBConnect')
const { route } = require('./alumniPhotoUpload')
const router = express.Router()

router.post('/sendPost',(req,resp)=>{
    let topic = req.body.topic
    let dName = req.body.dName
    let desc = req.body.description
    let userName = req.body.userName
    let presentDate = new Date()
    let data = []

    data.push(desc);data.push(presentDate);data.push(dName);data.push(topic);data.push(userName);

    myQuery = "insert into alumniposts(post,date,department,topic,username) values(?,?,?,?,?)"
    myDB.query(myQuery,data,(err,result)=>{
        if(err) console.log(err)
        else resp.send(result)
    })
})

router.get('/viewPosts/:dName',(req,resp)=>{
    let dName = req.params.dName
    // console.log(dName)
    myDB.query("select * from alumniposts order by postId desc limit 50",(err,result)=>{
        if(err) console.log(err)
        else {
            // console.log(result)
            resp.send(result)}
    })
    
})

router.get('/getLikeCount/:pid',(req,resp)=>{

    let pid = parseInt(req.params.pid)
    myDB.query("update alumniposts set counter=counter+1 where postId ="+pid,(err,result)=>{
        if(err) console.log(err)
        else{
            resp.send(result)
            // console.log(result)
        }
    })
    myDB.query("select * from alumniposts where postId ="+pid+" order by postId desc",(err,result)=>{
        if(err) console.log(err)
        else resp.send(result)
    })
})
router.get('/deletePost/:pid',(req,resp)=>{

    let pid = parseInt(req.params.pid)
    myDB.query("delete from alumniposts where postId ="+pid,(err,result)=>{
        if(err) console.log(err)
        else{
        resp.send(result)
    //  console.log(result)
        }
    })
})


module.exports = router
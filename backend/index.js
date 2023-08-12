const express=require('express')         //models
const cors=require('cors')                //models
const bp=require('body-parser')  
// const fileUpload = require('express-fileupload') 
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const myDB =require('./DBConnect')        //models
const alumniRgister=require('./alumniRegister')
const authenticate = require('./authenticate.js')
const alumni = require('./alumniView.js')
const activities = require('./activity.js')
const homePage = require('./homeView.js')
const updateProfile = require('./updateProfile.js')
const hodApproval = require('./hodApproval.js')
const emailSender = require('./sendMail')
const alumniUpload = require('./alumniPhotoUpload').method
const reportUpload = require('./reportUpload')
const searchAlumni = require('./searchAlumni')
const changePassword = require('./changePassword')
const  forgotPassword = require('./forgotPasswordMail')
const sendActivities = require('./sendActivities')
const computStat = require("./computeStat")
const ranksOfAlumni = require('./ranksOfAlumni')
const postsOfAlumni = require('./postsOfAlumni')
const alumniDaySetting = require('./setAlumniDay')
const gFormEmail = require('./gFormEmail')
const activityImgAdding = require('./activityImgAdding')
const alumniContributionData = require('./alumniContributionData')
const contributionOfAlumni = require('./contributionOfAlumni')
const hodUpdates = require('./hodUpdates')



const App=new express()

App.use(cors({
    "origin":"*"
}))



//Something UrlEncode -false to be set...
App.use(express.urlencoded({
    extended:false,
}))

App.use(bp.json())
App.use('/',alumniRgister)
App.use('/',authenticate)
App.use('/',alumni)
App.use('/',activities)
App.use('/',homePage)
App.use('/',updateProfile)
App.use('/',hodApproval)
App.use('/',emailSender)
App.use('/',alumniUpload)
App.use('/',reportUpload)
App.use('/',searchAlumni)
App.use('/',changePassword)
App.use('/',forgotPassword)
App.use('/',sendActivities)
App.use('/',computStat)
App.use('/',ranksOfAlumni)
App.use('/',postsOfAlumni)
App.use('/',alumniDaySetting)
App.use('/',gFormEmail)
App.use('/',activityImgAdding)
App.use('/',alumniContributionData)
App.use('/',contributionOfAlumni)
App.use('/',hodUpdates)
// App.use('/',path)
// App.use(fileUpload())



App.get("/getuName/:loginId",(req,resp)=>{
    let loginId = req.params.loginId
    // console.log(loginId)
    myDB.query("select * from alumnistudent where (emailid='"+loginId+"' or cellNum='"+loginId+"' or login ='"+loginId+"')",(err,result)=>{
        if(err) console.log(err)
        else
        resp.send(result)
    })
})

    



App.listen(8000,(err)=>{
 if(err) console.log("Unable to start server")
 else
 console.log("Server running at 8000 port");

})
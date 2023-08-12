const express = require('express')
const myDB = require('./DBConnect')
const router = express.Router()
const myModule = require('./alumniPhotoUpload')
const extn = require('./alumniPhotoUpload').variable1
var fname1

// router.get("/maxOfAlumniIdForInserting",(req,resp)=>{
    
//     myDB.query("select max(alumniID) as lastAid from alumnistudent",(err,result)=>{
//         if(err) console.log(err)
//         else fname1 ="../AlumniImages/"+result[0].lastAid+"photo"
//      })
// })

router.post("/api/registerAlumni",(req,resp)=>{
    let extn = req.body.extn
    // console.log("test123"+extn)
    myDB.query("select max(alumniID) as lastAid from alumnistudent",(err,result)=>{
        if(err) console.log(err)
        else{ fname1 ="../AlumniImages/"+(result[0].lastAid+1)+"photo"+extn;
            //    console.log("xxxxxx "+ fname1)
            }
   
    let fname=req.body.fname
    let lname=req.body.lname
    let gender = req.body.gender
    let yearOfPassing =parseInt(req.body.passingYear)
    let category = req.body.category
    let cellNum =req.body.cellNo
    let emailid =req.body.Email
    let presentlyworkingAtCompany =req.body.companyName
    let branchName = req.body.branchName
    let city =req.body.city
    // let imageURL =req.body.image
    let domainExpertise =req.body.domain
    let login =req.body.id
    let password =req.body.pwd
    
    let data=[]
    data.push(fname);data.push(lname);data.push(gender);data.push(yearOfPassing);data.push(category);data.push(cellNum);data.push(emailid);data.push(presentlyworkingAtCompany);data.push(branchName);data.push(city);data.push(fname1);data.push(domainExpertise);data.push(login);data.push(password);
    //  console.log("I am here"+fname1)
    
    let mysql="insert into alumnistudent(fname,lname,gender,yearOfPassing,category,cellNum,emailid,presentlyworkingAtCompany,branchName,city,imageURL,domainExpertise,login,password) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
    
    myDB.query(mysql,data,(err,result)=>{
    
        if(err) console.log("Some error"+err);
        else
        console.log(result.affectedRows+" rows inserted..");
        resp.send(result)
    
    })
    
    })
})
    
module.exports=router

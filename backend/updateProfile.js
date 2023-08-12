const express = require('express')
const myDB = require('./DBConnect')
const router = express.Router()

router.post('/addingHistory',(req,resp)=>{
    let alumniId = req.body.alumniId
    let companyName = req.body.companyName
    let workedCity = req.body.workedCity
    let stYear = req.body.stYear
    let enYear = req.body.enYear
    let workDesgn = req.body.workDesgn
    let workDomain = req.body.workDomain

    let data =[]
    data.push(alumniId);data.push(companyName);data.push(workedCity);data.push(stYear);
    data.push(enYear);data.push(workDesgn);data.push(workDomain);

    let mySql = "insert into alumniworkhistory(alumniId,companyName,city,stYear,enYear,designation,workDomain) values(?,?,?,?,?,?,?)"

    myDB.query(mySql,data,(err,result)=>{
        if(err) console.log(err)
        else resp.send(result)
    })
})

router.get('/profileHistory/:alumniId',(req,resp)=>{
    let alumniId = parseInt(req.params.alumniId)
    // console.log(uname)
    myDB.query("select * from  alumniworkhistory where alumniID="+alumniId,(err,result)=>{
        if(err) console.log(err)
        else resp.send(result)
    })
})
router.get('/getDomains',(req,resp)=>{
    myDB.query("select * from domains",(err,result)=>{
        if(err) console.log(err)
        else resp.send(result)
    })
})
router.get('/insertDomain/:domain',(req,resp)=>{
    let domain = req.params.domain
    let data = []
    data.push(domain)
    myDB.query("insert into domains(domainName) values('"+domain+"')",(err,result)=>{
        if(err) console.log(err)
        else{
            console.log(result.affectedRows+" row inserted...")
            resp.send(result)
        } 
    })
})

var fname1
router.post("/api/updateAlumni",(req,resp)=>{
    let uname = req.body.uname
    let extn = req.body.extn
    // console.log("update123"+extn)
    myDB.query("select * from alumnistudent where (emailid='"+uname+"' or cellNum='"+uname+"' or login='"+uname+"')",(err,result)=>{
        if(err) console.log(err)
        else{
            let imgName = result[0].imageURL
            fname1 = "../AlumniImages/"+imgName.substring(imgName.lastIndexOf('/')+1,imgName.lastIndexOf('.'))+extn
          } 
   
    let fname=req.body.fname
    let lname=req.body.lname
    let gender=req.body.gender
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
    
    let mysql="update alumnistudent set fname=?,lname=?,gender=?,yearOfPassing=?,category=?,cellNum=?,emailid=?,presentlyworkingAtCompany=?,branchName=?,city=?,imageURL=?,domainExpertise=?,login=?,password=? where (emailid='"+uname+"' or cellNum='"+uname+"' or login='"+uname+"')"
    
    myDB.query(mysql,data,(err,result)=>{
    
        if(err) console.log("Some error"+err);
        else
        console.log(result.affectedRows+" row Updated..");
        resp.send(result)
    
    })
    
    })
})


module.exports=router
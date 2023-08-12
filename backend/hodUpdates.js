const express = require('express')
const myDB = require('./DBConnect')
const router = express.Router()

router.get('/getAllBranches',(req,resp)=>{
    myDB.query("select * from departments",(err,result)=>{
        if(err) console.log(err)
        else resp.send(result)
    })
})

router.get('/insertNewBranch/:newBranch',(req,resp)=>{
    let newBranch = req.params.newBranch
    // console.log(newBranch)
    let data = []
    data.push(newBranch)
    myDB.query("insert into departments(departmentName) values('"+newBranch+"')",(err,result)=>{
        if(err) console.log(err)
        else{
            console.log(result.affectedRows+" row inserted...")
            resp.send(result)
        } 
    })
})

router.post('/getHodAccounts',(req,resp)=>{
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

router.post("/api/updateHodAccounts",(req,resp)=>{
    let uname = req.body.uname
    let extn = req.body.extn
    let fname1 = ""
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
    let yearOfJoining =parseInt(req.body.joiningYear)
    let category = req.body.category
    let cellNum =req.body.cellNo
    let emailid =req.body.Email
    let branchName = req.body.branchName
    let login = req.body.login
    let password = req.body.password

    let data=[]
    data.push(fname);data.push(lname);data.push(gender);data.push(yearOfJoining);data.push(category);data.push(cellNum);data.push(emailid);data.push(branchName);data.push(fname1);data.push(login);data.push(password);
    //  console.log("I am here"+fname1)
    
    let mysql="update alumnistudent set fname=?,lname=?,gender=?,yearOfPassing=?,category=?,cellNum=?,emailid=?,branchName=?,imageURL=?,login=?,password=? where (emailid='"+uname+"' or cellNum='"+uname+"' or login='"+uname+"')"
    // let mysql="update alumnistudent set fname='"+fname+"',lname='"+lname+"',gender='"+gender+"',yearOfPassing="+yearOfJoining+",category='"+category+"',cellNum="+cellNum+",emailid='"+emailid+"',branchName='"+branchName+"',imageURL='"+fname1+"' where (emailid='"+uname+"' or cellNum='"+uname+"' or login='"+uname+"')"
    // console.log(mysql)

    
    myDB.query(mysql,data,(err,result)=>{
    
        if(err) console.log("Some error"+err);
        else
        console.log(result.affectedRows+" row Updated..");
        resp.send(result)
    
    })
    
    })
})




module.exports=router
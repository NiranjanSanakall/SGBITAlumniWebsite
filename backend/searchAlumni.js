const express = require('express')
const myDB = require('./DBConnect')
const e = require('express')
const router = express.Router()

let myQuery = ""
router.post('/searchingByPriorityForPrincipal',(req,resp)=>{
    let sv= req.body.searchValue
    // console.log(sv)
    let slv= req.body.selectedValue
    // console.log(slv)
    let sy = req.body.selectedYear
    if(sy=="Select Year"){
        if(slv == "yearOfPassing" || slv == "cellNum"){sv=parseInt(sv); myQuery = "select * from alumnistudent where type='alumni' and "+slv+"="+sv}
        else  myQuery = "select * from alumnistudent where type='alumni' and "+slv+" like '"+sv+"%'"
    }
    else if(slv=="Select Your Priority"){
        myQuery = "select * from alumnistudent where type='alumni' and yearOfPassing='"+sy+"'"
    }
    else myQuery = "select * from alumnistudent where type='alumni' and yearOfPassing='"+sy+"' and "+slv+" like '"+sv+"%'"
    let data = []
    data.push(slv);
   

    myDB.query(myQuery,(err,result)=>{
        if(err) console.log(err)
        else {
        resp.send(result)
        // console.log(result)
        }
    })

})

router.post('/searchingByPriorityForHod',(req,resp)=>{
    let sv= req.body.searchValue
    let slv= req.body.selectedValue
    let loginId = req.body.loginId
    let dname = ""
    if(loginId=="csehod"){dname='CSE'}
    else if(loginId=="ecehod") {dname='ECE'}
    else if(loginId=="eeehod"){dname='EEE'}
    else if(loginId=="civilhod") {dname='CIVIL'}//To be checked
    else if(loginId=="mechhod") {dname='MECH'}
    else if(loginId=="aidshod") {dname='AIDS'}
    else if(loginId=="csbshod") {dname='CSBS'}
    else if(loginId=="alcord") {dname="CSE' or branchName='ECE' or branchName='EEE' or branchName='AIDS' or branchName='CIVIL' or branchName='MECH' or branchName='CSBS"}
    if(slv == "yearOfPassing" || slv == "cellNum"){sv=parseInt(sv); myQuery = "select * from alumnistudent where type='alumni' and branchName = '"+dname+"' and "+slv+" = "+sv}
    else  myQuery = "select * from alumnistudent where type='alumni' and branchName = '"+dname+"' and "+slv+" like '"+sv+"%'"

    myDB.query(myQuery,(err,result)=>{
        if(err) console.log(err)
        else {
            resp.send(result)
            // console.log(result)
        }
       
        
    })
})

module.exports=router
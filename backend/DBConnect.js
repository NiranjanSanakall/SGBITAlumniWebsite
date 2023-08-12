const mysql=require('mysql')


const myDB=mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"",
    database:"sgbitalumni"
})

myDB.connect(function(err){

    if(err) console.log("Error conntecting to MySQL"+err)
    else
    console.log("Connection to MYSQL is successful!!!!")
})

module.exports=myDB
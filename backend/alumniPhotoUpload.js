const express = require('express')
const myDB = require('./DBConnect')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')

var fname = ""
var iName = ""
var extn
var extn1 = ""
let aid = 0
router.get('/sendAid/:aid',function(req,resp){
   aid = req.params.aid

})
//This is while updating alumni img
router.get("/updateAlumniIdForNaming/:uname",(req,resp)=>{
  let uname = req.params.uname
  myDB.query("select * from alumnistudent where (emailid='"+uname+"' or cellNum='"+uname+"' or login='"+uname+"')",(err,result)=>{
      if(err) console.log(err)
      else{
        let imgName = result[0].imageURL
        fname = imgName.substring(imgName.lastIndexOf('/')+1,imgName.lastIndexOf('.'))
      } 
   })
})

// This while alumni registration
router.get("/maxOfAlumniIdForNaming",(req,resp)=>{
  myDB.query("select max(alumniID) as lastAid from alumnistudent",(err,result)=>{
      if(err) console.log(err)
      else fname =(result[0].lastAid+1)+"photo"
   })
})

router.get("/maxOfImageId",(req,resp)=>{
  myDB.query("select max(imageId) as lastAid from allImages",(err,result)=>{
      if(err) console.log(err)
      else{
        iName =(result[0].lastAid+1)+"photo"
        // console.log("iam here"+iName)
        resp.send(result)
      } 
   })
})
const storage =  multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, '../AlumniImages/');
    },
    filename: function (req, file, callback) {
      let ofname=file.originalname
      extn=ofname.substring(ofname.lastIndexOf('.'),ofname.length)
      // console.log("This is extn"+extn)
      // console.log("This is fname"+fname)
      callback(null, fname+extn);
    }
  });
  
  const storage1 =  multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, '../activityReport/');
    },
    filename: function (req, file, callback) {
      let ofname=file.originalname
      extn1=ofname.substring(ofname.lastIndexOf('.'),ofname.length)
      let fname1 =aid+"Report"
      // console.log("ActivityId"+aid)
      // console.log(extn1)
      callback(null, fname1+extn1);
    }
  });

  const storage2 =  multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, '../AllImgs/');
    },
    filename: function (req, file, callback) {
      let ofname=file.originalname
      extn=ofname.substring(ofname.lastIndexOf('.'),ofname.length)
      // console.log("This is extn"+extn)
      // console.log("This is iName"+iName)
      callback(null, iName+extn);
    }
  });

  const storage3 =  multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, '../AlumniImages/');
    },
    filename: function (req, file, callback) {
      let ofname=file.originalname
      extn=ofname.substring(ofname.lastIndexOf('.'),ofname.length)
      // console.log("This is extn"+extn)
      // console.log("This is fname"+fname)
      callback(null, fname+extn);
    }
  });
  
  const upload = multer({ storage : storage}).single('file')
  const upload1 = multer({ storage : storage1})
  const upload2 = multer({ storage : storage2}).single('file')
  const upload3 = multer({ storage : storage3}).single('file')
  
  
  router.get('/',function(req,res){
        res.sendFile(__dirname + "/index.html");
  });
  
  router.post('/upload',function(req,res,err){
    // console.log("lets test")
    
      upload(req,res,function(err) {
      if(err) {
      res.status(400).send("Something went wrong!");
      }
      else
        res.sendStatus(200);
     });
        
         
      });
  router.post('/AddingImg',function(req,res,err){
    // console.log("is it Working")
    
      upload2(req,res,function(err) {
      if(err) {
      res.status(400).send("Something went wrong!");
      }
      else
        res.sendStatus(200);
     });
        
         
      });

      router.post('/updateHodImage',function(req,res,err){
        // console.log("lets test")
        
          upload3(req,res,function(err) {
          if(err) {
          res.status(400).send("Something went wrong!");
          }
          else
            res.sendStatus(200);
         });
            
             
          });


      router.post('/uploadReport',upload1.single('file'),function(req,res,err){
        // upload(req,res,function(err) {
      //   myDB.query("select max(alumniID) as lastAid from alumnistudent",(err,result)=>{
      //     if(err) console.log(err)
      //     else {
      //       fname =result[0].lastAid+"photo"
      //       console.log("here is"+fname)
      //     }
      //  })

            if(err) {
                return res.send("Error uploading file.");
            }
            else res.send("File is uploaded");
        });


module.exports = {
   method:router,
  variable1:extn
};

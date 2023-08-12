const express = require('express')
const myDB = require('./DBConnect')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')


router.get('/downloadPdf/:aid', (req, res) => {
      let aid = parseInt(req.params.aid)
      const filePath = '../activityReport/'+aid+'Report.pdf';
      res.download(filePath);
    });








module.exports=router
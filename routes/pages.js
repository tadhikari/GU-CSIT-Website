const {Page} = require('../models/page');
const {Visitor} = require('../models/visitorModel');
const formidable = require('formidable');
const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fileType = require('file-type');
const readChunk = require('read-chunk');
const path = require('path');
const fs = require('fs');
var connection = mongoose.connection;
const app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonParser = bodyParser.json()

router.post('/:id', async (req, res) => {
		var description = '';
        var ImageRatio = 0;
 		var photos = []
        form = new formidable.IncomingForm();
      
         page = await Page.findOne({Title: req.params.id})


       form.on('field', async function (name, value){
        console.log('Got a field:', name, 'Value of field:', value);

        if(name == "pageTitle" || name == "Title:"){
          
          
            

            console.log('has the title', value)

        }

        else if(name == "pageDescription" || name =="Description:"){
        	 description = value;
        }

        else if(name == "ImageRatio" || name =="ImageRatio:"){
             ImageRatio = value;
        }
       
       })
       
    form.multiples = true;
    form.uploadDir = path.join(__dirname, 'tmp_uploads');
    
    form.on('file', async function (name, file) {
        console.log('updated pageTitle:', page.Title)
        page.Description = description
        console.log('updated pageDescription:', page.Description)
         page.ImageRatio = ImageRatio
        console.log('updated ImageRatio:', page.ImageRatio)
        
        
        var buffer = null,
            type = null,
            filename = '';
        buffer = readChunk.sync(file.path, 0, 262);
        type = fileType(buffer);
  
        if (type !== null && (type.ext === 'png' || type.ext === 'jpg' || type.ext === 'jpeg')) {
            filename = file.name;
            page.ImageSrc = filename;
   			console.log(page.ImageSrc)
            
            fs.rename(file.path,'public/images/pages/'+filename, (err)=>{
                if (err) throw err;
                console.log('Rename complete')
            });
            photos.push({
                status: true,
                filename: filename,
                type: type.ext,
                publicPath: 'public/images/pages'
            });
        } else {
            photos.push({
                status: false,
                filename: file.name,
                message: 'Invalid file type'
            });
            fs.unlink(file.path, function(err){
                if(err) throw err;
            });
        }
        

        await page.save();
    });

    form.on('error', function(err) {
        console.log('Error occurred during processing - ' + err);

    });
    form.on('end', function() {
        console.log('All the request fields have been processed.');
        
    });
    form.parse(req, function (err, fields, files) {
        console.log('Successfully Parsed!')
    });

    res.send('Success!');




 });

router.put('/', jsonParser, async (req,res) => {
	
	page = await Page.findOne({Title: req.body.Title})
	

	res.send(page);


});



router.get('/Visitors', async (req,res) => {

visitorCount = await Visitor.findOne({Title: "Visitors"})


res.send(visitorCount) 





})

module.exports = router;
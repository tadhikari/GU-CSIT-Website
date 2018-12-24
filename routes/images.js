const {Spotlight} = require('../models/spotlightModel');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const createHTML = require('create-html');
const mkDirp = require('mkdirp')
const multer = require('multer')
const readChunk = require('read-chunk')
const fileType = require('file-type')
const formidable = require('formidable')
const path = require('path')
const rimraf = require('rimraf')
var upload = multer({dest: '../Photos/'})

const fs = require('fs');

const app = express();
var currentFolder = '';

router.post('/photos/upload', upload.array('photos', 30), function (req, res, next) {
console.log(req.files)
})
var jsonParser = bodyParser.json()



router.post('/uploadImages', async (req , res) => {


    var photos = []
        form = new formidable.IncomingForm();
        
       

    form.multiples = true;
    form.uploadDir = path.join(__dirname, 'tmp_uploads');
    
    form.on('file', function (name, file) {
         currentFolder = name
        console.log("name of file form:",name)
        var buffer = null,
            type = null,
            filename = '';
        buffer = readChunk.sync(file.path, 0, 262);
        type = fileType(buffer);
  
        if (type !== null && (type.ext === 'png' || type.ext === 'jpg' || type.ext === 'jpeg')) {
            filename = file.name;
            fs.rename(file.path,'public/Photos/'+ currentFolder + '/' + filename, (err)=>{
                if (err) throw err;
                console.log('Rename complete')
            });
            photos.push({
                status: true,
                filename: filename,
                type: type.ext,
                publicPath: 'public/Photos/' + currentFolder
            });
        } else {
            photos.push({
                status: false,
                filename: file.name,
                message: 'Invalid file type'
            });
            fs.unlink(file.path, (err)=>{
                if (err) throw err;
                console.log('Rename complete')
            });
       
        
        }
    });

    form.on('error', function(err) {
        console.log('Error occurred during processing - ' + err);

    });
    form.on('end', function() {
        console.log('All the request fields have been processed.');
        
    });
    form.parse(req, function (err, fields, files) {
        res.redirect('/CMS/gallery')
    });


});



router.post('/createFolder', jsonParser, async (req, res) => {

var folderName = req.body.folderName


mkDirp('public/Photos/'+folderName, function(err){
    if (err) console.log(err)
   
})

res.send('succesfully created folder: ' + folderName)

});


router.delete('/',jsonParser, async (req, res) => {

    deleteArray = req.body
    console.log(deleteArray)
    for(i=0;i<=req.body.length-1;i++){
       

       fs.unlink(deleteArray[i], function (err) {
    if (err) throw err;
    
    console.log('File deleted!');

}); 
    
}

    res.send('Sucessfully deleted images!')

});

router.delete('/folder',jsonParser, async (req, res) => {

directory = 'public/Photos/'+req.body.folder

console.log(directory)
await rimraf(directory, function(err){
	if(err) throw err;
    console.log('done')
})

res.send('Folder was successfully deleted!')

});

router.get('/', async (req, res) => {

    imageCollection = await Image.find({iTitle: req.body.iTitle})



     res.send(imageCollection);

});

router.get('/folders', async (req, res) => {


    folderNames = []
    fs.readdir('public/Photos', function(err, files){
        if (err) throw err;

        
        for(var i in files){
            
            folderNames.push(files[i]);
            
        }
        res.send(folderNames);

    })

    
    

});

router.post('/folderImages', jsonParser,async (req, res) => {
    

    folderImages = []
    fs.readdir('public/Photos/'+req.body.folderName, function(err, files){
        if (err) throw err;

        
        for(var i in files){
            
            folderImages.push(files[i]);
            
        }
      
        res.send(folderImages);

    })

    
    

});



router.post('/spotlight', async (req, res) =>{

    var photos = []
        form = new formidable.IncomingForm();

        

        var spotlight = await Spotlight.findOne({_id: '5bf230ff23d09108f0abbfef'})
 
        spotlight.Title = 'hello'
        




        
       form.on('field', async function (name, value){
        console.log('Got a field:', name, 'Value of field:', value);

        if(name == "spotlightTitle" || name == "Title:"){
            spotlight.Title = value;
            console.log('has the name', name)

        }
        else if (name == "Description:" || name == "spotlightDescription"){
            spotlight.Description = value;
        }
       
       })
       
    form.multiples = true;
    form.uploadDir = path.join(__dirname, 'tmp_uploads');
    
    form.on('file', async function (name, file) {
        console.log('updated spotlightTitle:', spotlight.Title)
        console.log('updated spotlightDescription:', spotlight.Description)
        console.log("name of file form:",name)
        var buffer = null,
            type = null,
            filename = '';
        buffer = readChunk.sync(file.path, 0, 262);
        type = fileType(buffer);
  
        if (type !== null && (type.ext === 'png' || type.ext === 'jpg' || type.ext === 'jpeg')) {
            filename = file.name;
            spotlight.ImageName = filename
            
            fs.rename(file.path,'public/images/home/spotlight/'+filename, (err)=>{
                if (err) throw err;
                console.log('Rename complete')
            });
            photos.push({
                status: true,
                filename: filename,
                type: type.ext,
                publicPath: 'public/images/home/spotlight'
            });
        } else {
            photos.push({
                status: false,
                filename: file.name,
                message: 'Invalid file type'
            });
            fs.unlink(file.path);
        }

        await spotlight.save();
    });

    form.on('error', function(err) {
        console.log('Error occurred during processing - ' + err);

    });
    form.on('end', function() {
        console.log('All the request fields have been processed.');
        
    });
    form.parse(req, function (err, fields, files) {
        res.redirect('/CMS/edit');
    });




 });


router.get('/spotlight', async (req, res) =>{

     var spotlight = await Spotlight.findOne({_id: '5bf230ff23d09108f0abbfef'})

temp = {
    "Title": spotlight.Title,
    "Description": spotlight.Description,
    "ImageName": spotlight.ImageName
}

data = JSON.stringify(temp)

res.send(data)

});


router.post('/news', async (req, res) =>{

    var photos = []
        form = new formidable.IncomingForm();

        

        var news = await Spotlight.findOne({_id: '5bfc52f8f0e5ae42f46be69a'})
    

        console.log('ImageName:',news.ImageName)




        
       form.on('field', async function (name, value){
        console.log('Got a field:', name, 'Value of field:', value);

        if(name == "spotlightTitle" || name == "Title:"){
            news.Title = value;
            console.log('has the name', name)

        }
        else if (name == "Description:" || name == "spotlightDescription"){
            news.Description = value;
        }
       
       })
       
    form.multiples = true;
    form.uploadDir = path.join(__dirname, 'tmp_uploads');
    
    form.on('file', async function (name, file) {
        console.log('updated spotlightTitle:', news.Title)
        console.log('updated spotlightDescription:', news.Description)
        console.log("name of file form:",name)
        var buffer = null,
            type = null,
            filename = '';
        buffer = readChunk.sync(file.path, 0, 262);
        type = fileType(buffer);
  
        if (type !== null && (type.ext === 'png' || type.ext === 'jpg' || type.ext === 'jpeg')) {
            filename = file.name;
            news.ImageName = filename
            
            fs.rename(file.path,'public/images/home/spotlight/'+filename, (err)=>{
                if (err) throw err;
                console.log('Rename complete')
            });
            photos.push({
                status: true,
                filename: filename,
                type: type.ext,
                publicPath: 'public/images/home/spotlight'
            });
        } else {
            photos.push({
                status: false,
                filename: file.name,
                message: 'Invalid file type'
            });
            fs.unlink(file.path);
        }

        await news.save();
    });

    form.on('error', function(err) {
        console.log('Error occurred during processing - ' + err);

    });
    form.on('end', function() {
        console.log('All the request fields have been processed.');
        
    });
    form.parse(req, function (err, fields, files) {
        res.redirect('/CMS/edit');
    });




 });


router.get('/news', async (req, res) =>{

     var spotlight = await Spotlight.findOne({_id: '5bfc52f8f0e5ae42f46be69a'})

temp = {
    "Title": spotlight.Title,
    "Description": spotlight.Description,
    "ImageName": spotlight.ImageName
}

data = JSON.stringify(temp)

res.send(data)

});





module.exports = router;
const {Person} = require('../models/person');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const formidable = require('formidable');
const fileType = require('file-type');
const readChunk = require('read-chunk');
const path = require('path');
const fs = require('fs');
const app = express();

var jsonParser = bodyParser.json();


router.post('/professors', async (req, res) => {
 		var photos = []
        form = new formidable.IncomingForm();

        

        person = new Person({
		Name: 'NA',
		Department: 'NA',
		Office: 'NA',
		Phone: 'NA',
		Email: 'NA',
		Reference: 'NA',
		ImageName: 'NA'
	});
        
        
        




        
       form.on('field', async function (name, value){
        console.log('Got a field:', name, 'Value of field:', value);

        if(name == "professorName" || name == "Name:"){
            person.Name = value;
            console.log('has the name', name)

        }
        else if (name == "professorDepartment" || name == "Department:"){
            person.Department = value;
        }

        else if (name == "professorOffice" || name == "Office:"){
            person.Office = value;
        }

        else if (name == "professorPhone" || name == "Phone:"){
            person.Phone = value;
        }

        else if (name == "professorEmail" || name == "Email:"){
            person.Email = value;
        }

        else if (name == "professorReference" || name == "Reference:"){
            person.Reference = value;
        }
       
       })
       
    form.multiples = true;
    form.uploadDir = path.join(__dirname, 'tmp_uploads');
    
    form.on('file', async function (name, file) {
        console.log('updated professorName:', person.Name)
        console.log('updated professorDepartment:', person.Department)
        console.log("name of file form:",name)
        var buffer = null,
            type = null,
            filename = '';
        buffer = readChunk.sync(file.path, 0, 262);
        type = fileType(buffer);
  
        if (type !== null && (type.ext === 'png' || type.ext === 'jpg' || type.ext === 'jpeg')) {
            filename = file.name;
            person.ImageName = filename
            
            fs.rename(file.path,'public/images/people/professors/'+filename, (err)=>{
                if (err) throw err;
                console.log('Rename complete')
            });
            photos.push({
                status: true,
                filename: filename,
                type: type.ext,
                publicPath: 'public/images/people/professors/'
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

        await person.save();
    });

    form.on('error', function(err) {
        console.log('Error occurred during processing - ' + err);

    });
    form.on('end', function() {
        console.log('All the request fields have been processed.');
        
    });
    form.parse(req, function (err, fields, files) {
        res.redirect('/CMS/professorEdit');
    });




 });


router.get('/professors', async (req, res) =>{

     personCollection = await Person.find( {Phone: {$ne: 'NA'}})
     

res.send(personCollection)

});


router.delete('/professors', async (req, res) => {

professor = await Person.findOne({Name: req.body.Name})
if (!professor) return res.status(400).send('No Professor found to delete');
else{
   professor.delete()
   res.status(200).send('Sucessfully deleted the professor') 
}
console.log(req.body.Name)

professor.delete()




});


router.post('/acmMember', async (req, res) => {
        var photos = []
        form = new formidable.IncomingForm();

        

        person = new Person({
        Name: 'NA',
        Department: 'NA',
        Office: 'NA',
        Phone: 'NA',
        Email: 'NA',
        Reference: 'NA',
        ImageName: 'NA'
    });
      
        
        




        
       form.on('field', async function (name, value){
        console.log('Got a field:', name, 'Value of field:', value);

        if(name == "acmName" || name == "Name:"){
            person.Name = value;
            console.log('has the name', name)

        }
        else if (name == "acmTitle" || name == "Title:"){
            person.Department = value;
        }

        else if (name == "acmMajor" || name == "Major:"){
            person.Office = value;
        }

        else if (name == "acmEmail" || name == "Email:"){
            person.Email = value;
        }
       
       })
       
    form.multiples = true;
    form.uploadDir = path.join(__dirname, 'tmp_uploads');
    
    form.on('file', async function (name, file) {
        console.log('updated acmName:', person.Name)
        console.log('updated acmTitle:', person.Department)
        console.log("name of file form:",name)
        var buffer = null,
            type = null,
            filename = '';
        buffer = readChunk.sync(file.path, 0, 262);
        type = fileType(buffer);
  
        if (type !== null && (type.ext === 'png' || type.ext === 'jpg' || type.ext === 'jpeg')) {
            filename = file.name;
            person.ImageName = filename
            
            fs.rename(file.path,'public/images/people/acm/'+filename, (err)=>{
                if (err) throw err;
                console.log('Rename complete')
            });
            photos.push({
                status: true,
                filename: filename,
                type: type.ext,
                publicPath: 'public/images/people/acm/'
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

        await person.save();
    });

    form.on('error', function(err) {
        console.log('Error occurred during processing - ' + err);

    });
    form.on('end', function() {
        console.log('All the request fields have been processed.');
        
    });
    form.parse(req, function (err, fields, files) {
        res.redirect('/CMS/acmEdit');
    });




 });


router.get('/acmMember', async (req, res) =>{

     personCollection = await Person.find( {$and: [{Phone:'NA'}, {Department:{$ne:'NA'}}]})
     


res.send(personCollection)

});


router.delete('/acmMember', async (req, res) => {

acmMember = await Person.findOne({Name: req.body.Name})
if (!acmMember) return res.status(400).send('No ACM Member found to delete');
else{
   acmMember.delete()
   res.status(200).send('Sucessfully deleted the ACM Member') 
}


acmMember.delete()




});




router.post('/graduates', async (req, res) => {
        var photos = []
        form = new formidable.IncomingForm();

        

        person = new Person({
        Name: 'NA',
        Department: 'NA',
        Office: 'NA',
        Phone: 'NA',
        Email: 'NA',
        Reference: 'NA',
        ImageName: 'NA'
    });
    
        
        




        
       form.on('field', async function (name, value){
        console.log('Got a field:', name, 'Value of field:', value);

        if(name == "graduatesName" || name == "graduatesName:"){
            person.Name = value;
            console.log('has the name', name)

        }
        else if (name == "graduatesMajor" || name == "graduatesMajor:"){
            person.Office = value;
        }

        else if (name == "graduatedDate" || name == "graduatedDate:"){
            person.Email = value;
        }
       
       })
       
    form.multiples = true;
    form.uploadDir = path.join(__dirname, 'tmp_uploads');
    
    form.on('file', async function (name, file) {
        console.log('updated graduatesName:', person.Name)
        console.log('updated graduatesMajor:', person.Department)
        console.log("name of file form:",name)
        var buffer = null,
            type = null,
            filename = '';
        buffer = readChunk.sync(file.path, 0, 262);
        type = fileType(buffer);
  
        if (type !== null && (type.ext === 'png' || type.ext === 'jpg' || type.ext === 'jpeg')) {
            filename = file.name;
            person.ImageName = filename
            
            fs.rename(file.path,'public/images/people/graduates/'+filename, (err)=>{
                if (err) throw err;
                console.log('Rename complete')
            });
            photos.push({
                status: true,
                filename: filename,
                type: type.ext,
                publicPath: 'public/images/people/graduates/'
            });
        } else {
            photos.push({
                status: false,
                filename: file.name,
                message: 'Invalid file type'
            });
            fs.unlink(file.path, function(err){
                if(err) throw err;
                })
        }

        await person.save();
    });

    form.on('error', function(err) {
        console.log('Error occurred during processing - ' + err);

    });
    form.on('end', function() {
        console.log('All the request fields have been processed.');
        
    });
    form.parse(req, function (err, fields, files) {
        res.redirect('/CMS/graduatesEdit');
    });




 });


router.put('/graduates', async (req, res) =>{
       
     personCollection = await Person.find( {$and: [{Department:'NA', Email: req.body.Email}]})
     
   


res.send(personCollection)

});

router.get('/graduates', async (req, res) =>{
        
     personCollection = await Person.find( {Department:'NA'})
     
     
   


res.send(personCollection)

});

router.delete('/graduates', async (req, res) => {

graduate = await Person.findOne( {$and: [{Name: req.body.Name}, {Email: req.body.Email}]})
console.log(req.body)
console.log('deleted',graduate)
if (!graduate) return res.status(400).send('No graduate found to delete');
else{
   graduate.delete()
   res.status(200).send('Sucessfully deleted the graduate') 
}




});

router.get('/graduates/dates', async (req,res) =>{

graduate = await Person.find({"$expr": { "$lt": [ { "$strLenCP": "$Email" }, 5 ] } },{_id: 0, Email: 1})
if (!graduate) return res.status(400).send('Nothing found');


res.send(graduate)

});

router.put('/checkDB', async (req,res) => {


    person = await Person.findOne({"Name" : {$regex : ".*"+req.body.Name+".*"}});
});





module.exports = router;
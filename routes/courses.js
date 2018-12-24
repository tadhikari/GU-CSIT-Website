const {Course} = require('../models/coursesModel');

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


const app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonParser = bodyParser.json()

router.post('/', jsonParser, async (req, res) => {  //Recieves JSON from courseEdit.js and creates new course and stores into database.

	course = new Course({
		Department: 'NA' ,
		Code: 'NA',
		Title: 'NA',
		Description: 'NA' 


	})

	course.Department = req.body.Department;
	course.Code = req.body.Code;
	course.Title = req.body.Title;
	course.Description = req.body.Description;
	




	course.save();

	res.send('Course successfully created!')
	


});



router.get('/', async(req,res) => {   //Get courses in order by course_code

	courses = await Course.find().sort({Code: 1})



	res.send(courses)


});


router.delete('/', async (req, res) => {    //Delete Course Route

courses = await Course.findOne({Code: req.body.Code})
if (!courses) return res.status(400).send('No course found to delete');
else{
   courses.delete()
   res.status(200).send('Sucessfully deleted the course') 
}


courses.delete()



});





module.exports = router;
const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();




const imageSchema = new mongoose.Schema({
	iTitle: {
	type: String, required: true,
	minlength: 5,
	maxlength: 200 },
	iFolder: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 200
	},
	iPath: {
		type: String,
		minlength: 1,
		maxlength: 1000 
	},
	
	dateCreated: { type: Date, default: Date.now},
});

// var postsSchema = new mongoose.Schema({})

const Image = mongoose.model('Image', imageSchema);

	//<---! Validate Post ! --->

function validateImage(image){
	const schema = {
		iTitle: Joi.string(),
		iFolder: Joi.string(),
		iPath: Joi.string(),
		
	};

	return Joi.validate(image, schema);
}


// function validateNewPost(post){
// 	const schema = {
// 		pTitle: Joi.string(),
// 		pBody: Joi.string(),
// 		pDate: Joi.string(),
// 		pLocation: Joi.string(),
// 		published: Joi.Boolean(),
		
// 	};

// 	return joi.validate(post, schema2);
// }

 exports.Image = Image;
 exports.validate = validateImage;
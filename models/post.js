const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();




const postSchema = new mongoose.Schema({
	pTitle: {
	type: String, required: true,
	minlength: 1,
	maxlength: 100 },
	pBody: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 10000
	},
	published: {
		type: Boolean,
	},
	pLocation: {
	type: String,
	minlength: 1,
	maxlength: 100 },

	pDate: { type: Date},
	dateCreated: { type: Date, default: Date.now},
});

const Post = mongoose.model('Post', postSchema);

	//<---! Validate Post ! --->

function validatePost(post){
	const schema = {
		pTitle: Joi.string(),
		pBody: Joi.string(),
		pDate: Joi.string(),
		pLocation: Joi.string(),
		published: Joi.boolean()
		
	};
	return Joi.validate(post, schema);
}

exports.Post = Post;
exports.validate = validatePost;
const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();




const pageschema = new mongoose.Schema({

Title: {
	type: String, required: true,
	minlength: 1,
	maxlength: 100 },

Description: {
	type: String, 
	minlength: 1,
	maxlength: 10000 },

ImageRatio: {
	type: Number,
},

ImageSrc: {
	type: String, 
	minlength: 1,
	maxlength: 1000 },
	
});

const Page = mongoose.model('Page', pageschema);



exports.Page = Page;

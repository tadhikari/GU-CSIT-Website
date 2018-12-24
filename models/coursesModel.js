const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();




const courseschema = new mongoose.Schema({
	Department: {
	type: String, required: true,
	minlength: 1,
	maxlength: 100 },
	Code: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 100
	},
	Title: {
	type: String,
	minlength: 1,
	maxlength: 100 },

	Description: {
	type: String,
	minlength: 1,
	maxlength: 10000 },
	
});

const Course = mongoose.model('Course', courseschema);


exports.Course = Course;

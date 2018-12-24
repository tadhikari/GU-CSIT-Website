const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();




const visitorschema = new mongoose.Schema({
	Title: {
	type: String, required: true,
	minlength: 1,
	maxlength: 100 },
	Number: {
		type: Number,
		
	},
});

const Visitor = mongoose.model('Visitors', visitorschema);


exports.Visitor = Visitor;

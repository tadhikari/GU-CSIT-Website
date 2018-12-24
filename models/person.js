const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');





const personschema = new mongoose.Schema({
	Name: {
	type: String, required: true,
	minlength: 1,
	maxlength: 100 },

	Department: {
		type: String, required: true,
	minlength: 1,
	maxlength: 100
	},

	Office: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 1000
	},
	Phone: {
	type: String,
	minlength: 1,
	maxlength: 100 },

	Email: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 100
	},

	Reference: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 1000
	},

	ImageName: {
		type: String,
		required: true,
		minlength: 1,
		maxlength: 1000
	},
}

);

const Person = mongoose.model('Person', personschema);



exports.Person = Person;

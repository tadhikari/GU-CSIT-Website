const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();




const timelineschema = new mongoose.Schema({
	Events: {
		type: Array
	 },
	
});

const Timeline = mongoose.model('Timeline', timelineschema);



exports.Timeline = Timeline;

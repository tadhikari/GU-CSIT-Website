
const {Timeline} = require('../models/timelineModel');

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


const app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonParser = bodyParser.json()

router.post('/', jsonParser, async (req, res) => {

	timeline = await Timeline.findOne({_id: "5c00db7a109513308837a42f"})
	
	timeline.Events = req.body.Events
	console.log(req.body.Events)

	await timeline.save()


});



router.get('/', async(req,res) => {

	timeline = await Timeline.findOne({_id: "5c00db7a109513308837a42f"})



	res.send(timeline)


});

router.delete('/', async(req,res) => {

	timeline = await Timeline.findOne({_id: "5c00db7a109513308837a42f"});
	timline.Events = [];

	await timeline.save();

})





module.exports = router;
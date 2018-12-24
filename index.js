const {Visitor} = require('./models/visitorModel');
const config = require('config')
const cookieParser = require('cookie-parser')
const authorize = require('./middleware/auth')
const admin = require('./middleware/admin')
const mongoose = require('mongoose');
const users = require('./routes/users');
const express = require('express');
const bodyParser = require('body-parser');
const auth = require('./routes/auth');
const posts = require('./routes/posts');
const persons = require('./routes/persons');
const timeline = require('./routes/timeline');
 const gallery = require('./routes/images')
 const contact = require('./routes/contact');
 const pages = require('./routes/pages');
 const courses = require('./routes/courses');
 var path = require('path');
const app = express();

var mongodb = 'mongodb://Nick:Fury2442@ds115244.mlab.com:15244/csit_website'

mongoose.connect(mongodb,{ useNewUrlParser: true}
	)
.then(() => console.log('Connected to MongoDB...'))
.catch(err=> console.error('Could not connect to MongoDB'));







app.use(express.static(path.join(__dirname, 'View')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express.json());
app.use('/api/users', users);
app.use('/api/timeline', timeline);
app.use('/api/contact', contact);
app.use('/api/pages', pages);
app.use('/api/courses', courses);

app.use('/api/auth', auth);
app.use('/api/posts', posts);
app.use('/api/images', gallery);
app.use('/api/persons', persons);

;
app.get('/', async (req, res) => {
	userCount = await Visitor.findOne({Title:"Visitors"})
	userCount.Number += 1

	await userCount.save()
	
	res.sendFile(path.join(__dirname, "View", "index(CSIT).html"));
	

});

app.get('/CMS', authorize, (req, res) => {
	
	res.sendFile(path.join(__dirname, "View", "index(CMS).html"));


});

app.get('/CMS/pages', authorize, (req, res) => {
	
	res.sendFile(path.join(__dirname, "View", "pages.html"));
	

});

app.get('/CMS/posts', authorize, (req, res) => {
	
	res.sendFile(path.join(__dirname, "View", "posts.html"));
	

});

app.get('/CMS/users', authorize, (req, res) => {
	
	res.sendFile(path.join(__dirname, "View", "users.html"));
	

});

app.get('/CMS/gallery', authorize, (req, res) => {
	
	res.sendFile(path.join(__dirname, "View", "gallery(CMS).html"));
	
});

app.get('/CMS/login', (req, res) => {
	
	res.sendFile(path.join(__dirname, "View", "login.html"));


});

app.get('/CMS/register', [authorize,admin], (req, res) => {
	
	res.sendFile(path.join(__dirname, "View", "register.html"));
	

});

app.get('/CMS/edit', authorize, (req,res) => {

	res.sendFile(path.join(__dirname, "View", "edit.html"));
	

});

app.get('/CMS/professorEdit', authorize, (req,res) => {

	res.sendFile(path.join(__dirname, "View", "professorEdit.html"));
	

});

app.get('/CMS/acmEdit', authorize, (req,res) => {

	res.sendFile(path.join(__dirname, "View", "acmEdit.html"));


});

app.get('/CMS/academicsEdit', authorize, (req,res) => {

	res.sendFile(path.join(__dirname, "View", "academicsEdit.html"));


});

app.get('/CMS/graduatesEdit', authorize, (req,res) => {

	res.sendFile(path.join(__dirname, "View", "graduatesEdit.html"));


})

app.get('/CMS/aboutEdit', authorize, (req,res) => {

	res.sendFile(path.join(__dirname, "View", "aboutEdit.html"));


})

app.get('/CMS/contactEdit', authorize, (req,res) => {

	res.sendFile(path.join(__dirname, "View", "contactEdit.html"));


})

app.get('/events', async (req, res) => {
	
	res.sendFile(path.join(__dirname, "View", "events.html"));


});

app.get('/gallery', async (req, res) => {
	
	res.sendFile(path.join(__dirname, "View", "gallery.html"));


});

app.get('/professors', async (req, res) => {
	
	res.sendFile(path.join(__dirname, "View", "professors.html"));
	

});

app.get('/about', async (req, res) => {
	
	res.sendFile(path.join(__dirname, "View", "about.html"));

});

app.get('/contact', async (req, res) => {
	
	res.sendFile(path.join(__dirname, "View", "contact.html"));

});

app.get('/academics', async (req, res) => {
	
	res.sendFile(path.join(__dirname, "View", "academics.html"));

});

app.get('/acm', async (req,res) => {

	res.sendFile(path.join(__dirname, "View", "acm.html"))

});


app.get('/graduates', async (req,res) => {

	res.sendFile(path.join(__dirname, "View", "graduates.html"))

});














const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));



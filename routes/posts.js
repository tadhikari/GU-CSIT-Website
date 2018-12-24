const {Post, validate} = require('../models/post');


const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const createHTML = require('create-html');

const app = express();

var jsonParser = bodyParser.json()
router.post('/', async (req, res) => {
console.log(req.body)
	

	const {error} = validate(req.body);

	if (error) return res.status(400).send(error.details[0].message);

	var post = await Post.findOne({pTitle: req.body.pTitle});
	if (post) return res.status(400).send('Page already created');


	post = new Post({
		pTitle: req.body.pTitle,
		pBody: req.body.pBody,
		pDate: req.body.pDate,
		pLocation: req.body.pLocation
	});

	
	await post.save();

	res.send(post);

});


router.delete('/:id',jsonParser, async (req, res) => {
	const {error} = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	var post = await Post.findOne({pTitle: req.body.pTitle});
	if (!post) return res.status(400).send('No page found to delete');


	await Post.remove({
		pTitle: req.params.id.toString()
	})


	res.send('Post successfully deleted');

});
//)
router.get('/', async (req, res) => {

	var start = new Date();
	var end = new Date();
	start.setHours(0,0,0,0);
	end.setHours(23,59,59,999);
	
	
	postCollection = await Post.find({pDate: {$gte: start}}).sort({pDate: 1})





	 res.send(postCollection);

});

router.get('/archive', async (req, res) =>{
	pCollection = await Post.find().sort({pDate: -1})

	res.send(pCollection);
});


router.get('/:id', async (req, res) => {
	var post = await Post.findOne({pTitle: req.params.id.toString()})
	if (!post) return res.status(404).send('Post not found');




	var html = createHTML({
		title: post.Title,
		css: ["https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css", "../../../css/home.css", "https://fonts.googleapis.com/css?family=Oswald",
		 "../../../css/style1.css"],
		 script: ["https://code.jquery.com/jquery-3.2.1.slim.min.js", "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js",
		  "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js", "../../../js/design.js" ],
		head: '<meta name="viewport" content="width=device-width, initial-scale=1"> <link rel="shortcut icon" type="image/x-icon" href="../../../images/miscellaneous/site-icon.ico"/>',
		body: 
		`<header>
		<nav id='header-nav' class='navbar mini_nav'>
			<div class="container-fluid mini_nav">
				<div id='main-menu' class="container mini_nav">
					<div id="nav-button-container">
						<span id="nav-toggle-tile"></span>
					</div>
					<a id="navbar-logo-link" href="/">
					<div id="logo-container" class="">
						<div class="container" id="logo"></div>
						<div id="logo-text" class="container"><p>Graceland</p><p>Computer Science</p></div>
					</div>
					</a>
					<!-- <div></div> -->
				</div>
			</div>
		</nav>
	</header>`+
'	<div class="hidden" id="slide-nav-menu">' +
		'<div>' +
			'<li class="side-nav-option"><span>Menu</span></li>' +
			'<hr>' +
			'<a href="/about"><li class="side-nav-option side-nav-link"><span>About</span></li></a>' +
			'<hr>' +
			'<a href="/academics"><li class="side-nav-option side-nav-link"><span>Academics</span></li></a>' +
			'<hr>	' +
			'<a href="/professors"><li class="side-nav-option side-nav-link"><span>Faculty</span></li></a>' +
			'<hr>' +
			'<a href="/events"><li class="side-nav-option side-nav-link"><span>Events</span></li></a>' +
			'<hr>' +
			'<a href="/contact"><li class="side-nav-option side-nav-link"><span>Contact</span></li></a>' +
			'<hr>' +
			'<a href="/gallery"><li class="side-nav-option side-nav-link"><span>Gallery</span></li></a>' +
			'<hr>' +
			'<a href="/acm"><li class="side-nav-option side-nav-link"><span>ACM Club</span></li></a>' +
			'<hr>' +
			'<a href="/graduates"><li class="side-nav-option side-nav-link"><span>Graduates</span></li></a>' +
			'<hr>' +
		'</div>' +
	'</div>' +
'	' +
'	<section id="main-content">' +
'		<div id="image_slider" class="jumbotron main-image" style="background: url(\'../../../images/pages/' +'csitBackground.jpg'+'\')  no-repeat;' + 
' background-Position: 0% 40%; background-size: cover;">' +'</div>' + 
'		<div class="container-fluid">' +
'			<div class="container">' +
'				<br><h2 class="page-header d-flex justify-content-center">'+post.pTitle+'</h2><br>' +
'				<br><p id="about-text">' +post.pBody +'</p><br><br><br>' +

'	</section>' +
'	' +
 `<footer>
		<div class="container-fluid">
			<div class="container">
				<div class="row">
					<div class="col-lg-4 col-md-4 footer-grid">
						<div class="container">
							<div class="footer-grid-header">About Graceland</div>
							<div class="footer-grid-body">
								<a href="https://www.graceland.edu/admissions" target="_blank">Admissions</a><br>
								<a href="https://www.graceland.edu/financial-aid" target="_blank">Financial Aid</a><br>
								<a href="https://www.graceland.edu/news-events/news" target="_blank">News</a><br>
								<a href="https://www.graceland.edu/academics/undergraduate-programs" target="_blank">Undergraduate</a><br>
							</div>
						</div>
					</div>
					<div class="col-lg-4 col-md-4 footer-grid">
						<div class="container">
							<div class="footer-grid-header">Contact Us</div>
							<div class="footer-grid-body">
								<a href="tel: +6417845175">Phone: 641-569-7855</a><br>
								<a href="mailto: csit@graceland.edu">Email: csit@graceland.edu</a><br>
								<a href="tel: +6417845175">Fax: 641-784-5175</a><br>
								<a href="#">Location: 1 University Pl, Lamoni, IA</a><br>
							</div>
						</div>
					</div>
					<div class="col-lg-4 col-md-4 footer-grid">
						<div class="container">
							<div class="footer-grid-header"></div>
							<div class="footer-grid-body">
								<a href="https://www.graceland.edu/" target="_blank"><img src="../../../images/miscellaneous/graceland-university-ft-logo.png" height="75" width="250" alt="graceland logo"></a>
							</div>
							<div class="footer-copyright text-center py-3 " id="creators">Website created by Nicholas Salazar and Tribikram Adhikari, class of 2018</div>
						</div>
					</div>
					</div>
				</div>
		</div>
	</footer>` 
	})








	return res.end(html);

});



router.put('/:id', async (req, res) => {
	const {error} = validate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

	var post = await Post.findOne({pTitle: req.body.pTitle});
	if (!post) return res.status(400).send('No page found to update');


	await Post.update({
		pTitle: req.body.pTitle,
		pBody: req.body.pBody,
		pDate: req.body.pDate
	})


	res.send('Post successfully updated');

});






module.exports = router;

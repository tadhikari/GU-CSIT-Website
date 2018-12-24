const nodemailer = require('nodemailer')

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


const app = express();

var jsonParser = bodyParser.json()

router.post('/', async (req,res)=> {

form = req.body


outputHTML = `<p>You have a new contact request</p>

<h3>Contact Details</h3>

<ul>
	<li>Name: ${form.Name}</li>
	<li>Email: ${form.Email}</li>
</ul>
<h3>Message</h3>
<p>${form.Message}</p>
`;




console.log('name', form.Name)
console.log('email', form.Email)
console.log('subject', form.Subject)
console.log('message', form.Message)


    
    let transporter = nodemailer.createTransport({
        service: 'gmail',
         
        auth: {
            user: 'CSITNodeMailer@gmail.com', 
            pass: 'Fury3443' 
        }
    });




var mailOptions = {
	from: '"'+form.Name+'"<'+form.Email+'>',
	to: 'brunner@graceland.edu',
	subject: form.Subject,
	html: outputHTML,
};

transporter.sendMail(mailOptions, (error, info) => {
	if (error) {
		return console.log(error);
	}

	console.log('Message sent: %s', info.messageId);
})



});



module.exports = router;


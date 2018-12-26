# Graceland University's Computer Science Department Website
## Website for Graceland University's Computer Science Department

This website is deployed and live on http://csit.graceland.edu

The front-end implements Bootstrap 4 and Jquery while the back-end implements Node.js and MongoDB

To run the website locally on your machine, download the website. You need to have Node.js installed on your machine. Using the terminal switch to the directory of the project and run `npm install`. This will install all the required dependencies for the project. After that, you can run `node index.js` to run the website locally on your machine. by default the website is hosted on http://localhost:3000

The backend uses the following modules for the corresponding operations:

bcrypt: Encrypt the saved passwords when creating new users and authenticating current users.
body-parser: Helps with parsing JSON files from the ajax requests.
config: Helps with deployment
cookie-parser: Reads and parses jsonwebtokens that are stored in the browser's cookies.
create-html: Generates new html pages by following a template, used for all posts.
express: One of the main components to the backend, provides access to all router functions and server-side scripting management.
file-type: Used for filtering images and ensuring valid file types of uploaded images from the CMS.
formidable: Helps manage all forms sent from the javascript.
joi: Validates username, email and password fields for logging in. Also provides validation to some of the mongoose models.
jsonwebtoken: Used to authenticate and provide users access to the CMS after successfully logging in.
mkdirp: Used to easily make new directories
mongoose: Used to create mongoose models that can interact with MongoDB, one of the main modules and is necessarry for MongoDB connection.
multer: Helps process images sent from the CMS uploads.
nodemailer: Used for sending the information submitted from the contact page to the recipient specified.
nodemon: Used for updating changes and troubleshooting code.
rimraf: Deleting directories.



***Note: You will not need to install MongoDB on your machine for this project to run as the database used by this website is hosted on the cloud. Another thing to note is that you might run into a version error while trying to run the website. This is caused by the bcrypt module and can be solved by using the command `npm install bcrypt` independently.***


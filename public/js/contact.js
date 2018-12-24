function sendContactInfo(){
var name = document.getElementById("name").value;
var email = document.getElementById("email").value;
var subject = document.getElementById("subject").value;
var message = document.getElementById("message").value;
const xhttp =  new XMLHttpRequest();


temp = {
    "Name": name.toString(),
    "Email": email.toString(),
    "Subject": subject.toString(),
    "Message": message.toString(),
    
}

data = JSON.stringify(temp)

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 400) {
      alert(this.responseText);
    }
    else if (this.readyState == 4 && this.status == 200){
        alert('Message successfully sent!');
        }
};
xhttp.open("POST", "/api/contact",true);
xhttp.setRequestHeader('Content-Type', 'application/JSON');
xhttp.send(data)


}

function getDescriptionPicture(){

const xhttp =  new XMLHttpRequest();


temp = {
  Title: 'Contact'
}

data = JSON.stringify(temp);



xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 400) {
      alert('Failed to get information from server');
    }
    else if (this.readyState == 4 && this.status == 200){
    var serverRes = JSON.parse(this.responseText);
    
    document.getElementById("image_slider").style.background = 'url(\'../images/pages/' +serverRes.ImageSrc+'\')  no-repeat '

     document.getElementById("image_slider").style.backgroundSize = 'cover';
     document.getElementById("image_slider").style.backgroundPosition = '0% '+ serverRes.ImageRatio.toString()+'%'

 
   
        

        }
};
xhttp.open("PUT", "/api/pages", true);
xhttp.setRequestHeader('Content-Type', 'application/JSON');

xhttp.send(data)


}

getDescriptionPicture();


myEvents = [];

function getDescriptionPicture(){

const xhttp =  new XMLHttpRequest();


temp = {
  Title: 'About'
}

data = JSON.stringify(temp);



xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 400) {
      alert('Failed to get information from server');
    }
    else if (this.readyState == 4 && this.status == 200){
    var serverRes = JSON.parse(this.responseText);
    
    document.getElementById("image_slider").style.background = 'url(\'../images/pages/' +serverRes.ImageSrc+'\')  no-repeat '
    document.getElementById("image_slider").style.backgroundSize = '100% auto';
    document.getElementById("image_slider").style.backgroundPosition = '0% '+ serverRes.ImageRatio.toString()+'%'
     document.getElementById('about-text').innerHTML = serverRes.Description;
     

 
   
        

        }
};
xhttp.open("PUT", "/api/pages", true);
xhttp.setRequestHeader('Content-Type', 'application/JSON');

xhttp.send(data)


}

getDescriptionPicture();
function getTimeline(){

const xhttp =  new XMLHttpRequest();




xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 400) {
      alert('Failed to get information from server');
    }
    else if (this.readyState == 4 && this.status == 200){
    var serverRes = JSON.parse(this.responseText);

    myEvents = serverRes.Events;
   
    
        

        }
};
xhttp.open("GET", "/api/timeline", true);

xhttp.send();


}

getTimeline();


function generateTimeline(){




$('#my-timeline').roadmap(myEvents);
var width = $('#my-timeline').width()
document.getElementsByClassName('next')[0].style.left = -((width-55)/2)+'px'

}
setTimeout(generateTimeline, 500);


setInterval(function(){


var width = $('#my-timeline').width()
var height = $('#my-timeline').height()
try {
document.getElementsByClassName('next')[0].style.left = -((width-55)/2)+'px'
}
catch(err){}
try{
  document.getElementsByClassName('prev')[0].style.left = ((width-100)/2)+'px'
  document.getElementsByClassName('prev')[0].style.top = ((height-200)/2)+'px'
}
catch(err){}

},100);
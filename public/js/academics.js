

function getDescriptionPicture(){

const xhttp =  new XMLHttpRequest();


temp = {
  Title: 'Academics'
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
function getCourses(){

    const xhttp =  new XMLHttpRequest();




xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 400) {
      alert(this.responseText);
      
    }
    else if (this.readyState == 4 && this.status == 200){
        serverRes = JSON.parse(this.responseText);

         for(i=0;i<=serverRes.length-1;i++){
            $('<div class="courses-container col-lg-12">' +
                         ' <div>' +
                            '<span class="course-Department" id="'+serverRes[i].Title+ '">'+serverRes[i].Department+' </span>' +
                            '<span class="course-Code">'+serverRes[i].Code+'</span>' +
                              '<h5 class="course-Title">'+serverRes[i].Title+'</h5>' +
                              '<p class="course-Description">'+serverRes[i].Description+'</p>' +
                              
                              '</p>' +
                            '</div>'+
                          '</div>' +
                        '</div>'
        ).appendTo("#course-list");

        
        
      
        



         }

            };

};

xhttp.open("GET", "/api/courses", true);

xhttp.send();

}
getCourses();

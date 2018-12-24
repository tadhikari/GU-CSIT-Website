function getACMMembers(){

    const xhttp =  new XMLHttpRequest();




xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 400) {
      alert(this.responseText);
      
    }
    else if (this.readyState == 4 && this.status == 200){
        serverRes = JSON.parse(this.responseText);

         for(i=0;i<=serverRes.length-1;i++){
            $('<div class="person-picture-container col-lg-6">' +
                         ' <div>' +
                            '<div class="person-picture" id="'+serverRes[i].Name+'"></div>' +
                            '<div class="person-description">' +
                              '<h5 class="person-name">'+serverRes[i].Name+'</h5>' +
                              '<p class="person-title">'+serverRes[i].Department+'</p>' +
                              '<p class="rest-information">' +
                                '<span class="office-location">Major: '+serverRes[i].Office+'</span><br>' +
                                '<span class="">Email: <a href="mailto:' +serverRes[i].Email +'">' +serverRes[i].Email +'</a></span><br>' +
                              '</p>' +
                            '</div>'+
                          '</div>' +
                        '</div>'
        ).appendTo("#faculty-pictures");

        document.getElementById(serverRes[i].Name).style.background = 'url(\'../images/people/acm/' +serverRes[i].ImageName+'\')  no-repeat ';
        document.getElementById(serverRes[i].Name).style.backgroundSize = '100% auto'
      
        



         }

            };

};

xhttp.open("GET", "/api/persons/acmMember", true);

xhttp.send();

}
getACMMembers();

function getDescriptionPicture(){

const xhttp =  new XMLHttpRequest();


temp = {
  Title: 'ACM'
}

data = JSON.stringify(temp);



xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 400) {
      alert('Failed to get information from server');
    }
    else if (this.readyState == 4 && this.status == 200){
    var serverRes = JSON.parse(this.responseText);
    
    document.getElementById("professor-jumbotron").style.background = 'url(\'../images/pages/' +serverRes.ImageSrc+'\')  no-repeat '
  
     document.getElementById('about-the-acm-club').innerHTML = serverRes.Description;
     document.getElementById("professor-jumbotron").style.backgroundPosition = '0% '+ serverRes.ImageRatio.toString()+'%'
     document.getElementById("professor-jumbotron").style.backgroundSize = 'cover';

 
   
        

        }
};
xhttp.open("PUT", "/api/pages", true);
xhttp.setRequestHeader('Content-Type', 'application/JSON');

xhttp.send(data)


}

getDescriptionPicture();
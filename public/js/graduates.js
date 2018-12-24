year = '2019'
yearFilter = []
function changeBtn(newName){
 btn = document.getElementById("dropdownButton");
 btn.innerHTML = newName;



}

function getDates(){

const xhttp =  new XMLHttpRequest();




xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 400) {
      alert(this.responseText);
    }
    else if (this.readyState == 4 && this.status == 200){

       serverRes = JSON.parse(this.responseText);

      
    
      for(i=0; i<=serverRes.length-1;i++){
        
        if(i==serverRes.length-1){
         
          getGraduates(serverRes[serverRes.length-1].Email.toString());
          document.getElementById("dropdownButton").innerHTML = serverRes[serverRes.length-1].Email.toString()
          
          
        }
        else{
          if (yearFilter.includes(serverRes[i].Email.toString()) == false){
            yearFilter.push(serverRes[i].Email.toString())
          
        $('<a class="dropdown-item" href="#/" onclick="getGraduates(\''+serverRes[i].Email.toString()+'\');changeBtn(\''+serverRes[i].Email.toString()+'\')" >'+ serverRes[i].Email.toString()+'</a>'
        ).appendTo("#folderSelect");

        
          }
          else{
            continue
          }
       }

      }


         }
};
xhttp.open("GET", "/api/persons/graduates/dates", true);

xhttp.send();


}
getDates();

function getGraduates(year){


  parentDiv = document.getElementById("graduates")
  deleteDiv = document.getElementById("graduates-pictures")

  parentDiv.removeChild(deleteDiv);

  $('<div id="graduates-pictures" class="centered row"></div>').appendTo(parentDiv)

    const xhttp =  new XMLHttpRequest();


temp={
  Email: year
}

data = JSON.stringify(temp)

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
                              '<p class="rest-information">' +
                                '<br><span class="office-location">Major(s): '+serverRes[i].Office+'</span><br>' +
                                '<br><span class="">Graduated: ' +serverRes[i].Email +'</span><br>' +
                              '</p>' +
                            '</div>'+
                          '</div>' +
                        '</div>'
        ).appendTo("#graduates-pictures");

        document.getElementById(serverRes[i].Name).style.background = 'url(\'../images/people/graduates/' +serverRes[i].ImageName+'\')  no-repeat ';
        document.getElementById(serverRes[i].Name).style.backgroundSize = '100% 100%'

        
    
        



         }

            };

};

xhttp.open("PUT", "/api/persons/graduates", true);
xhttp.setRequestHeader('Content-Type', 'application/JSON');

xhttp.send(data);

}


function getDescriptionPicture(){

const xhttp =  new XMLHttpRequest();


temp = {
  Title: 'Graduates'
}

data = JSON.stringify(temp);



xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 400) {
      alert('Failed to get information from server');
    }
    else if (this.readyState == 4 && this.status == 200){
    var serverRes = JSON.parse(this.responseText);
 
    document.getElementById("professor-jumbotron").style.background = 'url(\'../images/pages/' +serverRes.ImageSrc+'\')  no-repeat '
     document.getElementById("professor-jumbotron").style.backgroundSize = 'cover';
     document.getElementById("professor-jumbotron").style.backgroundPosition = '0% '+ serverRes.ImageRatio.toString()+'%'

 
   
        

        }
};
xhttp.open("PUT", "/api/pages", true);
xhttp.setRequestHeader('Content-Type', 'application/JSON');

xhttp.send(data)


}

getDescriptionPicture();
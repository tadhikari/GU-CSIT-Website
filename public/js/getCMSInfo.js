function getPosts(){

const xhttp =  new XMLHttpRequest();




xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 400) {
      alert(this.responseText);
    }
    else if (this.readyState == 4 && this.status == 200){
    	 serverRes = JSON.parse(this.responseText);
         document.getElementById("postNumbers").innerHTML = ' '+ serverRes.length;
    }
};
xhttp.open("GET", "/api/posts", true);

xhttp.send()


}
getPosts()


function getUsers(){

const xhttp =  new XMLHttpRequest();




xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 400) {
      alert('Failed to get information from server');
    }
    else if (this.readyState == 4 && this.status == 200){
        var serverRes =JSON.parse(this.responseText);
        document.getElementById("userNumbers").innerHTML = ' ' + serverRes.length;


        }
};
xhttp.open("GET", "/api/users", true);

xhttp.send()


}
getUsers();


function getVisitorCount(){

const xhttp =  new XMLHttpRequest();




xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 400) {
      alert(this.responseText);
    }
    else if (this.readyState == 4 && this.status == 200){
       serverRes = JSON.parse(this.responseText);
      
         document.getElementById("visitorNumbers").innerHTML = " " + serverRes.Number;
    }
};
xhttp.open("GET", "/api/pages/Visitors", true);

xhttp.send()

}
getVisitorCount();
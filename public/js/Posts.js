


function deletePost(Post){

    temp = {
        pTitle: Post
    }

    data = JSON.stringify(temp);
    
    const xhttp = new XMLHttpRequest()
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 400) {
      alert(this.responseText);
    }
    else if (this.readyState == 4 && this.status == 200){
        alert(this.responseText);
        location.reload()
        }
    };

    

    xhttp.open("DELETE", '/api/posts/'+ Post.toString(),true)
    xhttp.setRequestHeader('Content-Type', 'application/JSON');
    xhttp.send(data)
}

function sendPostInfo(){
var title = document.getElementById("inputPageTitle").value;
var body = document.getElementById("inputPageBody").value;
var date = document.getElementById("inputPageDate").value;
var pLocation = document.getElementById("inputPageLocation").value;
const xhttp =  new XMLHttpRequest();


temp = {
    "pTitle": title.toString(),
    "pBody": body.toString(),
    "pDate": date.toString(),
    "pLocation": pLocation.toString(),
    "published": true,
    
}

data = JSON.stringify(temp)
console.log(temp)
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 400) {
      alert(this.responseText);
    }
    else if (this.readyState == 4 && this.status == 200){
        alert('Page successfully created!') //Change the location to appropriate domain
        }
};
xhttp.open("POST", "/api/posts",true);
xhttp.setRequestHeader('Content-Type', 'application/JSON');
xhttp.send(data)

}





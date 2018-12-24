currentUserName = '';
function getUserName(){

const xhttp =  new XMLHttpRequest();




xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 400) {
      alert('Failed to get information from server');
    }
    else if (this.readyState == 4 && this.status == 200){
        var serverRes =JSON.parse(this.responseText);
        currentUserName = serverRes.name;

        

        }
};
xhttp.open("GET", "/api/users/me", true);

xhttp.send()


}


getUserName();
    

function deleteUser(User){
 if (User == currentUserName){
        alert('You cannot delete yourself!')
    }
    else{
if (confirm("Are you sure you want to delete the user?")){
   
	 temp = {
        name: User,
        password: '1234567',
        email: 'anyemail@gmail.com'
    };

    data = JSON.stringify(temp);
    
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 400) {
      alert(this.responseText);
    }
    else if (this.readyState == 4 && this.status == 200){
        alert(this.responseText);
        location.reload();

        }
    };

    

    xhttp.open("DELETE", '/api/users/'+ User.toString(),true);
    xhttp.setRequestHeader('Content-Type', 'application/JSON');
    xhttp.send(data)
}
}
}
function getUsers(){

const xhttp =  new XMLHttpRequest();




xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 400) {
      alert('Failed to get information from server');
    }
    else if (this.readyState == 4 && this.status == 200){
    	var serverRes =JSON.parse(this.responseText);
    	var x = document.getElementById("usersTable");
    	k = 0
    	for(i=0; i<=serverRes.length-1;i++){
    		k = x.insertRow(i+1)
    		cell1 = k.insertCell(0)
    		cell2 = k.insertCell(1)
    		cell3 = k.insertCell(2)
            cell4 = k.insertCell(3)
    		cell1.innerHTML = serverRes[i].name.toString();
    		cell2.innerHTML = serverRes[i].email.toString();
            cell3.innerHTML = serverRes[i].adminPrivilege.toString();
            if(serverRes[i].name == currentUserName){
                cell4.innerHTML = serverRes[i].dateCreated.toString().slice(0,10) +
'         '+ '<a class="btn btn-danger" type="button" onclick="deleteUser(\''+serverRes[i].name+'\')" disabled>Delete</a>';
            }
            else{
cell4.innerHTML = serverRes[i].dateCreated.toString().slice(0,10) +
'         '+ '<a class="btn btn-danger" type="button" onclick="deleteUser(\''+serverRes[i].name+'\')" />Delete</a>';
}
    		
    	 // document.getElementById("userNumbers").innerHTML = (serverRes.length)
    	
    	 

    	}

    	



        }
};
xhttp.open("GET", "/api/users", true);

xhttp.send()


}
getUsers();




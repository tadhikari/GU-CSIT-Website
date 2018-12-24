var serverRes ={}
function getPosts(){

const xhttp =  new XMLHttpRequest();




xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 400) {
      alert(this.responseText);
    }
    else if (this.readyState == 4 && this.status == 200){
    	 serverRes = JSON.parse(this.responseText);
    	var x = document.getElementById("postsTable(CMS)");
    	k = 0
        

    	for(i=0; i<=serverRes.length-1;i++){
    		k = x.insertRow(i+1);

    		cell1 = k.insertCell(0);
            cell2 = k.insertCell(1);
            cell3 = k.insertCell(2);

            //Format Date
            formatedDate = new Date(serverRes[i].pDate.toString());
            date = formatedDate.toLocaleDateString();
            time = formatedDate.toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
            Dateformated = date + ' ' + time;
           


    		cell1.innerHTML = serverRes[i].pTitle.toString();
    		cell2.innerHTML = Dateformated;
            //Change href link to the page of the post//
           temp = JSON.stringify(serverRes[i]);
cell3.innerHTML = serverRes[i].dateCreated.toString().slice(0,10) +'      '+'<a class="btn btn-danger" type="button" onclick="deletePost(\'' +serverRes[i].pTitle+'\')" />Delete</a>';
       
    	 

    	}


        }
};
xhttp.open("GET", "/api/posts", true);

xhttp.send()


}
getPosts()

currentPost = 0;
var view_more = document.getElementById('view-more-button');

view_more.addEventListener('click', getPosts);


function getPosts(){

const xhttp =  new XMLHttpRequest();

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 400) {
      alert(this.responseText);
    }
    else if (this.readyState == 4 && this.status == 200){
        var serverRes =JSON.parse(this.responseText);
        var x = document.getElementById("postsTable");
        k = 0;
  
        for(i=currentPost; i<=4 +currentPost;i++){
          if(i>=serverRes.length){
          
            currentPost = i;
            //view_more.removeEventListener('click',getPosts);
            alert('No more events left in archive');
            
            break;
          }

          else if(i==currentPost+4){
            currentPost +=4;
            break;

          }
          else{
          
            tempURL = serverRes[i].pTitle.toString().replace(/\s+/g, '%20');
            k = x.insertRow(i+1);
            cell1 = k.insertCell(0);
            cell2 = k.insertCell(1);
            cell3 = k.insertCell(2);
            
            //Format Date
            formatedDate = new Date(serverRes[i].pDate.toString());
            date = formatedDate.toLocaleDateString();
            time = formatedDate.toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
            Dateformated = date + ' ' + time;
            cell1.innerHTML = '<a href=/api/posts/'+ tempURL +'>'+ serverRes[i].pTitle.toString() + '</a>'
            + '<span>'+'<br> Location: '+ serverRes[i].pLocation +'</span>';
            cell3.innerHTML = time;
            cell2.innerHTML = date;
          }
        }
    }
};
xhttp.open("GET", "/api/posts/archive", true);

xhttp.send()


}
getPosts();

function searchFunction(){
    
     var input, filter, table, tr, td, i;
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("postsTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }       
  }
    


    }



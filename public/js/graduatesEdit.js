checkFiles = 0

function readURL(input) {
    var previewImage = document.getElementById('previewImage');

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      
       previewImage.style.background = 'url('+e.target.result+')  no-repeat'
       previewImage.style.width = '800px'
       previewImage.style.height = '400px'
       previewImage.style.backgroundSize = '100%'+' auto';
       previewImage.style.backgroundPosition = '0% '+ '0%'
     
    }

    reader.readAsDataURL(input.files[0]);
  }
}

var b  = document.getElementById('percent');

b.onchange = function(){



    a = document.getElementById('previewImage');
  
  a.style.backgroundPosition = "0% "+this.value+"%";
 
  
}

$("#Mainphotos").change(function() {
  readURL(this);
});

$('#upload-photos').on('submit', function (event) {
    event.preventDefault();
    formData = new FormData();
    

    var files = $('#photos').get(0).files
        
        
    if (files.length == 0 && checkFiles == 0) {
        alert('Select at least 1 file to upload.');
        
    }
    else{
        checkFiles = 1
    // Append the files to the formData.
    for (var i=0; i < files.length; i++) {
        var file = files[i];
        

        formData.append("photos[]" , file, file.name);
        
        

        
    }
    var name = document.getElementById("graduatesName").value
   
    var major = document.getElementById("graduatesMajor").value

    var graduatedDate = document.getElementById("dateGraduated").value
   
    formData.append("graduatesName:", name);
    formData.append("graduatesMajor:", major);
    formData.append("graduatedDate:", graduatedDate);

console.log('hello')

  // Handle Photos Upload
  uploadPhotos(formData);
  alert('You have succesfully posted!')
  checkFiles = 0
  console.log(formData)
   window.location.reload();
}
});


function uploadPhotos(formData) {

    $.ajax({
        url: '/api/persons/graduates',
        method: 'post',
        data: formData,
        processData: false,
        contentType: false,
    })
}



function deleteGraduate(){
var name = document.getElementById("deleteGraduate").value;
var email = document.getElementById("deleteGraduateDate").value

const xhttp =  new XMLHttpRequest();


temp = {
    "Name": name.toString(),
    "Email": email.toString()
    
}

data = JSON.stringify(temp)
console.log(temp)
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 400) {
      alert(this.responseText);
    }
    else if (this.readyState == 4 && this.status == 200){
        alert(this.responseText);
        }
};
xhttp.open("DELETE", "/api/persons/graduates",true);
xhttp.setRequestHeader('Content-Type', 'application/JSON');
xhttp.send(data)

}

$('#upload-photos-Main').on('submit', function (event) {
    event.preventDefault();
    formData2 = new FormData();
    

    var files = $('#Mainphotos').get(0).files
        
        
    if (files.length == 0 && checkFiles == 0) {
        alert('Select at least 1 file to upload.');
        
    }
    else{
        checkFiles = 1
    // Append the files to the formData.
    for (var i=0; i < files.length; i++) {
        var file = files[i];
        

        formData2.append("photos[]" , file, file.name);
        
        

        
    }
    var Title = 'Graduates'
    var Description = 'NA'
    var ImageRatio = document.getElementById('percent').value

    formData2.append("Title:", Title)
    formData2.append("ImageRatio:", ImageRatio)
    formData2.append("Description:", Description);


  // Handle Photos Upload
  uploadDescription(formData2);
  alert('You have succesfully posted!')
  checkFiles = 0

   
}
});


function uploadDescription(formData2){

 $.ajax({
        url: '/api/pages/Graduates',
        method: 'post',
        data: formData2,
        processData: false,
        contentType: false,
    })



}

var graduatesArray = []


function checkDB(){

const xhttp =  new XMLHttpRequest();


xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 400) {
      alert(this.responseText);
    }
    else if (this.readyState == 4 && this.status == 200){
        serverRes = JSON.parse(this.responseText);

        for(i=0;i<=serverRes.length-1; i++){
            graduatesArray.push(serverRes[i].Name);
          


        }
        

        }
};
xhttp.open("get", "/api/persons/graduates",true);
xhttp.setRequestHeader('Content-Type', 'application/JSON');
xhttp.send()




}


checkDB()


    $("#deleteGraduate").autocomplete({
        source: graduatesArray
    });

  



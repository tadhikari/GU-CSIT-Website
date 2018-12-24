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
    var name = document.getElementById("professorName").value
    var department = document.getElementById("professorDepartment").value
    var office = document.getElementById("professorOffice").value
    var phone = document.getElementById("professorPhone").value
    var email = document.getElementById("professorEmail").value
    var reference = document.getElementById("professorReference").value
    formData.append("Name:", name);
    formData.append("Department:", department);
    formData.append("Office:", office);
    formData.append("Phone:", phone);
    formData.append("Email:", email);
    formData.append("Reference:", reference);


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
        url: '/api/persons/professors',
        method: 'post',
        data: formData,
        processData: false,
        contentType: false,
    })
}



function deleteProfessor(){
var name = document.getElementById("deleteProfessor").value;

const xhttp =  new XMLHttpRequest();


temp = {
    "Name": name.toString()
    
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
xhttp.open("DELETE", "/api/persons/professors",true);
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
    var Title = 'Professor'
    var Description = document.getElementById("descriptionField").value
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
        url: '/api/pages/Professor',
        method: 'post',
        data: formData2,
        processData: false,
        contentType: false,
    })



}
var professorArray = []

function checkDB(){



const xhttp =  new XMLHttpRequest();





xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 400) {
      alert(this.responseText);
    }
    else if (this.readyState == 4 && this.status == 200){
        serverRes = JSON.parse(this.responseText);

        for(i=0;i<=serverRes.length-1; i++){
            professorArray.push(serverRes[i].Name);
        }



        }
};
xhttp.open("get", "/api/persons/professors",true);
xhttp.setRequestHeader('Content-Type', 'application/JSON');
xhttp.send()




}
console.log(professorArray);

checkDB()


    $("#deleteProfessor").autocomplete({
        source: professorArray
    });


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

function uploadCourse(){
var Department = document.getElementById("courseDepartment").value;
var Code = document.getElementById("courseCode").value;
var Title = document.getElementById("courseTitle").value;
var Description = document.getElementById("courseDesciption").value;

const xhttp =  new XMLHttpRequest();


temp = {
    "Department": Department.toString(),
    "Code": Code.toString(),
    "Title": Title.toString(),
    "Description": Description.toString(),
    
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
xhttp.open("POST", "/api/courses",true);
xhttp.setRequestHeader('Content-Type', 'application/JSON');
xhttp.send(data)

}



function deleteCourse(){
var Code = document.getElementById("coursetoDelete").value;

const xhttp =  new XMLHttpRequest();


temp = {
    "Code": Code.toString()
    
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
xhttp.open("DELETE", "/api/courses",true);
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
    var Title = 'Academics'
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
        url: '/api/pages/Academics',
        method: 'post',
        data: formData2,
        processData: false,
        contentType: false,
    })



}
var courseArray = []

function checkDB(){



const xhttp =  new XMLHttpRequest();





xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 400) {
      alert(this.responseText);
    }
    else if (this.readyState == 4 && this.status == 200){
        serverRes = JSON.parse(this.responseText);

        for(i=0;i<=serverRes.length-1; i++){
            courseArray.push(serverRes[i].Code);
        }



        }
};
xhttp.open("get", "/api/courses",true);
xhttp.setRequestHeader('Content-Type', 'application/JSON');
xhttp.send()




}
console.log(courseArray);

checkDB()


    $("#coursetoDelete").autocomplete({
        source: courseArray
    });



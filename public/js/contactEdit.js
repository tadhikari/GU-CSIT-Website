checkFiles=0
var myEvents = [];
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

$("#upload-photos").submit(function(e) {
    e.preventDefault();
});




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
    var Title = 'Contact'
    var Description = 'NA'
  
    var ImageRatio = document.getElementById('percent').value

    formData2.append("Title:", Title)
    formData2.append("Description:", Description);
    formData2.append("ImageRatio:", ImageRatio)
 


  // Handle Photos Upload
  uploadDescription(formData2);
  alert('You have succesfully posted!')
  checkFiles = 0

   
}
});


function uploadDescription(formData2){

 $.ajax({
        url: '/api/pages/Contact',
        method: 'post',
        data: formData2,
        processData: false,
        contentType: false,
    })



}












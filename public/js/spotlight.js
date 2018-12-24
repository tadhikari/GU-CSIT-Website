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
    var title = document.getElementById("spotlightTitle").value
    var description = document.getElementById("spotlightDescription").value
    formData.append("Title:", title);
     formData.append("Description:", description);


  // Handle Photos Upload
  uploadPhotos(formData);
  alert('You have succesfully posted!')
  checkFiles = 0
  window.location.reload();
}
});


function uploadPhotos(formData) {

    $.ajax({
        url: '/api/images/spotlight',
        method: 'post',
        data: formData,
        processData: false,
        contentType: false,
    })
}

function getSpotlight(){

    const xhttp =  new XMLHttpRequest();




xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 400) {
      alert(this.responseText);
      
    }
    else if (this.readyState == 4 && this.status == 200){
        serverRes = JSON.parse(this.responseText);

            spotlightTitle = serverRes.Title;
            spotlightDescription = serverRes.Description;
            spotlightImageName = serverRes.ImageName;
             
             document.getElementById("spotlightImage").src = '../images/home/spotlight/' +spotlightImageName; 
             
            console.log(serverRes)

            };

};

xhttp.open("GET", "/api/images/spotlight", true);

xhttp.send()

}
getSpotlight()








$('#uploadNews').on('submit', function (event) {
    event.preventDefault();
    formData = new FormData();
    

    var files = $('#photos2').get(0).files
        
        
    if (files.length == 0 && checkFiles == 0) {
        alert('Select at least 1 file to upload.');
        
    }
    else{
        checkFiles = 1
    // Append the files to the formData.
    for (var i=0; i < files.length; i++) {
        var file = files[i];
        

        formData.append("photos[]" , file, file.name);
        
        

        
    
    var title = document.getElementById("newsTitle").value
    var description = document.getElementById("newsDescription").value

    formData.append("Title:", title);
     formData.append("Description:", description);


  // Handle Photos Upload
  uploadNews(formData);
  alert('You have succesfully posted!')
  checkFiles = 0
  window.location.reload()
}
}
});


function uploadNews(formData) {

    $.ajax({
        url: '/api/images/news',
        method: 'post',
        data: formData,
        processData: false,
        contentType: false,
    })
}

function getNews(){

    const xhttp =  new XMLHttpRequest();


console.log('test')

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 400) {
      alert(this.responseText);
      
    }
    else if (this.readyState == 4 && this.status == 200){
        serverRes = JSON.parse(this.responseText);

            newsTitle = serverRes.Title;
            newsDescription = serverRes.Description;
            newsImageName = serverRes.ImageName;
             
             document.getElementById("newsImage").src = '../images/home/spotlight/' +newsImageName; 
             
            console.log(serverRes)

            };

};

xhttp.open("GET", "/api/images/news", true);

xhttp.send()

}
getNews()


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
        url: '/api/pages/Home',
        method: 'post',
        data: formData2,
        processData: false,
        contentType: false,
    })



}
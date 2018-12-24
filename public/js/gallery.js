


currentFolder = '';
 formFile = document.getElementById("my-file");

filename = '';
imageTitles = [];
images = [];
function filePicked(event){
var input = event.target;

formFile = document.getElementById("imagename");



for(i=0; i<=formFile.files.length-1;i++){

var file = input.files[i];

filename = file.name;

imageTitles.push(filename);
 



$('#upload-photos').on('submit', function (event) {
    event.preventDefault();
    formData = new FormData();
    

    var files = $('#photos').get(0).files
        
        
    if (files.length == 0) {
        alert('Select at least 1 file to upload.');
        
    
    // Append the files to the formData.
    for (var i=0; i < files.length; i++) {
        var file = files[i];

        formData.append(currentFolder , file, file.name);
        

        
    }

  // Handle Photos Upload
  uploadPhotos(formData);
}
});




document.getElementById("newFilename").innerHTML = imageTitles;

}

};
function uploadPhotos(formData) {

    $.ajax({
        url: '/api/images/uploadImages',
        method: 'post',
        data: formData,
        processData: false,
        contentType: false,
        xhr: function () {
            var xhr = new XMLHttpRequest();
         xhr.upload.addEventListener('progress', function (event) {
                var progressBar = $('.progress-bar');
                if (event.lengthComputable) {
                    var percent = (event.loaded / event.total) * 100;
                    progressBar.width(percent + '%');
                    if (percent === 100) {
                        progressBar.removeClass('active');
                    }
                }
            });
            return xhr;
        }
    })
}

function deleteDirectory(folderDelete){



 if (confirm("Are you sure you want to delete?")) {
    
 



const xhttp =  new XMLHttpRequest();

temp =  {
  "folder": folderDelete
} 

data = JSON.stringify(temp);

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 400) {
      alert(this.responseText);
    }
    else if (this.readyState == 4 && this.status == 200){
        alert(this.responseText);

        }
};

xhttp.open("DELETE", "/api/images/folder", true);
xhttp.setRequestHeader('Content-Type', 'application/JSON');
xhttp.send(data);
window.location.reload();

 } 

}




function getFolders(){

const xhttp =  new XMLHttpRequest();




xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 400) {
      alert(this.responseText);
    }
    else if (this.readyState == 4 && this.status == 200){

       serverRes = JSON.parse(this.responseText);

      for(i=0; i<=serverRes.length-1;i++){
        if(i==0){
          $('<a href="#" class="list-group-item" onclick="getFolderImages(\''+serverRes[i].toString()+'\')">' +
        '<span class="glyphicon glyphicon-folder-open" aria-hidden="true"></span>'+'   '
        +'<span name="firstSpan" id='+serverRes[i]+'>' +serverRes[i] +'</span>'+' <span><button class="btn btn-danger btn-sm" onclick="deleteDirectory(\''+serverRes[i].toString()+'\'); event.stopPropagation();"'+
        'style="float:right; z-index: 12;">Delete</button></span></a>' 


        ).appendTo("#Folders");
        }
        else{
       $('<a href="#" class="list-group-item" onclick="getFolderImages(\''+serverRes[i].toString()+'\')">' +
        '<span class="glyphicon glyphicon-folder-open" aria-hidden="true"></span>'+'   '
        +'<span name="firstSpan" id='+serverRes[i]+'>' +serverRes[i] +'</span>'+' <span><button class="btn btn-danger btn-sm" onclick="deleteDirectory(\''+serverRes[i].toString()+'\'); event.stopPropagation();"'+
        'style="float:right; z-index: 12;">Delete</button></span></a>' 

        ).appendTo("#Folders");

       }

      }


        }
};
xhttp.open("GET", "/api/images/folders", true);

xhttp.send();


}
getFolders()

var header = document.getElementById("Folders");
var item = header.getElementsByClassName("list-group-item");
for (var i = 0; i < item.length; i++) {
  item[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("list-group-item active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
   
    
  });
}

function getFolderImages(folder){
currentFolder = folder.toString()

document.getElementById("currentFolderId").value = currentFolder;
document.getElementById("photos").name = currentFolder;

appDiv = document.getElementById('VGallery');
galleryDiv = document.getElementById('app');

appDiv.removeChild(galleryDiv)


$('<div id="app">'+
  '<gallery :images="images" :index="index" @close="index = null"></gallery>'+
                  '<div '+
                    'class="image"'+
                    'v-for="image, imageIndex in images"' +
                    '@click="index = imageIndex"' +
                    ':style="{ backgroundImage: \'url(\' + image + \')\', width: \'300px\', height: \'200px\' }"' +
                  '></div> '+
                
                '<span id="newFilename"> </span>' +
                '</div>'
        ).appendTo("#VGallery");

const xhttp =  new XMLHttpRequest();

temp = {
  "folderName": folder.toString(),
}

data = JSON.stringify(temp)

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 400) {
      alert(this.responseText);
    }
    else if (this.readyState == 4 && this.status == 200){
      serverRes = JSON.parse(this.responseText);
      imagesArray = [];
      for(i=0; i<=serverRes.length-1;i++){
        serverRes[i] = serverRes[i].replace(/'/g, "\\'");
        imagesArray.push('../Photos/'+folder+'/'+ serverRes[i].toString());
      }



new Vue({
  el: '#app',
  data: function () {
    return {
      images: imagesArray,
      index: null
    };
  },

  components: {
    'gallery': VueGallery
  }
});
    }
  };


xhttp.open("POST", "/api/images/folderImages", true);
xhttp.setRequestHeader('Content-Type', 'application/JSON');
xhttp.send(data);

galleryBlue = document.getElementById("blueimp-gallery");


setTimeout(
    function(){
      $(".image").wrap("<div class='parent container'></div>");
      let images = document.getElementsByClassName("image");
      let parents = document.getElementsByClassName('parent');
     
      for (i=0;i<=parents.length-1;i++){

  parents[i].innerHTML = 
    '<div class="checkBoxes">' +
  '<label class="containerCheckBox">' +
            '<input class="chkmrk" type="checkbox" unchecked >' +
            '<span class="checkmark"></span>' +
          '</label>'  +
             '</div>' +  parents[i].innerHTML
          

          



};



    },200);

}




 // append a div with class check box to parent
// I was here







setTimeout(function(){getFolderImages(document.getElementsByName("firstSpan")[0].innerHTML)},200)
function createFolder(){
  const xhttp =  new XMLHttpRequest();
  folderName = document.getElementById("inputFolderName").value
  temp = {
    "folderName": folderName.toString()
  }

  console.log(folderName)

data = JSON.stringify(temp)

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 400) {
      alert(this.responseText);
    }
    else if (this.readyState == 4 && this.status == 200){


        }
};

xhttp.open("POST", "/api/images/createFolder", true);
xhttp.setRequestHeader('Content-Type', 'application/JSON');
xhttp.send(data);
window.location.reload();


}



function deleteImages(){

 if (confirm("Are you sure you want to delete?")) {

deletedImages = [];


checkboxes = document.getElementsByClassName("chkmrk");
images = document.getElementsByClassName("image");




for (i=0;i<=checkboxes.length-1;i++){
  if(checkboxes[i].checked == true){
 imageURL = images[i].style.backgroundImage;
 arrayImage = imageURL.slice(8,-2)
 arrayImage = 'public/' + arrayImage
 // arrayImage = arrayImage[0];
 // arrayImage = arrayImage.slice(0,-2);
 
 deletedImages.push(arrayImage);

   
  }

}

const xhttp =  new XMLHttpRequest();
  

data = JSON.stringify(deletedImages);

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 400) {
      alert(this.responseText);
    }
    else if (this.readyState == 4 && this.status == 200){
        alert(this.responseText);

        }
};

xhttp.open("DELETE", "/api/images", true);
xhttp.setRequestHeader('Content-Type', 'application/JSON');
xhttp.send(data);
window.location.reload()

}

}



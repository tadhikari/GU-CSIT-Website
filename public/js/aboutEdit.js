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





function createInput(){


$('<div class="form-group inputDate">' +

                '<hr><label>Date</label>' +
              '<input type="text" name="inputDate" id="professorName" class="form-control" placeholder="Event-2018">' +
            '</div>' +
             '<div class="form-group inputContent">' +
                '<label>Content</label>' +
              '<input type="text" name="inputContent" id="professorDepartment" class="form-control" placeholder="Content">' +
              '</div>'
              ).appendTo('#inputForms');



}

function getTimeline(){

const xhttp =  new XMLHttpRequest();

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 400) {
      alert('Failed to get information from server');
    }
    else if (this.readyState == 4 && this.status == 200){
    var serverRes = JSON.parse(this.responseText);

    myEvents = serverRes.Events;
        }
};
xhttp.open("GET", "/api/timeline", true);

xhttp.send();


}

getTimeline();

function updatePreview(){

newEvents = []
for (i=0;i<=myEvents.length-1;i++){
newEvents.push(myEvents[i])
}
console.log(newEvents)
  inputDates = document.getElementsByName('inputDate');
  inputContents = document.getElementsByName('inputContent');
 
  

  for(i=0;i<=inputDates.length-1;i++){

    newEvent = {
      date: inputDates[i].value.toString(),
      content: inputContents[i].value.toString()
    };

    newEvents.push(newEvent)

  }




setTimeout(function(){$('#my-timeline').roadmap(newEvents)}, 100)


}

setTimeout(updatePreview,1000);



function resetTimeline(){

   if (confirm("Are you sure you want to reset the timeline?")) {

const xhttp =  new XMLHttpRequest();

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 400) {
      alert('Failed to get delete timeline from server');
    }
    else if (this.readyState == 4 && this.status == 200){
    alert(this.responseText)
        }
};
xhttp.open("DELETE", "/api/timeline", true);

xhttp.send();
}

}



function uploadEvents(){

  const xhttp =  new XMLHttpRequest();

 inputDates = document.getElementsByName('inputDate');
  inputContents = document.getElementsByName('inputContent');
 
  var myEvents = [




  ];

  for(i=0;i<=inputDates.length-1;i++){

    newEvent = {
      date: inputDates[i].value.toString(),
      content: inputContents[i].value.toString()
    };

    myEvents.push(newEvent)

  }




temp =  {
  Events: myEvents
} 

data = JSON.stringify(temp);
console.log(data)
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 400) {
      alert(this.responseText);
    }
    else if (this.readyState == 4 && this.status == 200){
        alert(this.responseText);

        }
};

xhttp.open("POST", "/api/timeline", true);
xhttp.setRequestHeader('Content-Type', 'application/JSON');
xhttp.send(data);
alert('Sucessfully updated')




}


function uploadDescription(){

  const xhttp =  new XMLHttpRequest();

  descriptionField = document.getElementById('descriptionField').value

temp = {
  Events: [{description: descriptionField}]
}
data = JSON.stringify(temp);
console.log(data)
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 400) {
      alert(this.responseText);
    }
    else if (this.readyState == 4 && this.status == 200){
        alert(this.responseText);

        }
};

xhttp.open("POST", "/api/timeline/aboutDescription", true);
xhttp.setRequestHeader('Content-Type', 'application/JSON');
xhttp.send(data);

window.location.reload();



}





$('#my-timeline').roadmap(myEvents);


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
    var Title = 'ACM'
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
        url: '/api/pages/About',
        method: 'post',
        data: formData2,
        processData: false,
        contentType: false,
    })



}












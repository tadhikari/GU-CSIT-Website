function changeBtn(newName){
 btn = document.getElementById("dropdownButton");
 btn.innerHTML = newName;



}


Default = '';
function getFolders(){

const xhttp =  new XMLHttpRequest();




xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 400) {
      alert(this.responseText);
    }
    else if (this.readyState == 4 && this.status == 200){

       serverRes = JSON.parse(this.responseText);
        

    
      for(i=0; i<=serverRes.length-1;i++){
        if(i==serverRes.length-1){
          $('<a class="dropdown-item" href="#/" onclick="getFolderImages(\''+serverRes[i].toString()+'\');changeBtn(\''+serverRes[i].toString()+'\')" >'+ serverRes[i]+'</a>'
        ).appendTo("#folderSelect");
          getFolderImages(serverRes[serverRes.length-1].toString());
          document.getElementById("dropdownButton").innerHTML = serverRes[serverRes.length-1].toString()
        }
        else{
        $('<a class="dropdown-item" href="#/" onclick="getFolderImages(\''+serverRes[i].toString()+'\');changeBtn(\''+serverRes[i].toString()+'\')" >'+ serverRes[i]+'</a>'
        ).appendTo("#folderSelect");


       }

      }


        }
};
xhttp.open("GET", "/api/images/folders", true);

xhttp.send();


}



function getFolderImages(folder){



console.log(Default)
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
                  '></div>'+
                
                
            
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

}
getFolders();






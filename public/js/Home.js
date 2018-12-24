function getPosts(){

const xhttp =  new XMLHttpRequest();




xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 400) {
      alert(this.responseText);
    }
    else if (this.readyState == 4 && this.status == 200){
        var serverRes =JSON.parse(this.responseText);
        tempURL = serverRes[0].pTitle.toString().replace(/\s+/g, '%20')
        var y = document.getElementsByClassName("event-date featured");
        var x = document.getElementsByClassName("event-title featured");
        var z = document.getElementsByClassName("event-location featured");

        var a = document.getElementsByClassName("event-date");
        var b = document.getElementsByClassName("event-title");
        var c = document.getElementsByClassName("event-location");
        var futureAnnouncement = document.getElementById("future-announcement")

    

            //Format Date

            formatedDate = new Date(serverRes[0].pDate.toString());
            date = formatedDate.toLocaleDateString().split('/');
            date = `${date[0]}.${date[1]}.${date[2]}`;
            var event_times = document.getElementsByClassName('event-time');

            time = formatedDate.toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
            Dateformated =  date //+ ' / ' + time;
            event_times[0].innerHTML = ' / '+time;
         



            y[0].innerHTML = Dateformated;
            x[0].innerHTML = '<a href=/api/posts/'+ tempURL +'>'+ serverRes[0].pTitle.toString() + '</a>';
            z[0].innerHTML = '<strong>Location: </strong>'+serverRes[0].pLocation.toString();

            var event_list_container = document.getElementById('future-announcement').firstElementChild;
            

            for(i=1; i<=3;i++){
                tempURL = serverRes[i].pTitle.toString().replace(/\s+/g, '%20')
                $('<div class="event-listing">'+'<p class="event-date-time"><span class="event-date future"></span><span class="event-time future"></span></p>'+
                                                 '<p class="event-title future"></p>'+
                                                 '<p class="event-location future"></p>'+

                                                '</div>'

                                                ).appendTo(event_list_container);
                formatedDate = new Date(serverRes[i].pDate.toString());
            date = formatedDate.toLocaleDateString().split('/');
            time = formatedDate.toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
            date = `${date[0]}.${date[1]}.${date[2]}`; // <---- produces date in format dd.mm.yyyy 
            Dateformated =  date;
            event_times[i].innerHTML = ' / '+time; // < --- required to make date and times sperate from each other
            a[i].innerHTML = Dateformated;
            b[i].innerHTML = '<a href=/api/posts/'+ tempURL +'>'+ serverRes[i].pTitle.toString() + '</a>';
            c[i].innerHTML = '<strong>Location: </strong>'+serverRes[i].pLocation.toString();
            

            }

            


        }
};
xhttp.open("GET", "/api/posts", true);

xhttp.send()


}
getPosts();


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
             document.getElementById("spotlight-title").innerHTML = spotlightTitle ;
             document.getElementById("spotlight-description").innerHTML  = spotlightDescription;
            document.getElementById("spotlight-image").src = "../images/home/spotlight/" +spotlightImageName;

             
         

            };

};

xhttp.open("GET", "/api/images/spotlight", true);

xhttp.send();

}
getSpotlight();


function getNews(){

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
             document.getElementById("news-title").innerHTML = spotlightTitle ;
             document.getElementById("news-description").innerHTML  = spotlightDescription;
            document.getElementById("news-header-image").src = "../images/home/spotlight/" +spotlightImageName;

             
            

            };

};

xhttp.open("GET", "/api/images/news", true);

xhttp.send();

}
getNews();


function getDescriptionPicture(){

const xhttp =  new XMLHttpRequest();


temp = {
  Title: 'Home'
}

data = JSON.stringify(temp);

 /* let  banner_adjust_xl = function(){
        let media = window.matchMedia("(min-width: 992px)");
        let banner = document.getElementById('image_slider');
        if(media.matches){
            
            banner.style.backgroundSize = "100% 100%";
        }
    else {
        banner.style.backgroundSize = 'cover';
    }

    };

    window.addEventListener('resize', function(){
         banner_adjust_xl();
         console.log('hello world')

    }); */

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 400) {
      alert('Failed to get information from server');
    }
    else if (this.readyState == 4 && this.status == 200){
    var serverRes = JSON.parse(this.responseText);
   
    document.getElementById("image_slider").style.background = 'url(\'../images/pages/' +serverRes.ImageSrc+'\')  no-repeat '
    document.getElementById("image_slider").style.backgroundPosition = '0% '+ serverRes.ImageRatio.toString()+'%'
   document.getElementById("image_slider").style.backgroundSize = 'cover';

       
        }
};
xhttp.open("PUT", "/api/pages", true);
xhttp.setRequestHeader('Content-Type', 'application/JSON');

xhttp.send(data)


}

getDescriptionPicture();



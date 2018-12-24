"use strict";

(function(){
	// for the navigation section slide
	//includes nav toggle button animation effect
	let clicked = false;
	let nav_button = document.getElementById('nav-button-container');
	let button_tile = document.getElementById('nav-toggle-tile');
	let body = document.body;

	var side_nav = document.getElementById('slide-nav-menu');
	var nav = document.getElementsByTagName('header')[0];

	nav_button.addEventListener('click',() => {
		
		if(clicked){
			clicked = false;
			nav.style.top = '0px';
		}
		else {
			clicked = true;
			nav.style.top = $(window).scrollTop()+'px';
		}

		button_tile.classList.toggle('active');
		document.body.classList.toggle('active');
		side_nav.classList.toggle('hidden');
	});


    window.addEventListener('scroll',function(e){

    	side_nav.style.top = $(window).scrollTop()+'px';
    	if(clicked){
    		console.log(nav);
    		nav.style.top = $(window).scrollTop()+'px';
    	};

    	console.log(e);
    	

    });



	

})();


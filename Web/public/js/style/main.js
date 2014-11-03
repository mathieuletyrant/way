var wH = window.innerHeight;

var is_homme = true;
if (document.getElementById('homme')) {
	var homme = document.getElementById('homme');
	homme.addEventListener('click', toggleProfils, false);	
}
if (document.getElementById('femme')) { 
	var femme = document.getElementById('femme');
	femme.addEventListener('click', toggleProfils, false);
}

if (document.getElementById('go_notif')) { 
	var cloche = document.getElementById('go_notif');
	cloche.addEventListener('click', toggleNotif, false);
}


if (document.getElementById('showcase')) { document.getElementById('showcase').style.height = wH + 'px'; }

if (document.getElementById('photo_profil')) {document.getElementById('photo_profil').addEventListener('click', putOnLeft, false);}

if (document.getElementById('chart')) { 
	var data = [
	    {
	        value: 300,
	        color:"#F7464A",
	        highlight: "#FF5A5E",
	        label: "Geek"
	    },
	    {
	        value: 50,
	        color: "#46BFBD",
	        highlight: "#5AD3D1",
	        label: "Badboy"
	    },
	    {
	        value: 100,
	        color: "#FDB45C",
	        highlight: "#FFC870",
	        label: "Kéké"
	    },
	    {
	        value: 40,
	        color: "#949FB1",
	        highlight: "#A8B3C5",
	        label: "Dragqueen"
	    },
	    {
	        value: 120,
	        color: "#4D5360",
	        highlight: "#616774",
	        label: "Hipster"
	    }
	];
	var options = {
		animationEasing : "easeOutQuart",
		segmentStrokeColor : "#fff"
	};
	var ctx = document.getElementById("chart").getContext("2d");
	var chart = new Chart(ctx).PolarArea(data, options);
}

if(document.querySelectorAll('.total_point')) {
	var span = document.querySelectorAll('.total_point');
	for(var i = 0; i < span.length; i++) {
		animePoint(span[i].getAttribute('data-point'), span[i]);
	}
}

function toggleNotif(e){
    e.preventDefault();
	var notif = document.getElementById('notifications');
	notif.classList.toggle("notif_open");
}

function animePoint(points, span) {
	var ct = 0;
	var vit = 200;
	setInterval(function(){
		if(ct < points) {
			ct++;
			span.innerHTML = ct;
		}else {
			clearInterval();
		}		
	}, vit);

}


document.onkeydown = checkKey;
function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '39') {
        // right
        document.getElementById("profil").classList.add('on_right');
		document.getElementById("stats").classList.add('hided');
		document.getElementById("name_user").classList.add('hided');
    }
    else if (e.keyCode == '37') {
        // left
        document.getElementById("profil").classList.remove('on_right');
		document.getElementById("stats").classList.remove('hided');
		document.getElementById("name_user").classList.remove('hided');
    }
}

function putOnLeft(e) {
	e.preventDefault();

	 document.getElementById("profil").classList.remove('on_right');
	 document.getElementById("stats").classList.remove('hided');

	 setTimeout(function(){
	 		document.getElementById("name_user").classList.remove('hided');
	 }, 1000)

}


function toggleProfils(e){
	e.preventDefault();
	if (is_homme) {
		document.getElementById('profils_femme').classList.add('anim');
		document.getElementById('profils_homme').classList.remove('anim');
		homme.classList.remove('active');
		femme.classList.add('active');
		is_homme = false;
	}else {
		document.getElementById('profils_femme').classList.remove('anim');
		document.getElementById('profils_homme').classList.add('anim');
		femme.classList.remove('active');
		homme.classList.add('active');
		is_homme = true;
	}
}

/*
 * SLIDER
 */

$('#slider_how_to').bxSlider({
  mode: 'horizontal',
  captions: false,
  controls: false,
  pager: false,
  onSlideAfter : function($slideElement, oldIndex, newIndex) {
    // console.log(oldIndex);
    // console.log(newIndex);
  }
});
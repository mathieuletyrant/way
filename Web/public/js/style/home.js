var wH          = window.innerHeight,
	is_homme    = true;

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

window.onresize = function(event) {
    wH = window.innerHeight;
    if (document.getElementById('showcase')) { document.getElementById('showcase').style.height = wH + 'px'; }
};

if (document.getElementById('showcase')) { document.getElementById('showcase').style.height = wH + 'px'; }


function toggleNotif(e){
    e.preventDefault();
	var notif = document.getElementById('notifications');
	notif.classList.toggle("notif_open");
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

$('document').ready(function(){
    $('#slider_how_to').bxSlider({
        mode: 'horizontal',
        captions: false,
        controls: true,
        pager: false,
        onSlideNext : function($slideElement, oldIndex, newIndex) {
            // on cache next
            $('a.bx-prev').fadeIn();
            $('a.bx-prev').css({'display' : 'block'});
            $('a.bx-next').fadeOut();
        },
        onSlidePrev : function($slideElement, oldIndex, newIndex) {
            // on cache prev
            $('a.bx-prev').fadeOut();
            $('a.bx-next').css({'display' : 'block'});
            $('a.bx-next').fadeIn();
        }
    });
});

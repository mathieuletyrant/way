if (document.getElementById('photo_profil')) {document.getElementById('photo_profil').addEventListener('click', putOnLeft, false);}

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

setTimeout(function(){
	document.getElementById("profil").classList.remove('on_right');
	document.getElementById("stats").classList.remove('hided');

	 setTimeout(function(){
	 		document.getElementById("name_user").classList.remove('hided');
	 }, 1000);
}, 3000);

function putOnLeft(e) {
	e.preventDefault();

	 document.getElementById("profil").classList.remove('on_right');
	 document.getElementById("stats").classList.remove('hided');

	 setTimeout(function(){
	 		document.getElementById("name_user").classList.remove('hided');
	 }, 1000)

}
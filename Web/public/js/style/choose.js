var wH          = window.innerHeight,
	is_homme    = true;

var ct = document.getElementById('container_phase');
		var pro = document.getElementsByClassName('profil_name');
		var nb_user = document.getElementsByClassName('huit_user');
		var user_ct = document.getElementById('user_container')
		var next = document.getElementById('next_user');
		var previous = document.getElementById('previous_user');
		var count = 1;
		var margin = 0;

		user_ct.style.width = 360 * nb_user.length + "px";

		next.addEventListener('click',animeUserNext, false);
		previous.addEventListener('click',animeUserPrevious, false);

		for (var i = 0; i < pro.length; i++) {
			pro[i].addEventListener('click', moveIt, false);
		}

		function moveIt(e){
			e.preventDefault();

			ct.classList.remove('phase_1');
			ct.classList.add('phase_2');
		}

		function animeUserNext(e){
			e.preventDefault();

			margin = margin + 360;

			if (count == nb_user.length) {
				return;
			}
			if(count == 1){
				previous.style.display = "none";
			}

			previous.style.display = "block";
			
			user_ct.style.marginLeft = "-" + margin + "px";
			count++;
		}

		function animeUserPrevious(e){
			e.preventDefault();

			console.log(user_ct.style.marginLeft);
			margin = margin - 360;
			user_ct.style.marginLeft =  "-" + margin + "px";
			
			count--;

		}

if (document.getElementById('homme')) {
	var homme = document.getElementById('homme');
	homme.addEventListener('click', toggleProfils, false);	
}
if (document.getElementById('femme')) { 
	var femme = document.getElementById('femme');
	femme.addEventListener('click', toggleProfils, false);
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
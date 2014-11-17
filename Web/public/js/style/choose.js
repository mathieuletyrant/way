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
'use strict';

angular.module('app').service('choose', function () {
    this.style = function () {
        var ct          = document.getElementById('container_phase'),
            pro         = document.getElementsByClassName('profil_name'),
            nb_user     = document.getElementsByClassName('huit_user'),
            user_ct     = document.getElementById('user_container'),
            next        = document.getElementById('next_user'),
            previous    = document.getElementById('previous_user'),
            count       = 1,
            margin      = 0;

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
    };
});
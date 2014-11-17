var reponses = document.getElementsByClassName('reponse');

for (var i = 0; i < reponses.length; i++) {
    reponses[i].addEventListener('click', addClicked, false);
}

function addClicked(e) {
    e.preventDefault();
    var clique = document.getElementsByClassName('clicked');
    for (var i = 0; i < clique.length; i++) {
        clique[i].classList.remove('clicked');
    }
    this.classList.add('clicked');
}
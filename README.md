Way
=========================

### C'est quoi ?
--------------------
Way est un test de personnalité. À travers un blind-test, découvrez votre profil et défiez vos amis dans la catégorie de votre choix. « Etre ou ne pas être telle est la question ».

### Liens
--------------------
* [Site WEB](http://www.whoareyou.io)
* [REST API](http://api.whoareyou.io)
* BackOffice
 * [Ajouter les questions dans l'API](http://api.whoareyou.io/question/add)
 * [Ajouter des bons plans dans l'API](http://api.whoareyou.io/deal/add)

### Le GIT
--------------------

#### l'API
On y retrouve l'API qui permet de retourner à notre application WEB/MOBILE les questions, les réponses, les utilisateurs et de sauvegarder ça dans une base de donnée de type SQL (MariaDB chez nous).

#### LE WEB
Ensuite il y a l'application WEB [disponible ici](http://www.whoareyou.io), utilise :

* AngularJS
 * UI Router
 * ngFacebook
 * ngAria (Pour l'accessibilité)
 * ngStorage
 * Prerender.io (Pour le SEO d'une application ANGULARJS)
* Gulp
* Bower

#### LE MOBILE
Une application mobile faite via Ionic et Cordova permet de faire la liste des bons plans d'une catégorie. On peut partager sur Facebook, tweeter, et si un bon plan à une coordonnée GPS, une map apparait et au clique l'application natif du téléphone est ouvert avec les coordonnées du lieu.

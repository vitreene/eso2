# Un composant pour placer un Perso sur un chemin

- un composant path contient le chemin ;
- un Perso suivra ce chemin
- un strap reliant les deux :
    - en entrée , un range entre 0 et 100
    - en sortie, la position et l'angle

Le range est :
- une position dans le temps,
- une intéraction comme le déplacement d'un curseur
La valeur d'entrée doit etre convertie dans le range voulu.

Position
x et y en pixels relatif aux coordonnées du Path; 
doit etre ajouté la différence de position entre le Perso et le path
x,y est converti en dX,dY.
angle peut etre désactivé si un parametre l'autorise

Questions
- comment est lancée une animation ?
- utilise-t-on transition ?
    - pourrait fournir à chaque update le range et un event à passer au strap
- le strap, après initialisation, 
    - prend-t'il en charge l'animation,
    - ou sert seulement d'interpolation f(range)-> x,y,angle

Plus généralement, sur le fonctionnement des Straps :
- doivent-ils communiquer entre eux seulement par messages ?
- pourraient-ils etre composables ?
Les events seraient reservés au retour vers les Persos.
Comment gérer, par exemple, une visu des coordonnées en meme temps que l'on déplace un composant ?
Les évents sont un système lourd dans ce genre de cas, mais sont adaptés à ce projet, cela permet de connecter des composants qui restent indépendants les uns des autres.
On peut imaginer que les straps partagent un store avec données réactives ; mais cela créé un système parallèle avec lequel il sera difficile de raisonner
Equilibrer optimisation et simplicité d'emploi. 

Les straps sont des interfaces avec le système d'events; cependant on peut créer une boite à outils de fonctions utilisées par les Straps.
Au lieu de définir un strap Move et un strap Drag qui s'envoie des messages, extraire les fonctions move, ne garder que l'interface pour le strap, et réemplyer la fonction move dans Drag par exemple. 

donc : 
Strap -> interface
boite à outils : fonctions pures partagées

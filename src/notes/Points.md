
Composant Point
classe Point : https://github.com/puckey/point
conversion path/Array(points)  https://github.com/pshihn/bezier-points
bezier : https://medium.com/@Acegikmo/the-ever-so-lovely-bézier-curve-eb27514da3bf
inverse IK : https://www.alanzucconi.com/2018/05/02/ik-2d-1/

accrocher des composants à des points de référence qui se trouvent dans le meme contexte de positionnement.
Ce point peut etre aussi un vecteur, ajoutant une direction et une distance à une position (x,y,d,∂)
Si un point est modifié, les composants attachés se déplacent solidairement.
Un composant Ligne relie deux points par une tracé.

quels usages ?
- placer des points sur une image, ou une carte, et relier un label, une vignette.
- editer la position et la forme d'un élément (est-ce la bonne interface pour faire ca)
- utiliser les points pour effectuer les mouvements ; les points partageant le meme espace, on peut faire des interpolations en cas de changement brusque de direction (interpolation additive).
- il faut une méthode permettant de passer des coordonnées de ces points à la position d'un élément dans le Dom.

Comment se définit un point ?  
- en coordonnées absolues dans un espace dédié,
- en valeurs proportionnelles ?
comment résoudre : un point désigne une position sur une carte; cette carte peut etre manipulée, le point doit garder sa position relative à la carte, les composant relatifs au point se déplacent identiquement.
si on zoome sur la carte, le point est déplacé mais pas forcément aggrandi, c'est une donnée distincte (idem la rotation)
Exemple, un label sur une carte conserve sa taille quel que soit l'échelle.
Cela veut dire que les modifications envoyées à l'image doivent aussi l'etre aux points. un controleur envoie les modifs à l'image et aux points, qui réagissent en meme temps.

Hiérarchie des points
un point peut-il dépendre d'un autre, et à quoi cela sert ?
- le point 2 dépend du point 1. Je peux déplacer le point 2 seul, si le point 1 est déplacé, le point 2 suit.
- un meilleur modele serait celui de la cinématique inverse
voir : https://www.alanzucconi.com/2018/05/02/ik-2d-1/

Un point parent déplacé entraine un mouvement identique pour ses enfants.
Si l'on veut que le mouvement d'un enfant entraine celui des parents, déplacer directement le parent ?
exemple d'un rectangle avec un point parent central, et 4 points enfants aux angles. 
Déplacer un enfant entraine le déplacement des autres points.
-> mais cela dépend de l'intention de l'interface / choix de l'outil par l'utilisateur : selon le choix, l'action est menée différement 
L'action doit eclairer les points sur les comportements attendus :
- déplacement seul, hierarchique, groupé, contraint, partiel.
-> déplacer un point d'angle entraine le déplacement sur l'un des axes du point adjacent. 


La notion principale est un set de points - épingles -  dans un espace commun, auxquels sont reliés des composants ailleurs dans le dom, qui se déplacent en meme temps. 

Un autre emploi sont des segments reliant un composant à un autre. Cette fois-ci, les points sont accrochés aux composants.
Chaque composant possede un point de référence, par défaut le point central. 
un point d'attache est placé à une certaine distance du point de référence
pAttach = pRef + delta.

Y a-t-il une situation où il faut déplacer un point d'accroche, entrainant un recalcul d'un point de référence ? Le dépacement d'un point d'accroche ne devrait toucher que le delta.

La question des contraintes
je peux avoir à déplacer des points liés à des segments selon des contraintes : angle et/ou distance contraintes, dans une limite donnée. 
ex : des curseurs, volants, potards.



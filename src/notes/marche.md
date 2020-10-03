Démontrer que hyperhtml est convenable pour le projet :

les objets Persos (ex-Perso ex-Valet ex-Actor) sont construits en composant :
- une méthode par famille d'attributs 
    - style
    - classe
    - evenements
    - autres attributs
- effets temporels
    - transition
    - reslot
- type de contenus 
    - textes
    - images
    - svg
    - slot, layout
- un rendu DOM

Méthodes pricipales :
- update
- render

Un objet updaté doit etre re-rendu, quel que soit l'endroit ou il se trouve.

Un objet est placé dans le DOM via un slot.
Un slot contient un tableau de références d'objets. 
Un layout est une liste de slots

Il est responsable de sa mise à jour en cas d'ajout ou de retrait d'un objet. 
-> le changement d'ordre des objets dans le tableau pourrait etre aussi traité, mais peut l'etre aussi via des propriétés css (order)
pour mettre à jour, proposer un nouveau tableau  dont les références du contenu maintenu sont identiques
si des objets contenant des slots utilisés par d'autres objets apparaissent au meme moment, il faut respecter un ordre : slots d'abord, objets ensuite.
si un slot en contient un autre, il faut la aussi les ordonner.
Un autre méthode serait de suspendre l'introduction d'un objet jusqu'à la disponibilité du slot.
Cependant, si un objet attend un update, il  risque de ne pas en tenir compte, ce qui cassera l'affichage.

faut-il créer un buffer lors d'un evenement pour recevoir tous les éléments, les trier et enfin les updater ? 
Il est possible de connaitre le nombre d'écouteurs pour un event, donc de savoir lorsque tous les listeners ont été transmis.

l'objet lui-meme recoit un update et se met à jour 


**donc deux sources de rendu :**
- quand l'objet est introduit, est déplacé, est retiré : **slot**
- modification de l'objet lui-meme : **Perso**

le démo doit tester le rendu sur ces deux composants, notamment dans des situations ou ils sont imbriqués.


la fonction onScene gere le flux des objets.
- liste le contenu de chaque slot,
- pour chaque element, 
    - dans quel slot il se trouve,
    - son statut : entre (enter), sort (exit), deplacé
    - déplacement : 
        - retrait de l'emplacement (unmount),
        - ajout dans le nouvel emplacement (mount)
        
    ces événements sont transmis à l'objet lui-meme


Où placer la fonction de transition :
- dans chaque composant, via Eso
- en amont, dans des pré-traitements comme re-slot

- Transistion a un tempo 1/60s, Runtime 1/100s 

- Les transitions sont-elles précalculées, ou calculées à la lecture ?

Comment sont enregistrées les données sur la timeline :
- tous les 1/10s pour l'enregistrement de la timeline
- 1/60s pour l'execution

Selon le choix, utiliser l'emitter courant, ou bien des callbacks internes pour mettre à jour l'etat du composant

->
transition dans le composant

solution conforme
reçoit from, to, progress
-> sortie : { transition: {from, to}, progress} enregistré dans la timeline
plus l'état consigné tous les 1/10s 

alternative
en sortie {transition: {progression, to}, time} où progression est l'état intermediaire. 


codes pour des effets :
## SVG
une librairie pour créer des éléments. utile ?
https://svgjs.com/docs/3.1/

## Lerp
un tuto : 
https://inventingwithmonster.io/20190304-how-to-write-a-tween/

https://github.com/mattdesl/keyframes/blob/master/index.js


## superFormule, pour créer des rosaces :

https://github.com/jasonwebb/SuperformulaSVG-for-web/blob/master/js/superformula-functions.js
la définition wikipedia : https://en.wikipedia.org/wiki/Superformula

donner une epaisseur aux lignes : 
https://github.com/mattdesl/polyline-normals


## motion path
trouver la tangente, l'angle d'un point sur une path :
https://stackoverflow.com/questions/32788556/svg-find-orientationangle-of-a-point-to-the-x-axis-on-a-path

un tuto : http://icanbecreative.com/article/animate-element-along-svg-path/
une démo : https://codepen.io/realjameal/pen/gpzZGw

ces functions renvoient  getPointAtLength(t)  getTotalLength() en tenant compte de la tangente :
https://github.com/rveciana/svg-path-properties


## timeline
https://github.com/vorg/timeline.js
https://github.com/zz85/timeliner

## Manipuler le dom
https://htmldom.dev

Quadtree, une structure de données utile pour simplifier des opérations comme la détection de collisions en réduisant le nombre de tests à réaliser :
en gros, du binary-tree appliqué à des surfaces
https://thecodingtrain.com/CodingChallenges/098.1-quadtree.html


## A suivre :
- finir poc jeu carte
    - state machine,
    - décors

- structure d'une scène : trouver un modele d'organisation
    - ressources json 
        - description des persos, 
        - eventimes
        - paramètres des scripts
    - css
    - scripts et dépendances
    - index 
    - lazy loading
    - les ressources associent données et code, comment combiner ?
    - il y aura des ressources core, des ressources partagées sur un projet, sur une scène 

- intégration de composants :
    - audio,
    - video,
    - chunck : intégrer du html/svg, accéder via les id à certains éléments et les piloter comme un composant à part entière
    - contenus texte : 
        - objet avec une clé de langue
        - texte direct
        - micro-intéractions
    - contenu slot : disparition du layer, définition d'un contenu slot
    - autoslot : si slot unique, le conteneur est un slot ?
    - formulaire : 
        - composants : bouton, boites à cocher...
        - script générant des boites completes :
            - puce
            - image
            - déclencheurs
            - coches et validations intermédiaires
        - straps questionnaire
            - un strap gere les regles de saisie,
            - un second la validation
            - un troisième les side-effects (scorm, score..., redirection)
        - script carousel
            - gere le comportement d'un carousel avec 
            - une liste de persos,
            - des boutons avancer / recul / pause 
    - path : déplacement sur un trajet
    - points : points de référence
    - motifs svg
    - rosaces (ou super ellipse)

- pilote de scène et chapitres (précédent / suivant / sommaire)
- layout de base : scènes imbriquées ?  
- timeline !!
- mode Pause : des composants s'activent lorsque la télécommande est en mode pause

La plupart de ces éléments appartiennent à l'app "Player" 
Eso est le composant chargé du rendu des Persos (Perso = Eso + attributes + events).
attributes + events sont très liés à la librairie employée, pour l'instant ils sont traités à part. Une librairie qui utiliserait une fonction "h" ou jsx  aurait une autre interface.


### layer est-il necessaire ?
les slots sont répertoriés dans leur propre table, auquel on peut accéder directement. 
Layer est un bloc normal avec un content d'un ou plusieurs slots. En construisant un layer avec une grille, il y a moins de complications à construire le layer, qui perd de sa spécificité.
-> supprimer le layer :
- retirer la reference dans la propriété move à layer
- garantir aux slots un nom unique

Pourquoi garder le slot comme élément du DOM et pas comme simplement une référence à n'importe quel objet ? 
- le slot a des caractéristiques propres :
    - un element flex pour pre-positionner son contenu par défaut;
    - un groupe de slots sera soit empilé, soit cote à cote en liste
    - un slot est responsif, et simplifie les positionnements (c'est à voir)
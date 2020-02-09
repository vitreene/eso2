Démontrer que hyperhtml est convenable pour le projet :

les objets Factotum (ex-Actor) sont construits en composant :
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
- modification de l'objet lui-meme : **factotum**

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
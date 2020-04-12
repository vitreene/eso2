# Editeur
commment le definir ?
Editeur est composé de plusieurs modules : 
- Summary : gérer les scénarios et parcours
- Scene : editeur de scene, avec des sous-composants :
    - vue principale,
    - evenements temporels
    - interface


Il s'appuie sur Eso. l'editeur serait une app Eso elle-meme. Chaque objet édité hériterait d'interactions 
un objet "editeur" se superpose à l'objet édité, prend ses dimensions, lit son état, propose une interface d'édition

Faut-il un store géré par mobx par exemple ? 
utiliser Lerna pour juxtaposer plusieurs apps partageant un code commun ?

L'editeur ne touche qu'une scene à la fois.
il permet de créer et définir des Persos : props.initial
Il gere une ligne de temps ou l'on peut ajouter des evenements. 
On peut se déplacer dans le temps, les objets se synchronisant.
on peut ajouter un evenement à un objet, et définir son nouvel état.
à chaque objet sélectionné, apparait une grille permettant 
- le déplacement,
- la rotation,
- le changement de dimensions
- ou un effet d'echelle 
un menu contextuel permet d'acceder à ces propriétés, et aussi à toutes les autres :
- traitement des classes css
- id,
- source image,
- ajout d'événements
- intéractions.

Opérations sur les objets :
- supprimer/ajouter,
- dupliquer un Perso,
- copier/coller des propriétés,
- sélection de groupe

L'éditeur est partagé en panneaux :
- scene : 
    - sélection des persos
    - placement et modifications directes
    - attribution d'un slot
- outils : ajout de persos, mode selection 
- timeline :
    - definir la durée de la scene
    - medias temporels (audio, video)
    - table d'évents

## Quelles technos ?
state : mobx
lerna ou yarn workspaces ?
https://www.alexisjanvier.net/monorepo

svelte, React ?
Tailwind ui  pour les composants ?

## comment commencer ?
- par l'interface ? 
- la sélection des objets


La scene en mode Edition :
dans un premier temps, 
 - ignorer la timeline.
 - créer une scene
    - echelle de la scène
 - ajouter des Persos
un composant se superpose au Perso, qui permet de :
 - selectionner/déselectionner le perso
 - ajoute des poignées : redimensionner, déplacer, tourner, mettre à l'échelle, incliner
 - active le panneau propriétés du Perso
 Le perso n'est pas touché, on ne mélange pas les propriétés

Lecture et enregistrement des persos
-> utiliser un store, puis localstorage / bdd et générer un json

Timeline 
sur une ligne de temps, déplacer un curseur permet de mettre à jour l'état des Persos. 
Persos selectionné -> Ajouter un event :
- choisir un event enregistré ou en saisir un nouveau
-  le panneau propriétés se met à jour 
- on peut naviguer ensuite parmi les events sur lesquels on est intervenu

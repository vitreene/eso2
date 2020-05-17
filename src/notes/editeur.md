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
 - selection de groupe

Lecture et enregistrement des persos
-> utiliser un store, puis localstorage / bdd et générer un json

Timeline 
sur une ligne de temps, déplacer un curseur permet de mettre à jour l'état des Persos. 
Persos selectionné -> Ajouter un event :
- choisir un event enregistré ou en saisir un nouveau
-  le panneau propriétés se met à jour 
- on peut naviguer ensuite parmi les events sur lesquels on est intervenu



1. selectionner un objet 

2. propager une modification de l'éditeur sur l'objet lui-meme. 
Un store sera plus simple pour cela.
utiliser MST et mobx ?

Les schémas
collections :
#### Persos: [Story]
Story
    - id
    - nature
    - initial: Eso
    - emit: [Emit]
    - listen: [Event]
    - actions : [Eso]

Eso 
    - statStyle : CSSstyle
    - dynStyle : CSSstyle
    - className : string
    - dimensions : {
        width? : string | number, 
        height? : string | number, 
        ratio? : number
        }
    - transition : {
        from: CSSstyle | string , 
        to: CSSstyle | string , 
        duration, 
        ease, 
        repeat 
        }
    - attr: {any}
    - content : string | number | 
                [SlotDefinition] | TextDefinition | HtmlDefinition | SVGDefinition


     (dans actions):
    - move {layer?, slot, rescale} 
    ou bien 
    - slot: string, 
    - rescale: booleen


SlotDefinition 
    - id
    - className?
    - statStyle?

// clés de texte
TextDefinition 
    - lang?: string
    - key: string
    - effect?: string

HtmlDefinition : textHtml | html



Il y a matière a faire un article comme celui-ci au sujet du resize :
https://medium.com/the-z/making-a-resizable-div-in-js-is-not-easy-as-you-think-bda19a1bc53d

..et celui-ci s'arrete assez tot.

https://stackoverflow.com/questions/22257408/user-resizable-and-user-rotatable-shapes-on-canvas-with-wpf




# Editeur : mise en place
1. layout
- une zone, à gauche, pour créer, puis organiser les blocs
- une zone, à droite, pour éditer le bloc sélectionné


2.la scene
occupe la partie centrale disponible sur l'écran.
y montrer la scene vituelle, dans ses proportions
determiner ce qui appartient au layout, et ce qui reveint à la scene elle-meme : les layers, notamment.
- le zoom est obligé.

3.interface

créer un bloc  :
- chosir le type de bloc
- cliquer ou tracer un bloc à l'écran
- l'objet est créé, l'éditeur affiche les parametres du bloc

créer un bloc, plusieurs possibilités :
-  * choix préalable d'un type, 
    - en cliquant un bouton
    - * option d'un select
- choix a posteriori
    - d'abord tracer un bloc, puis lui attribuer une fonction
- choix libre, il est possible de changer la destination d'un bloc en cours de route. Héritage des éléments communs
cette fonction ne peut etre mise en place que dans une version mature de l'interface.

- la sélection d'un bloc "arme" le pointer, un tracé est possible qui génére un bloc selon le choix fait.
- une modale propose d'entrer quelques parametres de base :
- id, avec proposition par défaut, verif de l'unicité
- placement : quel slot ? ce n'est pas requis par initial
- dimensions : facultatif ; 
    - le perso prend par défaut les dimensions de son parent. Contradictoire avec la notion de tracer un bloc pour le créer 
    - un bloc texte ou image peut etre défini par son contenu
un bloc créé est défini par sa nature, comme il faut bien le placer quelque part provisoirement, la position est enregistrée à la création dans une action "enter" distincte de 'inital'. 
"enter" pourra etre réécrite plus tard



## fonctionnement de l'editeur
l'editeur doit pouvoir charger une scene :
- lister les Persos,
- lister les evenements
    les événements sont placés sur une timeline 
    déplacer la tete de lecture pour afficher les persos 
- comment lire le fichier de scene dans le contexte de l'éditeur
Dans un premier temps, ignorer les persos générés et les layers

Faut-il dupliquer la logique du Player et tenter plus tard d'adapter à l'éditeur ?
-> oui


## référents de coordonnées
- les persos sont placés dans des layers; leur position est fonction de leur parent.
- le cadre d'édition est placé sur un layer supérieur, dans un autre référent de coordonnées. 
les mesures doivent se faire dans le cadre général et ensuite ramenés dans le contexte des persos.
- les mesures du pointeur sont relatives, normalement tout élément correctement positionné doit se déplacer à l'identique dans son contexte.
- prévoir de mesurer un groupe sélectionné

décaleage initial et au resize du perso et de son editeur
- soit le probleme est simple à résoudre et est lié au placment initial ;
- soit il ncessite de transposer les éléments dans la scene virtuelle , puis de calculer leur position dans leur contexte réel. 

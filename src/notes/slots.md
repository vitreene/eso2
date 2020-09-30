## Slots

Jusqu'a présent le slot est un composant à part destiné à recevoir un contenu. 
Une evolution sera de faire disparaitre le composant en soi pour permettre à n'importe quel node de recevoir un contenu.
Un node peut etre un slot s'il est répertorié en début de scène. On verra plus tard si l'on peut créer des allocations dynamiques 

- soit en l'identifiant avec son sélecteur,
- soit par son uuid garanti unique -> généré par l'appli et repetorié dans une Map
- Utiliser un sélecteur ne garantit pas l'unicité
- garantir la dispo du node au moment où on en a besoin.( ou alors gestion d'erreur)
- un slot peut etre un node enfant d'un Composant, pas nécessairement au premier niveau ; ex. layout
- un attribut uuid/key est préféré à l'id, qui ne garantit pas l'unicité
- un fallback cherche l'id si l'uuid n'existe pas
- chercher sur d'autres sélecteurs (classes, atributs) revient a chercher une liste.

=> Pour le moment, répertorier les nodes susceptibles de recevoir un contenu ( = slot) au moment de la construction de la scène.
- si un sous-élément d'un composant recoit un uuid, celui-ci est forcément dynamique, donc on peut le repérer et enregistrer.

Comment créer un nom unique : 
- à partir des id donnés aux objets créés : parent_enfant
déja utilisé pour les layouts
chaque instance à un nom propre à partir d'un radical


## Le mécanisme
- lire les données de la scène
- créer une map avec tous les éléments slots. Ces éléments ont une propriété "slot" ou bien "uuid" (qui n'est un attribut du node mais bien une propriété ?)

- à quel moment est déclaré un slot ? si un slot est contenu dans un composant, comment le récupérer ? Il ne suffit pas donc de délcarer son uuid, il faut aussi que son contenu par défaut doit etre dynamique (vraiment ?).
-> donc maintenir un composant slot  qui simplifiera son repérage ?
En entrée, 
  - son tag (div, span, aricle, g, defs pour le svg)
  - classe, style

-> si le contenu n'est pas destiné à changer, n'importe quel composant repéré convient

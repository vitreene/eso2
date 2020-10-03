# position des objets

dès que l'on fait tourner un objet ou qu'on le déforme, on ne peut plus utiliser directement les méthodes getBoundingRect ou getElementOffset.

plusieurs transformations vont s'appliquer :
- le zoom,
- les transformations sur l'objet,
- les transformations sur les parents.

l'idée serait d'appliquer aux mouvements de la souris la meme chaine de transformations pour obtenir le mouvement réellement appliqué à l'objet.
J'écarte pour le moment les transformations 3D, et skew. 

Le vecteur du mouvement de la souris serait modifié par la matrice inverse de la transformation de l'objet cible, pour que les valeurs de vecteur à appliquer soit cohérentes. (ouf)

la matrice à appliquer pourrait etre lue à partir de la propriété transform de l'objet. Cependant, il serait plus simple de mémoriser les propriétés angle et rotation de l'objet.

Dès la première sélection de l'objet, il faut mémoriser ses caractéristiques de position. dès sa création en fait.
les parametres seront enregistrés dans un objet à part, ils pourraient aussi etre disponibles dans des attributs du node. 


Resize : calculer les dimensions du cadre lorsque l'on traverse le cadre
quand width ou height deviennent négatifs, inserver le calcul et simuler le changement de poignée sélectionné


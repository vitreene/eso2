Structure du Player

Scene serait partagé entre Editeur et Player


mémo : les différentes parties de Eso


l'app est chargé de lire des scènes animées construites à partir d'un fichier de description.

Composants : une bibliothèque de composants, les plus simples sont des conteneurs.
Eso : est chargé de mettre à jour les composants (tout attributs) et de les re-rendre en cas de changement d'échelle.
Scene : gère les entrées, déplacements (re-slots) et sorties des composants
Runtime : gère les emissions d'evenements 
Strap : composants recevant des evenements et en renvoient d'autres, pas de rendus.




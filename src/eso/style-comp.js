/*
signature : 
entrée: state, props 
sortie: newProps

Le state - objet style du node - n'est pas modifié
- seules les modifications sont envoyées
- elles seront fusionnées au moment de traiter la timeline
- la timeline enregistre les modifs successives
- les modifs sont ajoutées au state dans le store

Prerender 
  - recoit à l'init et au resize la valeur de zoom, qui est mise en cache. 
  - resoud les valeurs unitless 
  - recalcule entièrement transform s'il recoit une valeur le modifiant
  sortie : style

 */

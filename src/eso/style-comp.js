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
import { css } from "emotion";

import { whiteListCssProps, positionCssProps } from "../data/constantes";
import { hasProperties } from "./lib/helpers";
import { mapRelatives } from "./lib/map-relatives";

export const doStyle = {
  css(style) {
    return css(style);
  },
  update(state, props) {
    /* 
    simplifier mapRelatives
    - les valeurs unitless peuvent le rester
    - retrait de u
    */
    const newStyle = mapRelatives(state, props);
    const position = hasProperties(positionCssProps, props) && "relative";
    return {
      ...(position && { position }),
      ...newStyle
    };
  },
  prerender(zoom = 1, style) {
    if (!style) return;
    // calculer styles : appliquer zoom sur unitless
    const newStyle = {};

    for (const prop in style) {
      if (whiteListCssProps.has(prop)) {
        const z = typeof style[prop] === "number" ? zoom : 1;
        newStyle[prop] = style[prop] * z + "px";
      } else newStyle[prop] = style[prop];
    }
    return newStyle;
  }
};

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

import { css } from 'goober';

import { whiteListCssProps, positionCssProps } from '../data/constantes';
import { hasProperties, pipe } from './lib/helpers';
import { mapRelatives } from './lib/map-relatives';
// import { removeAliasProps } from "./lib/remove-alias-props";
import { extractTransform, withTransform } from './lib/transform-comp';
export const doStyle = {
  css(style) {
    return css(style);
  },
  update(props, state) {
    /* 
    simplifier mapRelatives
    - les valeurs unitless peuvent le rester
    - retrait de u
    */
    const mapProps = mapRelatives(state);

    const newStyle = pipe(mapProps /* removeAliasProps */)(props);
    // console.log(props, newStyle);

    // FIXME pos absolute si déplacement, sinon relative ?
    const position = hasProperties(positionCssProps, props) && 'absolute';

    return {
      ...(position && { position }),
      ...newStyle,
    };
  },
  prerender(box, newStyle) {
    // console.log('BOX', box);

    if (!box) box = defaultBox;
    if (typeof box === 'number') box = { ...defaultBox, zoom: box };

    if (!newStyle) return;
    // calculer styles : appliquer zoom sur unitless
    const newRenderStyle = {};

    /* 
    FIXME si l'on passe d'une position static à absolute, appliquer offset décale l'objet !
    ca doit etre fixé ailleurs.
    */
    for (const prop in newStyle) {
      if (whiteListCssProps.has(prop) && typeof newStyle[prop] === 'number') {
        // FIXME pas ici
        // const offset = ['left', 'top'].includes(prop) ? box[prop] : 0;
        // console.log('prerender', prop, box, offset);
        // newRenderStyle[prop] = newStyle[prop] * box.zoom + offset + 'px';

        newRenderStyle[prop] = newStyle[prop] * box.zoom + 'px';
      } else newRenderStyle[prop] = newStyle[prop];
    }
    const { style, transform } = extractTransform(newRenderStyle);
    return {
      ...style,
      ...withTransform(transform, box.zoom),
    };
  },
};

const defaultBox = {
  left: 0,
  top: 0,
  width: 0,
  height: 0,
  ratio: 1,
  zoom: 1,
};

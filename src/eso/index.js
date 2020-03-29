/**
 *
 * // TODO rendre autonome la fonction d'update
 * garde -t-elle son propre state /store ?
 * a-t-elle les fonctions register, update, prerender
 * gere t-elle classes, style, attributs, events content
 * prend this.el en entrée
 *
 */

/* 
 eso accepte des modules chargés de traiter un attribut à la fois :
 modules :
 - style : le principal
    - valeurs relatives +=,-=
    - valeurs unitless : avec une grille de référence et une valeur zoom
    - valeur u ? comme vw et vh, mais rapporté au conteneur principal et non le viewport. 
    - transformation : 
        - props spéciales : x,y, dx,dy 
        - utiliser matrix pour les déplacements auto, comme reslot. remplace Support

- classes
    - classes nommées : ajout, retrait, toggle. (temp à retirer ?)
    - styles statiques transformés en classes à l'étape du rendu

- events
    - register en phase d'initialisation. 

- content
    - valeur,
    - clé,
    - html,
    - slot,
    - composant local (micro-animation)

- attributs
    
- transition 
    - prep : 
        - valider (from, to) 
        - séparer les valeurs selon la durée
    - fonction lerp pilotée par le runtime
    - on complete : callbacks en fin de transition
 
interface :
- init(data)
    - enregistrement des modules
    - ref DOM
    - application des valeurs initiales

- update(data)
    - mise à jour des data
    - appel de render

- render(zoom, cb)
    retourne les valeurs calculées pour le composant
    render est appelé par update et en cas de resize
    (note : dimensions est-il calculé dans update ou render ?)


store :
- stocke les valeurs intermediaires de chaque module, 
- les variables calculées (type pointerEvents)
- last update et last render
- callback vers la timeline ?
conserve l'état du composant

 */

/* 
 timeline:
 serait-il possible d'enregistrer seulement les diffs calculés en sortie de la fonction update
 avec une liste "changed"
 */

import { getElementOffset } from "./lib/get-element-offset";
import { registerKeyEvents } from "./lib/register-keyEvents";
import { doDimensions } from "./lib/dimensions-comp";
import { transition } from "./transitions-comp";
import { doStyle } from "./style-comp";
import { doClasses } from "./classes-comp";

import { DEFAULT_STYLES, SHORT_STYLES } from "../data/constantes";

const { css, ...dynStyle } = doStyle;
const content = {
  update(content) {
    return content;
  },
  prerender() {}
};
// TODO attr
export class Eso {
  static registerKeyEvents = registerKeyEvents;
  static getElementOffset = getElementOffset;
  constructor({ props, handler, node, id }) {
    this.store = {};
    this.handler = handler;
    this.node = node;
    this.id = id;
    this.cssClass = null;
    this.revision = {
      classes: doClasses,
      dimensions: doDimensions,
      statStyle: dynStyle,
      between: dynStyle,
      dynStyle,
      content,
      transition: transition.call(this)
    };
    this.update = this.update.bind(this);
    this.revise = this.revise.bind(this);
    this.addToStore = this.addToStore.bind(this);
    this.prerender = this.prerender.bind(this);

    this.init(props);
    return this;
  }

  init(props) {
    this.revise(props);
    this.handler();
  }

  update(props) {
    // console.log("props", props);
    // props.between && console.log("update between", this.node, this);

    // séparer : calculer les diffs, puis assembler
    // les diffs seront stockés pour la timeline (il faut le time)
    this.revise(props);
    this.prerender();
  }

  revise(props) {
    const newState = new Map();
    for (const revise in this.revision) {
      if (props[revise]) {
        const diff = this.revision[revise].update(
          props[revise],
          this.store[revise]
        );
        newState.set(revise, diff);
      }
    }
    this.addToStore(newState);
  }

  addToStore(state) {
    state.forEach((diff, revise) => {
      switch (revise) {
        case "dynStyle":
        case "statStyle":
        case "dimensions":
          this.store[revise] = { ...this.store[revise], ...diff };
          break;
        case "between":
          this.store["dynStyle"] = { ...this.store["dynStyle"], ...diff };
          break;
        case "classes":
        case "content":
          // console.log(this.id, revise, diff);
          this.store[revise] = diff;
          break;
        case "transition":
          // où et pour qui cette info sera utile ? pour timeline ?
          break;

        default:
          break;
      }
      // console.log("dynStyle", this.store.dynStyle);
    });
  }

  compiled = () => compiledStyles(this.store);

  // TODO  mise en cache des classes
  prerender(zoom) {
    zoom && (this.zoom = zoom);
    // calculer styles : appliquer zoom sur unitless
    // transformer style statique  + dimensions + pointerevent en classe

    const { dynStyle, statStyle, dimensions, classes, ...other } = this.store;
    // const pointerEvents = options.pointerEvents ? "all" : "none";
    const style = this.revision.dynStyle.prerender(this.zoom, dynStyle);

    if (statStyle || dimensions) {
      this.cssClass = css(
        this.revision.dynStyle.prerender(this.zoom, {
          ...statStyle,
          ...dimensions
          //   ,pointerEvents
        })
      );
    }

    const theClasses = this.revision.classes.prerender(this.cssClass, classes);

    const newState = {
      style,
      class: theClasses,
      ...other
    };

    this.handler(newState);
  }
}

function compiledStyles({ dynStyle, statStyle, dimensions }) {
  const flatStore = { ...statStyle, ...dimensions, ...dynStyle };
  const store = {};
  for (const prop in DEFAULT_STYLES) {
    if (flatStore.hasOwnProperty(prop)) store[prop] = flatStore[prop];
  }
  // retirer les raccourcis
  for (const [key, value] of Object.entries(SHORT_STYLES)) {
    if (store[key]) {
      store[value] = store[key];
      delete store[key];
    }
  }
  return store;
}

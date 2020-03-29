/**
 * transition a un profil différent, c'est un emitter
 * params transition { {from, to, duration, ease, progress, onstart, onpdate, oncomplete}}
 * params node
 * params this.update();
 * returns diff
 */

/* 
 quelle structure pour les données en entrée :
 - from et to peuvent contenir un objet, une string ou null. 
 - si  props est un tableau d'objets, chaque objet a une durée différente qui sont envoyés en meme temps.
 - from et to sont conformés. les props manquantes sont lus directement dans les computedstyles du node
 - en sortie, un emetteur envoie  un objet 
 between {style, progression, transition }
 dans addToStore, progression et transition seront utilisés pour la timeline, style est destiné à prerender
 */

import { controlAnimations } from "./lib/control-animation";
import { selectTransition, directTransition } from "./lib/select-transition";
import { fromTo } from "./lib/from-to";

export function transition(emitter) {
  const self = this;

  function update(props) {
    (Array.isArray(props) ? props : [props]).forEach(doTransition);
    return props;
  }

  function doTransition(props) {
    // FIXME from et to peuvent etre nuls ?
    const options = props.direct
      ? directTransition(props)
      : selectTransition(props);

    // from-to
    const interpolation = fromTo(options, self.store, self.node);

    //lancer la ou les transitions
    if (interpolation) {
      // mettre à jour la position avant le rafraichissement
      self.update({ between: interpolation.from });
      controlAnimations.tween({
        id: self.id,
        interpolation,
        update: interpolate,
        complete() {
          [self?.oncomplete, props?.oncomplete]
            .flat()
            .forEach(function(action) {
              if (!action) return;
              console.log("action", action);
              const { event, data } = action;

              accumulate.add(function emit() {
                emitter.emit([event.ns, event.name], data);
              });
            });
        }
      });
    }
  }

  // si plusieurs transitions en cours,
  //il faut reduire les valeurs sorties par chacune.
  const accumulate = {
    cumul: [],
    add(value) {
      if (!this.cumul.length) requestAnimationFrame(() => this.flush());
      this.cumul.push(value);
    },

    update() {
      // executer les fonctions après les updates
      let between = {};
      let fn = [];
      for (const acc of this.cumul) {
        typeof acc === "function" ? fn.push(acc) : Object.assign(between, acc);
      }
      self.update({ between });
      fn.forEach(f => f());
    },
    flush() {
      this.update();
      this.cumul = [];
    }
  };

  function interpolate(between) {
    accumulate.add(between);
  }

  return { update };
}

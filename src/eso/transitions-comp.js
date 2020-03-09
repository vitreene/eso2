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

import { selectTransition } from "./lib/select-transition";
export class Transitions {
	constructor(node, handler) {
		this.node = node;
		this.handler = handler;
		this.update = this.update.bind(this);
		// this.transition = this.transition.bind(this);
		// this.prerender = this.prerender.bind(this);
		return { update: this.update };
	}

	// props { [{from, to, duration, ease, progress, onstart, onpdate, oncomplete}]}
	update(props, state) {
		const { handler } = this;

		(Array.isArray(props) ? props : [props]).forEach(doTransition);
		return props;

		function doTransition(props) {
			// FIXME from et to peuvent etre nuls ?
			const transition = selectTransition({ to: null }, props);
			console.log("transition", props, transition);

			const between = { between: props };
			handler(between);
		}
	}
}

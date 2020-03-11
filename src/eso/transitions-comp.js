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

export function transition() {
	const self = this;

	function update(props) {
		(Array.isArray(props) ? props : [props]).forEach(doTransition);
		return props;
	}

	function doTransition(props) {
		// FIXME from et to peuvent etre nuls ?
		const options = selectTransition(props.to, props.from);
		const transition = options;
		// const transition = fromTo(options, node);

		console.log("transition", props, transition);
		// from-to

		//lancer la ou les transitions

		// si plusieurs transitions en cours, il faut reduire les valeurs sorties par chacune. cela se fait dans between, ou dans le Eso.prerender ? ;
		const between = { between: transition.to };

		self.update(between);
	}
	return {
		update
	};
}

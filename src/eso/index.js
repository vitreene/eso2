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
import { doDimensions as dimensions } from "./lib/dimensions-comp";
import { doStyle } from "./style-comp";
import { doClasses } from "./classes-comp";
const { css, ...dynStyle } = doStyle;
const classes = doClasses;

export class Eso {
	constructor(props, handler) {
		this.store = {};
		this.handler = handler;
		this.revision = { classes, dimensions, statStyle, dynStyle, content };
		this.update = this.update.bind(this);
		this.prerender = this.prerender.bind(this);
		this.init(props);
		return { update: this.update, prerender: this.prerender };
	}
	init(props) {
		this.revise(props);
		this.handler();
	}

	update(props) {
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
				case "classes":
				case "content":
					this.store[revise] = diff;
					break;
				default:
					break;
			}
		});
	}

	prerender(zoom) {
		zoom && (this.zoom = zoom);
		// calculer styles : appliquer zoom sur unitless
		// transformer style statique  + dimensions + pointerevent en classe

		const { dynStyle, statStyle, dimensions, classes, ...other } = this.store;
		// const pointerEvents = options.pointerEvents ? "all" : "none";

		const style = this.revision.dynStyle.prerender(this.zoom, dynStyle);

		const cssClass =
			(statStyle || dimensions) &&
			this.revision.dynStyle.prerender(this.zoom, {
				...statStyle,
				...dimensions
				//   ,pointerEvents
			});
		console.log("cssClass", cssClass);

		const theClasses = this.revision.classes.prerender(css(cssClass), classes);

		const newState = {
			style,
			class: theClasses,
			...other
		};

		console.log("newState", newState);

		this.handler(newState);
	}
}

const content = {
	update(content) {
		return content;
	},
	prerender() {}
};

const statStyle = dynStyle;

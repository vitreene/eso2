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

export class Eso {
	constructor(init, handler) {
		this.store = {};
		this.handler = handler;
		this.revise = { style, content };
		this.update = this.update.bind(this);
		this.prerender = this.prerender.bind(this);
		this.init(init);
		return { update: this.update, prerender: this.prerender };
	}
	init(props) {
		this.update(props);
	}

	update(props) {
		const newState = {};
		for (const revise in this.revise) {
			props[revise] &&
				(newState[revise] = this.revise[revise](this.store, props));
		}
		this.store = newState;
		this.prerender();
	}

	prerender(zoom) {
		this.handler(this.store);
	}
}

function style(state, props) {
	return { ...state.style, ...props.style };
}
function content(state, { content }) {
	return content;
}

/**
 * transition a un profil différent, c'est un emitter
 * params transition { [{from, to, duration, ease, progress, onstart, onpdate, oncomplete}]}
 * params node
 * params this.prerender();
 * returns diff
 */

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
		return (Array.isArray(props) ? props : [props]).map(transition);

		function transition(props) {
			console.log("transition", props);
			return props;
		}
	}
}

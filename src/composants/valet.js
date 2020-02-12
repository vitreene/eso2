import { Component } from "hyperhtml";
export class Valet extends Component {
	constructor({ id, ...props }) {
		super();
		this.setState(props);
		this.id = id;
		this.revise = { style, content };
	}
	onconnected() {
		console.log("valet ", this.id, " connected");
	}
	ondisconnected() {
		console.log("ondisconnected", this.id, this._wire$.getBoundingClientRect());
	}
	// entrée du composant
	// cycles / révisions
	update(props) {
		const newState = {};
		for (const revise in this.revise) {
			props[revise] &&
				(newState[revise] = this.revise[revise](this.state, props));
		}
		this.engage(newState);
	}

	engage(newState) {
		console.log("newState", newState);
		this.setState(newState);
	}
	render() {
		return this.html`
    <div id=${this.id} style=${this.state.style} onconnected=${this}  ondisconnected=${this}>${this.state.content}</div>`;
	}
}

function style(state, props) {
	return { ...state.style, ...props.style };
}
function content(state, { content }) {
	return content;
}

import { Component } from "hyperhtml";

export class Slot extends Component {
	constructor({ id, children }) {
		super();
		this.id = id;
		this.setState({ children });
	}
	onconnected() {
		console.log("Slot onconnected");
	}
	handleEvent(e) {
		switch (e.type) {
			case "mousedown":
				console.log("onmousedown");
				break;
			case "mouseup":
				console.log("up", e.clientX, e.clientY);
				break;
			default:
				break;
		}
	}
	render() {
		return this.html`
          <article id=${this.id} onconnected=${this} onmousedown=${this} onmouseup=${this} >${this.state.children}</article>`;
	}
}

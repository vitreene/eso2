import { Component } from "hyperhtml";
export class Valet extends Component {
	constructor({ id, ...props }) {
		super();
		this.setState(props);
		this.id = id;
	}
	onconnected() {
		console.log("valet connected");
	}
	ondisconnected() {
		console.log(
			"ondisconnected",
			this.state,
			this._wire$.getBoundingClientRect()
		);
	}
	update(props) {
		const { style: propsStyle, ...others } = props;
		const style = { ...this.state.style, ...propsStyle };
		this.setState({ ...this.state, ...others, style });
	}
	render() {
		return this.html`
    <div id=${this.id} style=${this.state.style} onconnected=${this}  ondisconnected=${this}>${this.state.content}</div>`;
	}
}

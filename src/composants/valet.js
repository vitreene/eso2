import { Component } from "hyperhtml";
export class Valet extends Component {
  constructor(props) {
    super();
    this.setState(props);
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
    <div style=${this.state.style} onconnected=${this}  ondisconnected=${this}>${this.state.content}</div>`;
  }
}

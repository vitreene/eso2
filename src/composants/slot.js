import { Component } from "hyperhtml";

// TODO flex, position interne classes atomiques ?
export class Slot extends Component {
  constructor({ id, children }) {
    super();
    this.id = id;
    this.setState({ children });
  }
  onconnected() {
    console.log("Slot onconnected");
  }

  render() {
    return this.html`
          <article id=${this.id} onconnected=${this}  >${this.state.children}</article>`;
  }
}

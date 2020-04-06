import { Component } from "hyperhtml";
import { css } from "emotion";
export class Slot extends Component {
  constructor(content) {
    super();
    this.id = content.id;
    this.class = css`
      ${content.statStyle}
    `;
  }
  render() {
    return this
      .html`<article id=${this.id} class=${this.class}>${this.state.children}</article>`;
  }
}

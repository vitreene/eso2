import { Component } from 'hyperhtml';

import { css } from 'goober';

export class Slot extends Component {
  constructor(content) {
    super();
    this.id = content.id;
    this.class = css`
      position: relative;
      ${content.statStyle}
    `;
  }
  update(content) {
    this.setState({ content });
  }

  render() {
    return this
      .html`<article id=${this.id} class="slot ${this.class}">${this.state.content}</article>`;
  }
}

import { Component } from "hyperhtml";
import { css } from "emotion";

import { joinId } from "../eso/lib/helpers";
// import { emitter } from "../scene/init";
import { Perso } from "./Perso";
import { slots } from "./Root";

export class Layer extends Perso {
  static nature = "layer";
  constructor(story, emitter) {
    super(story, emitter);
    this.update({
      content: innerLayer(story.initial.content, this.id)
    });
  }
  render() {
    return this.html`
    <section 
      id=${this.id} 
      style=${this.state.style} 
      class=${this.state.class} 
      onconnected=${this}
      ondisconnected=${this}
      >
      ${this.state.content}
      </section>`;
  }
}

function innerLayer(content, layerId) {
  if (!content || Object.keys(content).length === 0) return;
  const layer = [];
  for (const config of content) {
    const id = joinId(layerId, config.id);
    const slot = new Slot({ statStyle: config.statStyle, id });
    layer.push(slot);
    slots.set(id, slot);
  }
  return layer;
}

class Slot extends Component {
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

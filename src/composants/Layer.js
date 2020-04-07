import { Perso } from "./Perso";
import { Slot } from "./Slot";
import { joinId } from "../eso/lib/helpers";

export const slots = new Map();

export class Layer extends Perso {
  static nature = "layer";
  constructor(story, emitter) {
    super(story, emitter);
    this.update({
      content: innerLayer(story.initial.content, this.id),
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

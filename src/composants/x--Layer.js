import { Slot } from "./Slot";
import { layerDefs } from "../stories/layers";
import { joinId } from "../eso/lib/helpers";
import { emitter } from "../scene/init";

import { Perso } from "./Perso";

export class Layer extends Perso {
  static nature = "layer";
  constructor(story, emitter) {
    super(story, emitter);
    //disponible immédiatement
    this.update({ enter: true });
  }
  render() {
    return this.html`
    <section 
      id=${this.id} 
      style=${this.state.style} 
      class=${this.state.class} 
      >
      ${this.state.content}
      </section>`;
  }
}

const prefix = "s0";
const slots = new Map();
const layers = new Map(layerDefs.map(createLayer));

function createLayer(config) {
  const layer = Array.from(Array(config.length).keys(), key => {
    const slotId = prefix + (key + 1);
    const id = joinId(config.id, slotId);
    slots.set(id, new Slot({ id }));
    return slots.get(id);
  });

  const story = {
    id: config.id,
    nature: "layer",
    initial: {
      content: layer
    }
  };
  // return layer;
  return [config.id, new Layer(story, emitter)];
}

export { slots, layers };

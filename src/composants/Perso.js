// https: stackoverflow.com/questions/46165545/access-dom-when-using-hyper-component

import { Eso } from "../eso";

export class Perso extends Eso {
  constructor(story, emitter) {
    super(story, emitter);
    const { id, emit } = story;
    this.id = id;
    this.registerEmits(emit, emitter);
  }

  handleEvent(e) {
    console.log("handleEvent", e.type, this.state);
    this.emit[e.type] && this.emit[e.type]({ e, store: () => this.store() });
  }

  registerEmits(emit, emitter) {
    const keyEvents = Eso.registerKeyEvents(emit, emitter);
    this.emit = keyEvents || {};

    if (!keyEvents) return;
    for (const event in keyEvents) {
      this.node.addEventListener(event, this);
    }
    this.update({ statStyle: { pointerEvents: "all" } });
  }
}

export class Bloc extends Perso {
  static nature = "bloc";

  render() {
    return this.html`<div id=${this.id} 
      style=${this.state.style} 
      class=${this.state.class} 
      >${this.state.content}</div>`;
  }
}

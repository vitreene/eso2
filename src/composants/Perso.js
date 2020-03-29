// https: stackoverflow.com/questions/46165545/access-dom-when-using-hyper-component

import { Component } from "hyperhtml";
import { Eso } from "../eso";

export class Perso extends Component {
  constructor(story, emitter) {
    super();
    super().node = this.render();
    const { id, initial, emit } = story;
    const { compiled, update, prerender } = new Eso({
      id,
      props: initial,
      node: this.node,
      handler: props => this.setState(props),
      emitter
    });
    this.id = id;
    this.update = update;
    this.store = compiled;
    this.prerender = prerender;
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

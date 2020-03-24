import { Component } from "hyperhtml";
import { Eso } from "../eso";

export class Perso extends Component {
  static nature = "bloc";
  constructor(story, emitter) {
    super();
    const { id, initial, emit } = story;
    const { update, prerender } = new Eso(
      initial,
      props => this.setState(props),
      () => this._wire$,
      id
    );
    this.id = id;
    this.update = update;
    this.prerender = prerender;
    this.registerEmits(emit, emitter);
  }

  handleEvent(e) {
    console.log("handleEvent", e.type, this.state);
    this.emit[e.type] && this.emit[e.type](e);
  }
  registerEmits(emit, emitter) {
    const keyEvents = Eso.registerKeyEvents(emit, emitter);
    this.emit = keyEvents || {};
    if (!keyEvents) return;
    for (const event in keyEvents) {
      this._wire$.addEventListener(event, this);
    }
  }
  render() {
    return this
      .html`<div id=${this.id} style=${this.state.style} class=${this.state.class} >${this.state.content}</div>`;
  }
}

/* 
// FAIL : recree un tag à chaque render
function createRawAttributes(){
	const click = false;
    const rawAttributes = {
      "<div id=": this.id,
      " style=": this.state.style,
      ...(click && { " onclick=": this }),
      " onconnected=": this,
      " ondisconnected=": this,
      ">": this.state.content
    };
    const tagClose = "</div>";

    const rawStrings = Object.keys(rawAttributes);
    rawStrings.push(tagClose);
    const rawProps = Object.values(rawAttributes);
    return this.html(rawStrings, ...rawProps);

} */

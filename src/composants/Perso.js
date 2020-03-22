import { Component } from "hyperhtml";
import { Eso } from "../eso";

function registerEmits(emits) {
  this.emit = emits || {};
  for (const emit in emits) {
    this._wire$.addEventListener(emit, this);
  }
}
export class Perso extends Component {
  constructor({ id, emit, ...props }) {
    super();
    const { update, prerender } = new Eso(
      props,
      props => this.setState(props),
      () => this._wire$,
      id
    );
    this.id = id;
    this.update = update;
    this.prerender = prerender;
    registerEmits.call(this, emit);
  }

  handleEvent(e) {
    console.log("handleEvent", e.type, this.state);
    this.emit[e.type] && console.log(this.emit[e.type]);
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

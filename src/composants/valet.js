import { Component } from "hyperhtml";
import { Eso } from "../eso";

function registerEmits(emits) {
  this.emit = emits || {};
  for (const emit in emits) {
    this._wire$.addEventListener(emit, this);
  }
}
export class Valet extends Component {
  constructor({ id, emit, ...props }) {
    super();
    this.id = id;
    this.update = new Eso(props, props => this.setState(props));
    // this.setState(props);
    // this.revise = { style, content };
    registerEmits.call(this, emit);
  }

  // entrée du composant
  // cycles / révisions
  /*   update(props) {
    const newState = {};
    for (const revise in this.revise) {
      props[revise] &&
        (newState[revise] = this.revise[revise](this.state, props));
    }
    this.engage(newState);
  }

  engage(newState) {
    console.log("newState", newState);
    this.setState(newState);
  }
 */
  handleEvent(e) {
    console.log("handleEvent", e.type, this.state);
    e.type === "connected" && this.onconnected();
    e.type === "disconnected" && this.ondisconnected();

    this.emit[e.type] && console.log(this.emit[e.type]);
  }
  onconnected() {
    console.log("valet ", this.id, " connected", this.state);
  }
  ondisconnected() {
    console.log("ondisconnected", this.id, this._wire$.getBoundingClientRect());
    // this.emit.click && this._wire$.removeEventListener("click", this);
  }
  render() {
    return this
      .html`<div id=${this.id} style=${this.state.style}   onconnected=${this} ondisconnected=${this}>${this.state.content}</div>`;
  }
}

/* function style(state, props) {
  return { ...state.style, ...props.style };
}
function content(state, { content }) {
  return content;
} */
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

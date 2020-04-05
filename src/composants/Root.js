import { Component } from "hyperhtml";
import { CONTAINER_ESO } from "../data/constantes";
////////////////////////////////////////////////
export const slots = new Map();

export class Root extends Component {
  constructor(activateZoom) {
    super();
    this.activateZoom = activateZoom;
  }
  onconnected() {
    this.removeZoom = this.activateZoom();
  }
  ondisconnected() {
    this.removeZoom();
  }
  render() {
    return this.html`<div 
      id=${CONTAINER_ESO} 
      class="container" 
      onconnected=${this}
      ondisconnected=${this}
      >${this.state.content}</div>`;
  }
}

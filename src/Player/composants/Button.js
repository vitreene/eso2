import { Perso } from "./Perso";
export class Button extends Perso {
  static nature = "button";
  render() {
    return this.html`<button id=${this.id} 
      style=${this.state.style} 
      class=${this.state.class} 
      >${this.state.content}</button>`;
  }
}

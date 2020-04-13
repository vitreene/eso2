import { Perso } from "./Perso";
export class Bloc extends Perso {
  static nature = "bloc";
  render() {
    return this.html`<div id=${this.id} 
      style=${this.state.style} 
      class=${this.state.class} 
      >${this.state.content}</div>`;
  }
}

import { Perso } from "./Perso";

const meetOrSlice = "slice";
const viewBox = "0 0 605 316";

export class Img extends Perso {
  static nature = "img";

  render() {
    // console.log("this.state.style", this.id, this.state.style);
    return this.svg`<svg
       id=${this.id}
         style=${this.state.style}
         class=${this.state.class}   
      viewBox=${viewBox}
      preserveAspectRatio=${"xMidYMid " + meetOrSlice}
    >
      <image
      xlink:href=${this.state.content}
        width="100%"
        height="100%"
      />
    </svg>`;
  }
}

//   render() {
//     return this.html`<img
//     id=${this.id}
//     src=${this.state.content}
//       style=${this.state.style}
//       class=${this.state.class}
//       onconnected=${this}
//       ondisconnected=${this}
//       />`;
//   }

/* 
    // switch (e.type) {
    //   case "disconnected":
    //     this.disconnected();
    //     break;
    //   case "connected":
    //     this.connected();
    //     break;
    //   default:
    //     break;
    // }
disconnected() {
    this.lastOffset = Eso.getElementOffset(this._wire$.parentNode);
    console.log("this.lastOffset", this.lastOffset);
    console.log("this._wire$.parentNode", this._wire$.parentNode);
  }
  connected() {
    if (!this.lastOffset) return;
    this.actualOffset = Eso.getElementOffset(this._wire$.parentNode);
    console.log("this.actualOffset", this.actualOffset);
    console.log("this._wire$.parentNode", this._wire$.parentNode);
    const from = {
      width: this.lastOffset.width,
      height: this.lastOffset.height
    };
    const to = {
      width: this.actualOffset.width,
      height: this.actualOffset.height
    };
    this.update({ transition: { from, to, direct: true } });
  }
 */

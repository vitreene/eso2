import { Perso } from "./Perso";
// import { imagesCollection } from "../scene/init";

// cache l'implémentation
const constrainImage = {
  contain: "meet",
  cover: "slice",
  meet: "contain",
  slice: "cover",
  undefined: "slice"
};
export function createImgClass(imagesCollection) {
  return class Img extends Perso {
    static imagesCollection = imagesCollection;
    static nature = "img";
    img = {};

    constructor(story, emitter) {
      super(story, emitter);
      this.meetOrSlice = constrainImage[story.initial.fit];
    }

    update(props) {
      super.update(props);
      this.img = Img.imagesCollection.get(this.state.content);
    }

    render() {
      const viewBox = `0 0 ${this.img?.width || 0} ${this.img?.height || 0}`;
      return this.svg`<svg
       id=${this.id}
         style=${this.state.style}
         class=${this.state.class}   
      viewBox=${viewBox}
      preserveAspectRatio=${"xMidYMid " + this.meetOrSlice}
    >
      <image
      xlink:href=${this.img?.src || ""}
        width="100%"
        height="100%"
      />
    </svg>`;
    }
  };
}
/* 
FIXME 
- precharger les images
- recupérer les dimensions
- utiliser getelementsize pour les dimensions
- ajout auto de width et height 100%
- position; absolute quand reslot

strap move est cassé !! 
la position est mal lue si les valeurs left, translate et matrix sont cumulées
-> le probleme avec rotate, scale
*/

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

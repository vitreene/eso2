import { Perso } from "./Perso";

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
    static nature = "img";
    static imagesCollection = imagesCollection;

    constructor(story, emitter) {
      super(story, emitter);
      this.meetOrSlice = constrainImage[story.initial.fit];
      this.img = {};
    }

    update(props) {
      super.update(props);
      this.img = Img.imagesCollection.get(this.state.content);
      props.fit && (this.meetOrSlice = constrainImage[props.fit]);
    }

    render() {
      const viewBox = `0 0 ${this.img?.width || 0} ${this.img?.height || 0}`;
      return this.svg`<svg
       id=${this.id}
         style=${this.state.style}
         class=${this.state.class}   
      viewBox=${viewBox}
      preserveAspectRatio=${"xMidYMid " + (this.meetOrSlice || "slice")}
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
- x precharger les images
- x recupérer les dimensions
- utiliser getelementsize pour les dimensions
- x ajout auto de width et height 100%
- position; absolute quand reslot
*/

import { Perso } from "./Perso";

export function createSpriteClass(imagesCollection) {
  return class Sprite extends Perso {
    static imagesCollection = imagesCollection;
    static nature = "sprite";
    constructor(story, emitter) {
      super(story, emitter);
      this.sprite = Sprite.imagesCollection.get(story?.initial?.content);
      this.update({
        dimensions: {
          ...story.initial.dimensions,
          ratio: this.sprite.ratio
        }
      });
    }

    render() {
      return this.html`<img id=${this.id} 
      style=${this.state.style} 
      class=${this.state.class} 
      src=${this.state.content}
      alt=${this.state?.attr?.alt}
      />`;
    }
  };
}

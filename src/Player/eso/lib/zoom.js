import { round } from "./helpers";
// import { CONTAINER_ESO, DEFAULT_SIZE_SCENE } from "../data/constantes";

export class Zoom {
  static singleton = false;
  constructor(id, scene, renderOnResize) {
    if (Zoom.singleton) return this;
    Zoom.singleton = true;
    this.el = document.getElementById(id);
    this.scene = scene;
    this.renderOnResize = renderOnResize;
    this.z = this.setZoom().zoom;
  }
  get value() {
    return this.z;
  }
  unZoom = obj => {
    if (obj.constructor !== Object) return obj;
    const o = {};
    for (const p in obj) {
      // o[p] = typeof obj[p] === "number" ? obj[p] / zoom.value : obj[p];
      o[p] = typeof obj[p] === "number" ? obj[p] / this.value : obj[p];
    }
    return o;
  };
  resize = () => {
    console.log("resize", this.z);

    const { zoom } = this.setZoom();
    this.z = zoom;
    this.renderOnResize && this.renderOnResize(zoom);
  };

  setZoom = () => {
    // determiner l'échelle du projet, comparée à sa valeur par défaut.
    const w = this.el.clientWidth;
    const h = this.el.clientHeight;
    const wZoom = w / this.scene.w;
    const hScene = wZoom * this.scene.h;

    if (hScene > h) {
      const zoom = h / this.scene.h;
      const wScene = this.scene.w * zoom;
      return round({
        w: wScene,
        h,
        ratio: wScene / h,
        zoom
      });
    } else {
      return round({
        w,
        h: hScene,
        ratio: hScene / w,
        zoom: wZoom
      });
    }
  };
}

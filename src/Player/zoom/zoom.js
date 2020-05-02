export class Zoom {
  static deZoom = (obj, zoom) => {
    if (obj.constructor !== Object) return obj;
    const o = {};
    for (const p in obj) {
      o[p] = typeof obj[p] === 'number' ? obj[p] / zoom : obj[p];
    }
    return o;
  };
  static singleton = false;
  z;
  el;
  scene;
  renderOnResize;

  /**
   *
   * @param {string} id - id de la scène
   * @param {Object} scene - dimensions de la scène virtuelle
   * @param {Number} scene.w - largeur de la scène virtuelle : 1600
   * @param {Number} scene.h - hauteur de la scène virtuelle : 900
   * @param {Number} scene.r - ratio de la scène virtuelle : 16 / 9
   * @param {function} handler - callback appelé quand le zoom change
   */

  constructor(id, scene, handler) {
    if (Zoom.singleton) return this;
    Zoom.singleton = true;
    this.el = document.getElementById(id);
    this.scene = scene;
    this.renderOnResize = handler;
    this.z = this.setZoom().zoom;
  }
  get value() {
    return this.z;
  }

  resize = () => {
    console.log('resize', this.z);

    const { zoom } = this.setZoom();
    if (this.z !== zoom) {
      this.z = zoom;
      this.renderOnResize && this.renderOnResize(zoom);
    }
  };

  unZoom(obj) {
    return Zoom.deZoom(obj, this.value);
  }
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
        zoom,
      });
    } else {
      return round({
        w,
        h: hScene,
        ratio: hScene / w,
        zoom: wZoom,
      });
    }
  };
}

export function round(obj) {
  const r = {};
  for (const e in obj) {
    r[e] = parseFloat(obj[e].toFixed(2));
  }
  return r;
}

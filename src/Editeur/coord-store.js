/* 
    calculer les valeurs de retour: 
    left, 
    top,
    width,
    height,
    rotate,
    scale
    et les enregistrer dans un store avec l'id de l'objet
    les lire quand on réedite l'objet
    les envoyer ensuite vers un module chargé de :
    - calculer le style selon la cible
    - updater le composant 
    */

export class CooStore {
  list = new Map();
  signals = new Map();
  add(id, coord) {
    const co = {
      left: coord.left,
      top: coord.top,
      width: coord.width,
      height: coord.height,
      rotate: coord.rotate,
      scale: coord.scale,
    };
    this.list.set(id, co);
  }
  read(id) {
    return this.list.has(id) ? this.list.get(id) : null;
  }
  update(id, coord) {
    // if (!this.list.has(id)) return null;
    const co = Object.assign({}, this.list.has(id) && this.list.get(id), coord);
    this.list.set(id, co);
    this.notify(id);
  }
  observe(id, handler) {
    if (!this.signals.has(id)) this.signals.set(id, new Set());
    this.signals.get(id).add(handler);
  }
  notify(id) {
    if (this.signals.has(id) && this.list.has(id))
      this.signals.get(id).forEach((handler) => handler(this.list.get(id)));
  }
  delete(id) {
    this.list.has(id) && this.list.delete(id);
    this.signals.has(id) && this.signals.delete(id);
  }
  unObserve(id) {
    this.signals.has(id) && this.signals.delete(id);
  }
  unsubscribe(id, handler) {
    if (this.signals.has(id) && this.list.has(id))
      this.signals.get(id).delete(handler);
  }
}

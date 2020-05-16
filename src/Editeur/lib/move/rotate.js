import { toFixed2, hypothenuse, RADtoDEG } from '..';

/**
 * @params this.origin
 * est passé par la fn qui appelle rotate
 * this.origin est déja modifié par zoom.
 */
export const rotate = {
  down(e) {
    this.pointer = {
      x: window.scrollX + e.clientX,
      y: window.scrollY + e.clientY,
    };
    const newPointer = {
      x: this.pointer.x / this.zoom - this.origin.x,
      y: this.pointer.y / this.zoom - this.origin.y,
    };
    this.distance = hypothenuse(newPointer.x, newPointer.y);

    console.log(this.distance, newPointer);

    this.ondown(this.id);
  },
  move(e, scaling = false) {
    const absPointer = {
      x: window.scrollX + e.clientX,
      y: window.scrollY + e.clientY,
    };
    const newPointer = {
      x: absPointer.x / this.zoom - this.origin.x,
      y: absPointer.y / this.zoom - this.origin.y,
    };
    const distance = hypothenuse(newPointer.x, newPointer.y);
    const scale = scaling ? toFixed2(distance / this.distance) : 1;
    const theta = Math.atan2(newPointer.y, newPointer.x);
    const angle = toFixed2(RADtoDEG(theta));
    this.onmove(this.id, angle, scale);
    this.pointer = newPointer;
  },
};

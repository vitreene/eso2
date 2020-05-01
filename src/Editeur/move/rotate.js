import { toFixed2, hypothenuse, RADtoDEG } from '../lib';
export const rotate = {
  down(e) {
    this.pointer = {
      x: window.scrollX + e.clientX,
      y: window.scrollY + e.clientY,
    };
    const relPointer = {
      x: this.pointer.x - this.origin.x,
      y: this.pointer.y - this.origin.y,
    };
    this.distance = hypothenuse(relPointer.x, relPointer.y);
    this.ondown(this.id);
  },
  move(e, scaling = false) {
    this.pointer = {
      x: window.scrollX + e.clientX,
      y: window.scrollY + e.clientY,
    };
    const relPointer = {
      x: this.pointer.x - this.origin.x,
      y: this.pointer.y - this.origin.y,
    };
    const distance = hypothenuse(relPointer.x, relPointer.y);
    const scale = scaling ? toFixed2(distance / this.distance) : 1;
    const theta = Math.atan2(relPointer.y, relPointer.x);
    const angle = toFixed2(RADtoDEG(theta));
    this.onmove(this.id, angle, scale);
  },
};

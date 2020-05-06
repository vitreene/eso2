import { whichPointerAction } from './whichPointerAction';

export const translate = {
  down(e) {
    this.origin = this.origin || {
      x: window.scrollX + e.clientX,
      y: window.scrollY + e.clientY,
    };
    this.pointer = {
      x: 0,
      y: 0,
    };
    this.ondown(this.id);
  },
  move(e) {
    const absPointer = {
      x: window.scrollX + e.clientX,
      y: window.scrollY + e.clientY,
    };
    const newPointer = {
      x: absPointer.x - this.origin.x,
      y: absPointer.y - this.origin.y,
    };
    const modifiers = { shift: e.shiftKey, alt: e.altKey };
    this.actionModified = whichPointerAction(this.actionInitial, modifiers);

    this.onmove(newPointer.x, newPointer.y, this.actionModified);
    this.pointer = newPointer;
  },
};

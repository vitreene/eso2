/* 
mousedown: 
- l'objet à modifier
- sa rotation initiale
- le zoom

calculer le centre de l'élément
(eventuellement, l'angle qu'il fait avec la position de la souris comme angle initial ?)

move
calculer l'angle 
- avec alt : scale
- avec alt + shift = rotate et scale


*/

import {
  noop,
  TRANSLATE,
  RESIZE,
  ROTATE,
  SCALE,
  CONSTRAIN,
  DUPLICATE,
  HOMOTETIC,
  ROTATE_AND_SCALE,
} from '../lib/constantes';

import { toFixed2, hypothenuse, RADtoDEG } from '../lib';

export class RotateAndScale {
  origin = {
    x: 0,
    y: 0,
  };
  pointer = {
    x: 0,
    y: 0,
  };

  constructor(data) {
    this.data = data;
    // this.onRandS = data.onRandS || noop;
    this.ondown = data.ondown || noop;
    this.onmove = data.onmove || noop;
    this.onup = data.onup || noop;
    this.down = this.down.bind(this);
    this.move = this.move.bind(this);
    this.up = this.up.bind(this);
    this.down();
  }

  down() {
    const { id, e, origin } = this.data;
    e.preventDefault();
    e.stopPropagation();
    const modifiers = { shift: e.shiftKey, alt: e.altKey };
    const action = whichPointerAction(this.data.action, modifiers);
    console.log(action, modifiers);

    console.log('POINTERDOWN', id);
    document.addEventListener('pointermove', this.move);
    document.addEventListener('pointerup', this.up);

    this.origin = origin;

    this.pointer = {
      x: window.scrollX + e.clientX,
      y: window.scrollY + e.clientY,
    };

    const relPointer = {
      x: this.pointer.x - this.origin.x,
      y: this.pointer.y - this.origin.y,
    };

    this.distance = hypothenuse(relPointer.x, relPointer.y);
  }

  move(e) {
    e.preventDefault();
    e.stopPropagation();
    // console.log("MOVE", e);

    this.pointer = {
      x: window.scrollX + e.clientX,
      y: window.scrollY + e.clientY,
    };

    const relPointer = {
      x: this.pointer.x - this.origin.x,
      y: this.pointer.y - this.origin.y,
    };

    const distance = hypothenuse(relPointer.x, relPointer.y);
    const scale = toFixed2(distance / this.distance);
    const theta = Math.atan2(relPointer.y, relPointer.x);
    const angle = toFixed2(RADtoDEG(theta));

    this.onmove(this.data.id, angle, scale);
  }

  up(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('UP', e);
    document.removeEventListener('pointermove', this.move);
    document.removeEventListener('pointerup', this.up);
    this.onup(this.pointer);
  }
}

function whichPointerAction(action, modifiers) {
  const mode = (modifiers.alt ? 'alt' : '') + (modifiers.shift ? 'shift' : '');

  return actions[action][mode] ? actions[action][mode] : action;
}

const actions = {
  [TRANSLATE]: {
    shift: CONSTRAIN,
    alt: DUPLICATE,
  },
  [RESIZE]: {
    shift: HOMOTETIC,
    alt: RESIZE,
  },
  [ROTATE]: {
    alt: SCALE,
    shift: CONSTRAIN,
    altshift: ROTATE_AND_SCALE,
  },
};

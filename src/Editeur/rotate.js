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

import { dummy } from './constantes';
import { toFixed2, hypothenuse, RADtoDEG } from './lib';

export class RotateAndScale {
  center = {
    x: 0,
    y: 0,
  };
  pointer = {
    x: 0,
    y: 0,
  };

  constructor(data) {
    this.data = data;
    this.onRandS = data.onRandS || dummy;
    this.onup = data.onup || dummy;

    this.down = this.down.bind(this);
    this.move = this.move.bind(this);
    this.up = this.up.bind(this);
    this.down();
  }

  down() {
    const { id, e, rect } = this.data;
    e.preventDefault();
    e.stopPropagation();
    console.log('this.data', this.data);
    console.log('POINTERDOWN', id);
    document.addEventListener('pointermove', this.move);
    document.addEventListener('pointerup', this.up);

    // mieux à faire ?

    this.center = {
      x: rect.x + rect.width / 2,
      y: rect.y + rect.height / 2,
    };

    this.pointer = {
      x: window.scrollX + e.clientX,
      y: window.scrollY + e.clientY,
    };

    const relPointer = {
      x: this.pointer.x - this.center.x,
      y: this.pointer.y - this.center.y,
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
      x: this.pointer.x - this.center.x,
      y: this.pointer.y - this.center.y,
    };

    const distance = hypothenuse(relPointer.x, relPointer.y);
    const scale = toFixed2(distance / this.distance);
    const theta = Math.atan2(relPointer.y, relPointer.x);
    const angle = toFixed2(RADtoDEG(theta));

    this.onRandS(this.data.id, angle, scale);
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

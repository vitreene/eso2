import { noop, TRANSLATE, ROTATE, SCALE } from '../constantes';

import { whichPointerAction } from './whichPointerAction';
import { rotate } from './rotate';
import { translate } from './translate';

export class Move {
  origin = {
    x: 0,
    y: 0,
  };
  pointer = {
    x: 0,
    y: 0,
  };

  [TRANSLATE] = translate;
  [ROTATE] = rotate;
  [SCALE] = {
    down(e) {
      console.log('scale down', e);
    },
    move(e) {
      console.log('scale move');
      const scaling = true;
      // console.log(this);
      this[ROTATE].move.call(this, e, scaling);
    },
  };

  constructor(data) {
    this.e = data.e;
    this.id = data.id;
    this.origin = data.origin;
    this.actionInitial = data.action;
    this.actionModified = data.action;

    this.ondown = data.ondown || noop;
    this.onmove = data.onmove || noop;
    this.onup = data.onup || noop;
    this.down = this.down.bind(this);
    this.move = this.move.bind(this);
    this.up = this.up.bind(this);

    this.down();
  }
  down() {
    const { id, e } = this;
    e.preventDefault();
    e.stopPropagation();

    const modifiers = { shift: e.shiftKey, alt: e.altKey };
    this.actionModified = whichPointerAction(this.actionInitial, modifiers);

    console.log('POINTERDOWN', id);
    console.log(this.actionModified, modifiers);

    document.addEventListener('pointermove', this.move);
    document.addEventListener('pointerup', this.up);

    this[this.actionInitial].down.call(this, e);
  }

  move(e) {
    e.preventDefault();
    e.stopPropagation();
    // console.log('MOVE');
    if (this[this.actionModified]) this[this.actionModified].move.call(this, e);
    else this[this.actionInitial].move.call(this, e);
  }

  up(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('POINTERUP');
    document.removeEventListener('pointermove', this.move);
    document.removeEventListener('pointerup', this.up);
    this.onup(this.pointer);
  }
}

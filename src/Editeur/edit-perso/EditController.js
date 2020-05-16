import { scaleRect } from '../lib';
import { resizeAction } from './resize-action';
import { CooStore } from '../coord-store';

import {
  getElementOffsetZoomed,
  zoom,
  resizeCallbacks,
  isPerso,
  updateEditedPerso,
} from '../init';

import { EditBox } from '../layout/edit-box';
import { SCENE_ID } from '../lib/constantes';

import { updateLog } from '../layout/Log';

const coo = new CooStore();

// logique input / traitement / dispatch
export class EditController {
  static getRect(el) {
    const res = getElementOffsetZoomed(el);
    console.log(el.id, res);
    return res;
  }
  static scene = { cached: false };
  static get delta() {
    if (!this.scene.cached) {
      //   this.scene = this.getRect(scene._wire$);
      this.scene = this.getRect(document.getElementById(SCENE_ID));
      this.scene.cached = true;
    }
    return this.scene;
  }
  el;
  id;
  editor;
  action;
  scale = 1;

  constructor(el, editorScene) {
    console.log('EditController', el);

    this.el = el;
    this.id = this.el.id;
    this.editorScene = editorScene;
    this.rectSize = this.rectSize.bind(this);
    this.initResize = this.initResize.bind(this);
    this.resize = this.resize.bind(this);
    this.rotate = this.rotate.bind(this);
  }
  initEditor() {
    this.editor = new EditBox({
      target: this.id,
      zoom: zoom.value.zoom,
      rect: this.rectSize,
      ondown: this.initResize,
      onmove: this.resize,
      onRandS: this.rotate,
    });
    const delta = EditController.delta;
    const { x, y, width, height } = EditController.getRect(this.el);
    const style = {
      width,
      height,
      left: x - delta.x,
      top: y - delta.y,
    };
    const updater = isPerso(this.id)
      ? updateEditedPerso(this.id)
      : updateEditedElement(this.el);

    const box = updateEditBoxCoords(this.editor);
    resizeCallbacks.set('editor', (zoom) => box.prerender(zoom));

    coo.observe(this.id, updateLog);
    coo.observe(this.id, box.updater);
    coo.observe(this.id, updater);
    coo.update(this.id, style);
  }
  initResize(action) {
    this.action = action;
    const rect = coo.read(this.id);
    // console.log('initResize', action, rect);
    this.scale = rect.scale || 1;
    if (action !== 'edit-rotation')
      this._actionResize = resizeAction(action, rect);
  }
  _actionResize() {}
  resize(x, y, modifier) {
    const style = this._actionResize(x, y, modifier);
    coo.update(this.id, style);
  }
  rotate(_action, rotate, s = 1) {
    const scale = this.scale * s;
    coo.update(this.id, { rotate, scale });
  }
  rectSize() {
    return EditController.getRect(this.el);
  }
  mount() {
    this.initEditor();
    this.editorScene.setState({ content: this.editor });
  }
  unmount() {
    coo.unObserve(this.id);
    this.editorScene.setState({ content: null });
    resizeCallbacks.remove('editor');
  }
}

export function updateEditedElement(el) {
  return function updater({ rotate, scale, ...rect }) {
    console.log(scale);

    const transform = `transform: ${rotate && `rotate(${rotate}deg)`} ${scale &&
      `scale(${scale})`};`;
    const style = `
        left: ${rect.left}px;
        top: ${rect.top}px;
        width: ${rect.width}px;
        height: ${rect.height}px;
        ${transform}
      `;
    el.style = style;
  };
}

export function updateEditBoxCoords(el) {
  let coords = {
    rotate: 0,
    scale: 1,
    rect: {},
  };
  function updater({ rotate, scale = 1, ...rect }) {
    // const transform = `${rotate && `rotate(${rotate}deg)`} ${scale &&
    //   `scale(${scale})`}`;
    coords = { rotate, scale, rect };
    prerender();
  }
  function prerender(box = zoom.box) {
    const { rotate, scale, rect } = coords;
    const transform = `${rotate && `rotate(${rotate}deg)`}`;
    const style = {
      ...scaleRect(rect, scale, box),
      transform,
    };
    el.setState({ style });
  }

  return {
    updater,
    prerender,
  };
}

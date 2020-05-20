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
import { updateLog } from '../layout/Log';
import { CONTAINER_ESO, SCENE_CONTAINER } from '../lib/constantes';

const coo = new CooStore();

// logique input / traitement / dispatch
export class EditController {
  static rects = new Map();

  static delta(id) {
    if (!this.rects.has(id)) {
      this.rects.set(id, this.getRect(document.getElementById(id)));
    }
    return this.rects.get(id);
  }

  static getRect(el) {
    return getElementOffsetZoomed(el);
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
    const delta = EditController.delta(CONTAINER_ESO);
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

    resizeCallbacks.set('editor', function(zoom) {
      EditController.rects.clear();
      box.prerender(zoom);
    });

    coo.observe(this.id, updateLog);
    coo.observe(this.id, box.updater);
    coo.observe(this.id, updater);

    coo.update(this.id, style);
  }

  initResize(action) {
    this.action = action;
    const rect = coo.read(this.id);
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
    resizeCallbacks.delete('editor');
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
  let coords = { rotate: 0, scale: 1, rect: {} };
  return { updater, prerender };

  function getDelta() {
    const stage = EditController.delta(CONTAINER_ESO);
    const scene = EditController.delta(SCENE_CONTAINER);
    return {
      x: scene.x - stage.x,
      y: scene.y - stage.y,
    };
  }

  function updater({ rotate, scale = 1, ...rect }) {
    coords = { rotate, scale, ...rect };
    prerender();
  }

  function prerender(box = zoom.box) {
    const { rotate, scale } = coords;
    const delta = getDelta();
    const rect = {
      width: coords.width,
      height: coords.height,
      left: coords.left - delta.x,
      top: coords.top - delta.y,
    };

    const transform = `${rotate && `rotate(${rotate}deg)`}`;
    const style = {
      ...scaleRect(rect, scale, box),
      transform,
    };
    el.setState({ style });
  }
}

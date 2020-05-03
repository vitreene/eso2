import './style.css';
import { getElementOffset } from './get-element-offset';
import { selectionFactory } from './selection';
import { main, app, Scene, Editor } from './layout/layout';

import { SCENE_ID } from './constantes';
import { CooStore } from './coord-store';
import { resizeAction } from './resizeAction';
import { EditBox } from './layout/edit-box';

let elems = 'abcde'.split('');

let edit = null;
const scene = new Scene(SCENE_ID, elems);
const editor = new Editor(edit);

const coo = new CooStore();

// logique input / traitement / dispatch
class EditController {
  static getRect(el) {
    const res = getElementOffset(el);
    console.log(el.id, res);
    return res;
  }
  static scene = { cached: false };
  static get delta() {
    if (!this.scene.cached) {
      this.scene = this.getRect(scene._wire$);
      this.scene.cached = true;
    }
    return this.scene;
  }

  el;
  id;
  editor;
  action;
  scale = 1;

  constructor(el) {
    this.el = el;
    this.id = this.el.id;
    this.rectSize = this.rectSize.bind(this);
    this.initResize = this.initResize.bind(this);
    this.resize = this.resize.bind(this);
    this.rotate = this.rotate.bind(this);
  }

  initEditor() {
    this.editor = new EditBox({
      target: this.id,
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

    coo.observe(this.id, updateEditBoxCoords(this.editor));
    coo.observe(this.id, updateEditedElement(this.el));
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

  resize(x, y) {
    const style = this._actionResize(x, y);
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
    editor.setState({ content: this.editor });
  }
  unmount() {
    coo.unObserve(this.id);
    editor.setState({ content: null });
  }
}

// gere la visibilité de l'éditeur d'objet
export class EnableEdit {
  selected = new Set();
  edit = null;
  add(node) {
    console.log('add EnableEdit');
    node.classList.add('selected');
    this.edit = new EditController(node);
    this.edit.mount();
  }
  remove(node) {
    console.log('remove EnableEdit');

    node.classList.remove('selected');
    this.edit.unmount();
  }
}

export function Editeur() {
  app(scene, editor);
  const selectElement = selectionFactory(EnableEdit);
  main.addEventListener('mousedown', selectElement, false);
}

function updateEditedElement(el) {
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
function updateEditBoxCoords(el) {
  return function updater({ rotate, scale = 1, ...rect }) {
    // const transform = `${rotate && `rotate(${rotate}deg)`} ${scale &&
    //   `scale(${scale})`}`;
    const transform = `${rotate && `rotate(${rotate}deg)`}`;
    const style = {
      ...scaleRect(rect, scale),
      transform,
    };
    el.setState({ style });
  };
}

function scaleRect(rect, scale) {
  const center = {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
  return {
    left: center.x - (rect.width / 2) * scale,
    top: center.y - (rect.height / 2) * scale,
    width: rect.width * scale,
    height: rect.height * scale,
  };
}

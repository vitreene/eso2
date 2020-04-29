import './style.css';
import { Component } from 'hyperhtml';
// import { observable } from 'mobx';

import { Move } from './move';
import { RotateAndScale } from './rotate';
import { getElementOffset } from './get-element-offset';
import { selectionFactory } from './selection';
import { main, app, Scene, Editor } from './layout';

import { SCENE_ID, EDIT_ID } from './constantes';
import { CooStore } from './coord-store';
import { resizeAction } from './resizeAction';

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
  editor;
  id;
  action;

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
    console.log('initResize', action, rect);

    this._actionResize = resizeAction(action, rect);
  }

  _actionResize() {}

  resize(x, y) {
    const style = this._actionResize(x, y);
    coo.update(this.id, style);
  }

  rotate(_action, rotate, scale) {
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

// composant interface de l'éditeur d'objet
class EditBox extends Component {
  constructor(props) {
    super();
    this.props = props;
  }

  onmousedown(e) {
    e.stopPropagation();
    if (e.target.id === 'edit-rotation') {
      new RotateAndScale({
        id: e.target.id,
        e,
        onRandS: this.props.onRandS,
        onup: this.props.onup,
        rect: this.props.rect(),
      });
    } else
      new Move({
        id: e.target.id,
        e,
        ondown: this.props.ondown,
        onmove: this.props.onmove,
        onup: this.props.onup,
      });
  }
  render() {
    return this.html`
        <div id=${EDIT_ID} class="edit-pattern" style=${this.state.style} onmousedown=${this}>
          EDIT
          <div id="edit-left-top" class="box left-top" onmousedown=${this}></div>
          <div id="edit-left-bottom" class="box left-bottom" onmousedown=${this}></div>
          <div id="edit-right-top" class="box right-top" onmousedown=${this}></div>
          <div id="edit-right-bottom" class="box right-bottom" onmousedown=${this}></div>
          <div id="edit-rotation" class="box rotation" onmousedown=${this}></div>
        </div>
      `;
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
    const transform = rotate && `transform: rotate(${rotate}deg);`;
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
  return function updater({ rotate, scale, ...rect }) {
    const transform = `rotate(${rotate}deg)`;
    const style = {
      ...rect,
      transform,
    };
    el.setState({ style });
  };
}
/* 
const style = {
  left: this.style.left * scale,
  top: this.style.top * scale,
  width: this.style.width * scale,
  height: this.style.height * scale,
};
 */
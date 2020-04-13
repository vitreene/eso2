import "./style.css";
import { html } from "lighterhtml";
import { Component } from "hyperhtml";

import { getElementOffset } from "./get-element-offset";

import { main, app, scene, editor } from "./layout";
import { selectionFactory } from "./selectionFactory";
import { Move } from "./move";

let elems = "abcde".split("");
let edit = null;
function renderApp(innerElems = elems, innerEdit = edit) {
  app(scene(innerElems), editor(innerEdit));
}

class EditPerso {
  static getRect(el) {
    return getElementOffset(el);
  }
  constructor(el) {
    this.el = el;
    this.rect = EditPerso.getRect(el);
    this.resize = this.resize.bind(this);
  }
  get editor() {
    const delta = EditPerso.getRect(this.el.parentNode);
    const { width, height, x, y } = this.rect;
    const style = { width, height, left: x - delta.x, top: y - delta.y };
    console.log(style);
    // return new EditPattern({ style, resize: this.resize });
    return new editPattern({ style, resize: this.resize });
  }

  resize(action, x, y) {
    // console.log(action, x, y);
    let style = {};
    switch (action) {
      case "left-top":
        style = `
          width: ${this.rect.width - x}px;
          height: ${this.rect.height - y}px;
          left: ${this.rect.x + x}px;
          top: ${this.rect.y + y}px;
        `;
        break;

      default:
        break;
    }
    this.el.style = style;
    console.log(" this.el.style", style);
    renderApp();
  }

  show() {
    this.render(this.editor);
  }
  hide() {
    this.render(null);
  }
  render(el) {
    renderApp(undefined, el);
  }
}

const editPattern = function(props) {
  function mdown(e) {
    e.stopPropagation();
    new Move({ id: e.target.id, e, callback: props.resize });
  }

  return html`
    <div id="edit" class="edit-pattern" style=${props.style}>
      EDIT
      <div id="left-top" class="box left-top" onmousedown=${mdown}></div>
      <div id="left-bottom" class="box left-bottom" onmousedown=${mdown}></div>
      <div id="right-top" class="box right-top" onmousedown=${mdown}></div>
      <div
        id="right-bottom"
        class="box right-bottom"
        onmousedown=${mdown}
      ></div>
    </div>
  `;
};
/* 
class EditPattern extends Component {
  constructor(props) {
    super();
    this.setState({ style: props.style });
    this.callback = props.resize;
  }

  handleEvent(e) {
    e.stopPropagation();
    new Move({ id: e.target.id, e, callback: this.callback });
  }
  render() {
    return this.html`
        <div id="edit" class="edit-pattern" style=${this.state.style}>
          EDIT
          <div id="left-top" class="box left-top" onmousedown=${this}></div>
          <div id="left-bottom" class="box left-bottom" onmousedown=${this}></div>
          <div id="right-top" class="box right-top" onmousedown=${this}></div>
          <div id="right-bottom" class="box right-bottom" onmousedown=${this}></div>
        </div>
      `;
  }
}
 */
export class EnableEdit {
  selected = new Set();

  add(node) {
    node.classList.add("selected");
    this.edit = new EditPerso(node);
    this.edit.show();
  }
  remove(node) {
    node.classList.remove("selected");
    this.edit.hide();
  }
}

export function Editeur() {
  renderApp();
  const selectElement = selectionFactory(EnableEdit);
  main.addEventListener("click", selectElement);
}

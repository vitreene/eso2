import { bind, Component } from 'hyperhtml';

export class Scene extends Component {
  constructor(id, content) {
    super();
    this.id = id;
    this.setState({ content });
  }

  render() {
    return this.html`
    <div id=${this.id + '-outer'} ><div id=${this.id} >${
      this.state.content
    }</div></div>
  `;
  }
}

export class Editor extends Component {
  constructor(content, id = 'editor') {
    super();
    this.setState({ content, id });
  }
  render() {
    return this.html`
       <div id=${this.state.id}>${this.state.content}</div>
  `;
  }
}

export class Point extends Component {
  constructor(id) {
    super();
    this.id = id;
  }
  render() {
    return this.html`
       <div id=${this.id} class="dot" style=${this.state.position} ></div>
  `;
  }
}
export class BlocEditor extends Component {
  constructor(id) {
    super();
    this.id = id;
  }
  render() {
    return this.html`
         <code id=${this.id} class="text-editor"  >texte...</code>
  `;
  }
}

const blocEditor = new BlocEditor('text-editor');
export const editorPoints = new Editor(null, 'editor-points');

const container = document.getElementById('app');

export const App = (stage, editor, log) => {
  bind(container)`
<div id="left-menu">${log}</div>
<div id="main">${stage} ${editor} ${editorPoints}</div>
<div id="bottom-menu"></div>
    <div id="right-menu">${blocEditor}</div>
    `;
};

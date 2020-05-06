import { bind, Component } from 'hyperhtml';

export class Scene extends Component {
  constructor(id, elems) {
    super();
    this.id = id;
    this.setState({ elems });
  }

  render() {
    return this.html`
    <div id=${this.id}>${this.state.elems.map(
      (el) => `
            <div id=${el} class="elem">${el}</div>
          `
    )}</div>
  `;
  }
}

export class Editor extends Component {
  constructor(content, id = 'editor') {
    super();
    this.setState({ content, id });
  }
  render() {
    // console.log("this.state", this.state);
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

export const editorPoints = new Editor();
editorPoints.setState({ id: 'editor-points' });

export const main = document.getElementById('app');
export const app = (scene, editor) => {
  console.log('(scene, editor) ', scene, editor);

  bind(main)`
      ${scene} ${editor} ${editorPoints}
    `;
};

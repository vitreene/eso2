import { bind, Component } from 'hyperhtml';

export const main = document.getElementById('app');
export const app = (scene, editor) => {
  console.log('(scene, editor) ', scene, editor);
  bind(main)`
      ${scene} ${editor}
    `;
};

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
  constructor(content) {
    super();
    this.setState({ content });
  }
  render() {
    // console.log("this.state", this.state);
    return this.html`
       <div id="editor">${this.state.content}</div>
  `;
  }
}

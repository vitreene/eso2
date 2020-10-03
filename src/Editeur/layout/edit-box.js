import { Component } from 'hyperhtml';

import { Move } from '../lib/move';
import { EDIT_ID, TRANSLATE, ROTATE } from '../lib/constantes';

// composant interface de l'éditeur d'objet
export class EditBox extends Component {
  constructor(props) {
    super();
    this.props = props;
  }
  onmousedown(e) {
    e.stopPropagation();
    if (e.target.id === 'edit-rotation') {
      const rect = this.props.rect();
      const origin = {
        x: rect.x + rect.width / 2,
        y: rect.y + rect.height / 2,
      };
      new Move({
        action: ROTATE,
        id: e.target.id,
        zoom: this.props.zoom,
        e,
        ondown: this.props.ondown,
        onmove: this.props.onRandS,
        onup: this.props.onup,
        origin,
      });
    } else
      new Move({
        action: TRANSLATE,
        id: e.target.id,
        zoom: this.props.zoom,
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

import { Component, wire } from 'hyperhtml';
import { toFixed2 } from '../lib/index';
import { noop } from '../lib/constantes';

export class Log extends Component {
  handlerChange;
  unsubscribe;

  setStore(id, store) {
    if (!id) {
      this.handlerChange = noop;
      this.unsubscribe();
      this.update({});
      return;
    }
    this.handlerChange = (prop) => store.update(id, prop);
    this.unsubscribe = store.observe(id, this.update.bind(this));
    this.update(store.read(id));
  }

  handleEvent(e) {
    console.log('e.target.value', e.target.value);
    this.handlerChange({ [e.target.name]: parseFloat(e.target.value) });
  }
  update(log) {
    console.log('log', this);
    let state = '';
    if (typeof log === 'object') {
      state = [];
      for (const prop in log)
        state.push(
          wire()`<li>
            <label>${prop} : </label>
            <input name=${prop} 
            value=${toFixed2(log[prop])} 
            onchange=${this}/>
            </li>`
        );
    }

    this.setState({ log: wire()`<ul>${state}</ul>` });
  }
  render() {
    return this.html`
         <code id=${this.id} class="text-editor">${this.state.log}</code>
  `;
  }
}

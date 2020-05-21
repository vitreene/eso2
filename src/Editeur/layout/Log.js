import { Component, wire } from 'hyperhtml';
import { toFixed2, isNumeric } from '../lib/index';
import { noop } from '../lib/constantes';

export class Log extends Component {
  handlerChange;
  unsubscribe;

  setStore(id, store) {
    if (!id) {
      this.id = null;
      this.handlerChange = noop;
      this.unsubscribe();
      this.update({});
      return;
    }
    this.id = id;
    this.handlerChange = (prop) => store.update(id, prop);
    this.unsubscribe = store.observe(id, this.update.bind(this));
    this.update(store.read(id));
  }

  handleEvent(e) {
    console.log('e.target.value', e.target.value);
    this.handlerChange({ [e.target.name]: parseFloat(e.target.value) });
  }
  update(log) {
    let state = '';
    if (typeof log === 'object') {
      state = [];
      for (const prop in log) {
        const type = isNumeric(log[prop]) ? 'number' : 'text';
        const value = type === 'number' ? Math.round(log[prop]) : log[prop];
        state.push(
          wire()`
            <label  key=${prop} class="log-set-label">${prop}&ensp;<input 
            class="log-set-input"
            name=${prop} 
            type=${type}
            value=${value} 
            onchange=${this}/>
            </label>`
        );
      }
    }

    this.setState({
      log: wire()`<fieldset  class="log-set">${state}</fieldset>`,
    });
  }
  render() {
    return this.html`
         <div id="text-editor-log" class="text-editor">
  <h3>${this.id}</h3>
         ${this.state.log}
        </div>
  `;
  }
}

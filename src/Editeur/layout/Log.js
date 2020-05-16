import { Component, wire } from 'hyperhtml';
import { objToFixed } from '../lib/index';

export class Log extends Component {
  update(log) {
    let state = '';
    if (typeof log === 'object') {
      state = [];
      for (const prop in log)
        state.push(wire()`<li>${prop} : ${log[prop]}</li>`);
    }

    this.setState({ log: wire()`<ul>${state}</ul>` });
  }
  render() {
    return this.html`
         <code id=${this.id} class="text-editor">${this.state.log}</code>
  `;
  }
}
export const log = new Log();

export function updateLog(coord) {
  // console.log('updateLog', coord);

  log.update(objToFixed(coord));
}

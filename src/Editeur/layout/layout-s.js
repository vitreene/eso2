import { o, /*  h, */ html } from 'sinuous';

export function Point(id) {
  const style = o({ border: '12px solid red' });
  return {
    update: (props) => style(props),
    node: html`
      <div id=${id} class="dot" style=${style}></div>
    `,
  };
}

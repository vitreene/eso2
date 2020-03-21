import { render, html, svg } from "lighterhtml";
import { define, useState } from "hooked-elements";

import { Eso } from "../eso";

// as mixin
const LighterHTML = {
  html() {
    return render(this.element, html.apply(null, arguments));
  },
  svg() {
    return render(this.element, svg.apply(null, arguments));
  }
};

export function valetFactory({ id, emit, ...props }) {
  define(`#${id}`, {
    ...LighterHTML,

    render(element) {
      element.style = JSToCSS({
        width: "100px",
        height: "50px",
        backgroundColor: "red"
      });
      element.classList.add("toto");

      const [count, update] = useState(1);
      element.onclick = () => update(count + 1);
      this.html`<p>Hello 👋 <strong>${count}</strong> times!</p>`;
    }
  });

  return html`
    <div id=${id}></div>
  `;
}

export const JSToCSS = JS => {
  let cssString = "";
  for (let objectKey in JS) {
    cssString +=
      objectKey.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`) +
      ": " +
      JS[objectKey] +
      ";\n";
  }

  return cssString;
};
/* 
define("button.counter", {
	...LighterHTML,
	render(element) {
		const [count, update] = useState(1);
		element.onclick = () => update(count + 1);
		this.html`Hello 👋 <strong>${count}</strong> times!`;
	}
});

// or straight forward via callback and explicit render
define("my-counter", element => {
	const [count, update] = useState(0);
	render(
		element,
		html`
			<button class="large btn" onclick=${() => update(count - 1)}>-</button>
			<span class="large value">${count}</span>
			<button class="large btn" onclick=${() => update(count + 1)}>+</button>
		`
	);
});
 */

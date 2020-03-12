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

/* 
entree : 
- lastFrom, 
- actualTo,
- duration,

- styler

sortie : {from, to, duration}
*/

import { color } from "style-value-types";
import { effect } from "./effect";
import { DEFAULT_STYLES, DEFAULT_DURATION } from "../../data/constantes";

export function fromTo(options, node) {
	if (!options.from && !options.to) return null;

	const { duration = DEFAULT_DURATION } = options;

	const isObjectFrom = typeof options.from === "object";
	const isStringFrom = typeof options.from === "string";
	const isObjectTo = typeof options.to === "object";
	const isStringTo = typeof options.to === "string";

	const actualTo =
		(isObjectTo && options.to) ||
		(isStringFrom && effect[options.from].to) ||
		(isStringTo && effect[options.to].to) ||
		null;

	const lastFrom =
		(isStringTo && effect[options.to].from) ||
		(isStringFrom && effect[options.from].from) ||
		(isObjectFrom && options.from) ||
		null;

	const from = {};
	const to = {};

	// retirer les valeurs egales
	// ne garder que les props de to dans from
	// si une prop de from manque la lire depuis styler
	for (const key in actualTo) {
		let styler;
		if (lastFrom[key] === actualTo[key]) continue;
		if (lastFrom[key]) {
			from[key] = lastFrom[key];
			to[key] = actualTo[key];
		} else {
			if (!styler) styler = window.getComputedStyle(node);
			from[key] = getCssValue(key, styler);
			to[key] = actualTo[key];
		}
	}
	if (Object.keys(to).length < 1) return null;

	return {
		from,
		to,
		duration
	};
}

function getCssValue(key, styler) {
	const cssProp = styler.get(key) || DEFAULT_STYLES[key];
	const val = color.test(cssProp)
		? color.transform(cssProp)
		: isNaN(cssProp)
		? cssProp
		: parseFloat(cssProp);
	return val;
}

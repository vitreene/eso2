import { Valet } from "../composants/Valet";

/**
 *
 * crée aléatoirement des composants
 * - content : une lettre
 * - background : une couleur
 */

const colors = [
	"red",
	"blue",
	"green",
	"violet",
	"orange",
	"cyan",
	"blueviolet",
	"brown"
];
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const randColor = () => colors[Math.round(Math.random() * (colors.length - 1))];
const randLetter = () =>
	letters[Math.round(Math.random() * (letters.length - 1))];

function createValet(index) {
	const config = {
		content: randLetter(),
		style: {
			backgroundColor: randColor()
		},
		id: index
	};

	return [index, new Valet(config)];
}

export const createValets = length =>
	new Map(Array.from(Array(length).keys(), createValet));

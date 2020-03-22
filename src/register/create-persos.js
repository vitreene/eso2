import { Perso } from "../composants/Perso";

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

function createAutoPerso(index) {
  const config = {
    content: randLetter(),
    dynStyle: {
      backgroundColor: randColor()
    },
    id: index,
    emit: {
      click: {
        event: { ns: "anim", name: "add-event-list" },
        data: {
          name: "click",
          start: 0,
          events: [
            { start: 0, name: "ev100" },
            { start: 1000, name: "ev101" },
            { start: 2000, name: "ev102" }
          ]
        }
      }
    }
  };

  return [index, new Perso(config)];
}

export const createAutoPersos = length =>
  new Map(Array.from(Array(length).keys(), createAutoPerso));

const max_persos = 20;
export const persos = createAutoPersos(max_persos);

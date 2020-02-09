import { bind as hyper, wire } from "hyperhtml";
import "./style.scss";

// TAG FUNCTION
// greet`I'm ${name}. I'm ${age} years old.`
// EQUIVALENT FUNCTION
// greet(["I'm ", ". I'm ", " years old."], name, age)

const composantFactory = init => {
  const open = "<" + init.tag || "div";
  const close = "</" + init.tag + ">";
  const styleAttr = " style=";
  const classAttr = " class=";
  const openEnd = " >";
  return up =>
    wire(up, ":" + init.id)(
      [open + styleAttr, classAttr, openEnd, close],
      up.style,
      up.className || null,
      up.text
    );
};

const composants = [
  {
    id: "1",
    tag: "div",
    text: "une div",
    style: null
  },
  {
    id: "2",
    tag: "h1",
    text: "un titre",
    style: { color: "red" }
  },
  {
    id: "3",
    tag: "p",
    text: "un texte",
    style: { color: "blue" }
  }
];

let comp2 = "mise à jour";

const compup = {
  className: "toto",
  text: () => comp2,
  style: { color: "orange", backgroundColor: "yellow" }
};

let todosComposants = composants.map(composantFactory);

// show the todo list
const todos = composants.map((c, i) => todosComposants[i](c));
update(todos);

// add an item in 2 seconds
setTimeout(() => {
  const { width, height } = todos[0].getBoundingClientRect();
  console.log({ width, height });
  todos[1] = todosComposants[1](compup);
  update(todos);
}, 1000);

setTimeout(() => {
  hyper(todos[2])`<div class="tutu">une autre contenu est possible</div>`;
}, 2000);

const slots = [0, 1, 2].map(() => createSlot(`<div></div>`));

function update() {
  hyper(document.body)`
<div className="container">
    <section>
        ${slots[0]}
    </section>
    <section>
        ${slots[1]}
    </section>
    <section>
        ${slots[2]}
    </section>
</div>
  `;
}

function createSlot(slot) {
  return function doSlot(inner) {
    return hyper(slot)`${inner}`;
  };
}

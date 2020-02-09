import { bind as hyper, wire } from "hyperhtml";
import "./style.scss";
import { Valet } from "./composants/valet";
import { Slot } from "./composants/slot";

function update(slots) {
	hyper(document.body)`
  <div class="container">
      ${Object.keys(slots).map(key => Slot.for(slots[key]))}
  </div>
    `;
}

// ============================================================
const datas = {
	aS: [1, 2, 3],
	bS: ["a", "b", "c", "d"],
	cS: ["888"]
};

const valets = {};

for (const data in datas) {
	datas[data].forEach((content, i) => {
		valets[content] = new Valet({ content });
	});
}

const slots = {
	aS: [],
	bS: [],
	cS: []
};

function initSlots(slots, valets, datas) {
	for (const id in datas) {
		datas[id].forEach(data => slots[id].push(valets[data]));
	}
	update(slots);
}

initSlots(slots, valets, datas);
// ============================================================

setTimeout(() => {
	slots.bS[3] = valets["d"].setState({
		style: { backgroundColor: "yellow" },
		content: "toto"
	});
}, 3000);

setTimeout(() => {
	slots.aS[0] = valets["1"].setState({
		style: { fontSize: "2rem" },
		content: "TITITITIT"
	});
}, 2000);

setTimeout(() => {
	const [omit, ...temp] = slots.bS;
	slots.bS = temp;
	update(slots);
}, 1000);

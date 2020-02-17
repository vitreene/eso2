import { bind as hyper } from "hyperhtml";
import "./style.scss";
import { slots, layers } from "./datas/create-layers";
import { createValets } from "./datas/create-valets";
import { updates } from "./datas/seeds";

import { createOnScene } from "./onScene";

const onScene = createOnScene(slots);

const container = layers.get("cS");
const layerA = layers.get("aS");
const layerB = layers.get("bS");

layersOnScene([layerA, layerB]);
const max_valets = 20;
const valets = createValets(max_valets);

for (let time in updates) {
	setTimeout(() => {
		const upd = onScene(updates[time]);
		updateScene(upd);
	}, time);
}

function updateSlot(slotId, valetsIds) {
	const children = valetsIds.map(id => valets.get(id));
	slots.get(slotId).setState({ children });
}

function updateScene({ changed, update }) {
	if (typeof changed === "string") {
		console.error(changed);
		return;
	}
	const valet = valets.get(update?.id);
	let old, current, transform;

	if (changed?.remove) {
		valet && (old = valet._wire$.getBoundingClientRect());
		updateSlot(...changed.remove);
	}
	if (changed?.add) {
		updateSlot(...changed.add);
		valet && (current = valet._wire$.getBoundingClientRect());
	}

	// demo re-slot
	if (old && current) {
		const translate = {
			x: old.x - current.x,
			y: old.y - current.y
		};
		transform = `translate(${translate.x}px, ${translate.y}px)`;
	}

	update &&
		valets
			.get(update.id)
			.update({ ...update, style: { ...update.style, transform } });
}

function layersOnScene(layers) {
	hyper(document.body)`<div class="container">${layers}</div>`;
}

// ============================================================

// ============================================================
/* 
setTimeout(() => {
  valets.get(10).update({
    style: { backgroundColor: "yellow" },
    content: "toto"
  });
}, 3000);

setTimeout(() => {
  // valets.get(11).update({
    //   style: { fontSize: "2rem" },
    //   content: "TITITITIT"
    // });
    valets.get(11).prerender(true);
  }, 2500);
 */

setTimeout(() => {
	slots.get("bS_3").setState({
		children: container
	});
}, 2000);

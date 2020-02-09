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
  if (changed?.remove) updateSlot(...changed.remove);
  if (changed?.add) updateSlot(...changed.add);

  update && valets.get(update.id).update(update);
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
  valets.get(11).update({
    style: { fontSize: "2rem" },
    content: "TITITITIT"
  });
}, 2001);
*/

setTimeout(() => {
  slots.get("bS_3").setState({
    children: container
  });
}, 2000);

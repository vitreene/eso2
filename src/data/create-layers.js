/**
 * creer quelques layers e générer les slots à la volée
 * id slot = idlayer + n°slot
 */
import { wire } from "hyperhtml";
import { Slot } from "../composants/slot";
import { layerDefs } from "./seeds";

const slots = new Map();

const layers = new Map(layerDefs.map(createLayer));

function createLayer(config) {
  const layer = Array.from(Array(config.length).keys(), key => {
    const id = config.id + "_" + key;
    slots.set(id, new Slot({ id }));
    return slots.get(id);
  });

  // return layer;
  return [config.id, wire()`<section id=${config.id}>${layer}</section>`];
}

console.log({ slots, layers });

export { slots, layers };
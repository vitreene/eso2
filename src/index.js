import { bind as hyper, Component } from "hyperhtml";
import "./style.scss";

import { slots, layers } from "./data/create-layers";
import { createValets } from "./data/create-valets";
import { OnScene } from "./onScene";
import { Zoom } from "./eso/zoom";

import { CONTAINER_ESO, DEFAULT_SIZE_SCENE } from "./data/constantes";
import { updates } from "./data/seeds";

const onScene = new OnScene(slots);

const container = layers.get("cS");
const layerA = layers.get("aS");
const layerB = layers.get("bS");

////////////////////////////////////////////////

class Root extends Component {
  onconnected() {
    this.removeZoom = activeZoom();
  }
  ondisconnected() {
    this.removeZoom();
  }
  render() {
    return this.html`<div 
      id=${CONTAINER_ESO} 
      class="container" 
      onconnected=${this}
      ondisconnected=${this}
      >${this.state.content}</div>`;
  }
}

////////////////////////////////////////////////
const root = new Root();
const max_valets = 20;
const valets = createValets(max_valets);

layersOnScene(root, [layerA, layerB]);

////////////////////////////////////////////////

for (let time in updates) {
  setTimeout(() => {
    const upd = onScene.update(updates[time]);
    updateScene(upd);
  }, time);
}

////////////////////////////////////////////////

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

function layersOnScene(root, layers) {
  root.setState({ content: layers });
  hyper(document.body)`${root}`;
}

/* 
zoom.resize va appliquer un callback ou tous les élements en scene sont re-rendus avec la valeur de zoom.
il faut réunir :
- on
*/
function activeZoom() {
  const zoom = new Zoom(CONTAINER_ESO, DEFAULT_SIZE_SCENE["4/3"]);
  zoom.resize();
  console.log("zoom.value", zoom.value);
  window.addEventListener("resize", zoom.resize);
  return () => window.removeEventListener("resize", zoom.resize);
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

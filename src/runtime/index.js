import { OnScene } from "../scene/onScene";
import { Zoom } from "../eso/lib/zoom";

import { slots } from "../register/create-layers";
import { persos, actions } from "../scene/init";

import { CONTAINER_ESO, DEFAULT_SIZE_SCENE } from "../data/constantes";

// ============================================================
// zoom est partagé par Root et updateScene
let zoom;
const onScene = new OnScene(slots);

actions(sceneUpdateHandler);
// ============================================================

// déclenche les updates
function sceneUpdateHandler(update) {
  console.log("update", update);
  const up = onScene.update(update);
  updateScene(up);
}

// ============================================================

// need : persos zoom
function updateScene({ changed, update }) {
  if (typeof changed === "string") {
    console.error(changed);
    return;
  }
  const perso = persos.get(update?.id);

  // zoom enter
  if (update.enter) perso.prerender(zoom.value);

  // demo re-slot
  let old,
    current,
    transition = [];

  if (update.transition) {
    Array.isArray(update.transition)
      ? transition.push(...update.transition)
      : transition.push(update.transition);
  }

  if (changed?.remove) {
    perso && (old = perso._wire$.getBoundingClientRect());
    updateSlot(...changed.remove);
  }
  if (changed?.add) {
    updateSlot(...changed.add);
    perso && (current = perso._wire$.getBoundingClientRect());
  }
  if (old && current) {
    // en cas de resize, il faudrait recalculer la position des blocs, en gardant la valeur progress de l'interpolation
    const transform = zoom.unZoom({
      dX: old.x - current.x,
      dY: old.y - current.y
    });
    transition.push({
      from: transform,
      to: { dX: 0, dY: 0 },
      duration: 1000
    });
  }
  update && persos.get(update.id).update({ ...update, transition });
}

// need : persos slots
function updateSlot(slotId, persosIds) {
  const children = persosIds.map(id => persos.get(id));
  slots.get(slotId).setState({ children });
}

// ============================================================

// need : onScene zoom persos
export function activateZoom() {
  zoom = new Zoom(
    CONTAINER_ESO,
    DEFAULT_SIZE_SCENE["4/3"],
    initRenderOnResize(persos, onScene)
  );
  window.addEventListener("resize", zoom.resize);
  return () => window.removeEventListener("resize", zoom.resize);
}

function initRenderOnResize(persos, onScene) {
  return function renderOnResize(zoom) {
    for (const id of onScene.areOnScene.keys()) persos.get(id).prerender(zoom);
  };
}

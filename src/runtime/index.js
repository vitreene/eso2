import { OnScene } from "../scene/onScene";
import { Zoom } from "../eso/lib/zoom";

import { slots } from "../register/create-layers";
import { persos, actions } from "../scene/init";

import {
  CONTAINER_ESO,
  DEFAULT_SIZE_SCENE,
  DEFAULT_NS
} from "../data/constantes";

import { Eso } from "../eso";
const { getElementOffset } = Eso;

// ============================================================
// zoom est partagé par Root et updateScene
export let zoom;
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
  if (!update || Object.keys(update).length === 0) return;
  if (typeof changed === "string") {
    console.error(changed);
    return;
  }
  const rescale = update.move?.rescale;

  const perso = persos.get(update?.id);

  // zoom enter
  if (update.enter) perso.prerender(zoom.value);

  // RESLOT et RESCALE
  let old,
    current,
    // oldParent,
    // currentParent,
    transition = [];

  if (update.transition) {
    Array.isArray(update.transition)
      ? transition.push(...update.transition)
      : transition.push(update.transition);
  }

  if (changed?.remove) {
    if (perso) {
      const node = rescale ? perso.node.parentNode : perso.node;
      old = getElementOffset(node);
      // console.log("old", old);
    }
    updateSlot(...changed.remove);
  }

  if (changed?.add) {
    updateSlot(...changed.add);
    if (perso) {
      const node = rescale ? perso.node.parentNode : perso.node;
      current = getElementOffset(node);
      // console.log("current", current);
    }
  }

  if (old && current) {
    // en cas de resize, il faudrait recalculer la position des blocs, en gardant la valeur progress de l'interpolation
    const position = {
      dX: old.x - current.x,
      dY: old.y - current.y
    };

    transition.push({
      from: position,
      to: { dX: 0, dY: 0 },
      duration: 1000
    });

    // rescale
    if (rescale) {
      const oldDimensions = {
        width: old.width,
        height: old.height
      };
      const currentDimensions = {
        width: current.width,
        height: current.height
      };

      transition.push({
        from: oldDimensions,
        to: currentDimensions,
        duration: 1000,
        oncomplete: [
          {
            event: { ns: DEFAULT_NS, name: "end-rescale-" + update?.id },
            data: {
              dynStyle: {
                width: "100%",
                height: "100%"
              }
            }
          }
        ]
      });
    }
  }

  console.log("transition", transition);
  persos.get(update.id).update({ ...update, transition });
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

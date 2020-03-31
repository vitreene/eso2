import { Zoom } from "../eso/lib/zoom";
import { Eso } from "../eso";
import { slots } from "../register/create-layers";
import { OnScene } from "../scene/onScene";

import {
  CONTAINER_ESO,
  DEFAULT_SIZE_SCENE,
  DEFAULT_NS
} from "../data/constantes";

// ============================================================
// zoom est partagé par Root et updateScene
export let zoom;

// ============================================================

// need : onScene zoom persos
export function initRuntime(persos, actions) {
  const onScene = new OnScene(slots);
  actions(sceneUpdateHandler(onScene, persos));

  // TODO : revoir la facon dont zoom est rendu disponible.
  // l'activer différemment ?
  return function activateZoom() {
    zoom = new Zoom(
      CONTAINER_ESO,
      DEFAULT_SIZE_SCENE["4/3"],
      initRenderOnResize(persos, onScene)
    );
    window.addEventListener("resize", zoom.resize);
    return () => window.removeEventListener("resize", zoom.resize);
  };
}

function initRenderOnResize(persos, onScene) {
  return function renderOnResize(zoom) {
    onScene.areOnScene.forEach(id => persos.get(id).prerender(zoom));
  };
}

// déclenche les updates
function sceneUpdateHandler(onScene, persos) {
  const { getElementOffset } = Eso;

  return function handler(update) {
    // console.log("update", update);
    // TODO factoriser tous les appels à raf dans une meme fonction
    requestAnimationFrame(() => {
      const up = onScene.update(update);
      updateScene(up);
    });
  };

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
      }
      updateSlot(...changed.remove);
    }

    if (changed?.add) {
      updateSlot(...changed.add);
      if (perso) {
        const node = rescale ? perso.node.parentNode : perso.node;
        current = getElementOffset(node);
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

    persos.get(update.id).update({ ...update, transition });
  }

  // need : persos slots
  function updateSlot(slotId, persosIds) {
    const children = persosIds.map(id => persos.get(id));
    slots.get(slotId).setState({ children });
  }
}
// ============================================================

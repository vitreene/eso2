import { bind as hyper } from 'hyperhtml';

import { activateZoom } from '../zoom';
import { OnScene } from '../scene/onScene';
import { sceneUpdateHandler } from '../scene/scene-update-handler';
import { APP_ID, CONTAINER_ESO } from '../data/constantes';

export function initRuntime({ persos, actions, slots }) {
  const onScene = new OnScene(slots);
  actions(sceneUpdateHandler(onScene, persos, slots));

  // afficher composant Root
  createRoot(persos.get(CONTAINER_ESO), removeZoom);

  const removeZoom = activateZoom(renderOnResize);
  onScene.areOnScene.set(CONTAINER_ESO, CONTAINER_ESO + '_s01');

  // relancer le rendu des Persos si resize
  function renderOnResize(zoom) {
    for (const id of onScene.areOnScene.keys()) {
      persos.has(id) && persos.get(id).prerender(zoom);
    }
  }
}

function createRoot(root, handler) {
  root.node.addEventListener('disconnected', handler);
  hyper(document.getElementById(APP_ID))`${root}`;
}

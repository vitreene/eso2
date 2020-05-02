import { bind as hyper } from 'hyperhtml';

import { OnScene } from '../scene/onScene';
import { slots } from '../composants/Layer';
import { activateZoom } from '../zoom';
import { sceneUpdateHandler } from './scene-update-handler';
import { APP_ID, CONTAINER_ESO } from '../data/constantes';

// need : onScene zoom persos slots
export function initRuntime(persos, actions) {
  const onScene = new OnScene(slots);
  actions(sceneUpdateHandler(onScene, persos, slots));

  // afficher composant Root
  const root = persos.get(CONTAINER_ESO);
  root.node.addEventListener('disconnected', removeZoom);
  hyper(document.getElementById(APP_ID))`${root}`;

  const removeZoom = activateZoom(renderOnResize);
  onScene.areOnScene.set(CONTAINER_ESO, CONTAINER_ESO + '_s01');

  // relancer le rendu des Persos si resize
  function renderOnResize(zoom) {
    for (const id of onScene.areOnScene.keys()) {
      persos.has(id) && persos.get(id).prerender(zoom);
    }
  }
}

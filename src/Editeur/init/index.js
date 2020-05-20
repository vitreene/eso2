import { slots } from '../../Player/composants/Layer';
import { Layer } from 'Player/composants/Layer';
import { Bloc } from 'Player/composants/Bloc';
import { createSpriteClass } from 'Player/composants/Sprite';
import { loadImages } from 'Player/register/register-images';

import { root, textSample, spriteSample } from '../lib/data-persos';
import {
  noopEmitter,
  DEFAULT_SIZE_SCENE,
  SCENE_ID,
  CONTAINER_ESO,
} from '../lib/constantes';
import { objToFixed } from '../lib';

import { Zoom } from '../../Player/zoom/zoom';
import { getElementOffset } from '../lib/get-element-offset';

export let zoom;

const textBox = new Bloc(textSample, noopEmitter);
export const scene = new Layer(root, noopEmitter);
export const persos = new Map();
const slot = slots.get(CONTAINER_ESO + '_s01');

persos.set(root.id, scene);
persos.set(textSample.id, textBox);
getImage();

export function updateEditedPerso(id) {
  const perso = persos.get(id);
  return function updater({ rotate = 0, scale = 1, ...rect }) {
    const dynStyle = { ...objToFixed(rect), scale, rotate };

    perso.update({ dynStyle });
  };
}
export function isPerso(id) {
  return persos.has(id);
}

async function getImage() {
  const imagesCollection = await loadImages(['Mystery-80.png']);
  const Sprite = createSpriteClass(imagesCollection);
  const sprite = new Sprite(spriteSample, noopEmitter);
  persos.set(sprite.id, sprite);

  console.log('getImage', zoom.box);
  console.log('slots', slots);

  renderOnResize(zoom.box);
  slot.update([textBox, sprite]);
}

// relancer le rendu des Persos si resize
export const resizeCallbacks = new Map();
resizeCallbacks.set('persos', (box) =>
  persos.forEach((perso) => perso.prerender(box))
);
function renderOnResize(zoom) {
  resizeCallbacks.forEach((fn) => fn(zoom));
}

// zoom dans listener resize
export function activateZoom() {
  zoom = new Zoom(SCENE_ID, DEFAULT_SIZE_SCENE['4/3'], renderOnResize);
  window.addEventListener('resize', zoom.resize);
  return () => window.removeEventListener('resize', zoom.resize);
}

export function getElementOffsetZoomed(el, box = zoom.box) {
  return Zoom.deZoom(getElementOffset(el), box.zoom);
}

import { Layer } from 'Player/composants/Layer';
import { Bloc } from 'Player/composants/Bloc';
import { createSpriteClass } from 'Player/composants/Sprite';
import { loadImages } from 'Player/register/register-images';

import { root, textSample, spriteSample } from '../lib/data-persos';
import { noop } from '../lib/constantes';
import { objToFixed } from '../lib';

const noopEmitter = {
  emit: noop,
  listen: noop,
};

const sample = new Bloc(textSample, noopEmitter);
export const scene = new Layer(root, noopEmitter);
export const persos = new Map();

persos.set(root.id, scene);
persos.set(textSample.id, sample);

async function getImage() {
  const imagesCollection = await loadImages(['Mystery-80.png']);
  const Sprite = createSpriteClass(imagesCollection);
  const sprite = new Sprite(spriteSample, noopEmitter);
  persos.set(sprite.id, sprite);

  // scene.update({ content: [sample, sprite] });
  scene.update({ content: sprite });
}

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

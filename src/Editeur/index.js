import './style.css';

import { main, app, /* Scene, */ Editor } from './layout/layout';
import { EnableEdit } from './edit-perso/EnableEdit';
import { selectionFactory } from './edit-perso/selection';

import { scene } from './init';

// import { SCENE_ID } from './lib/constantes';
// let elems = 'abcde'.split('');
// export const scene = new Scene(SCENE_ID, elems);

export const editor = new Editor();

export function Editeur() {
  app(scene, editor);
  const enable = new EnableEdit(editor);
  const selectElement = selectionFactory(enable);
  main.addEventListener('mousedown', selectElement, false);
}

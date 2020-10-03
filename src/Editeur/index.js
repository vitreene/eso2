import './style.css';

import { App, Scene, Editor } from './layout/layout';
import { Log } from './layout/Log';
import { EnableEdit } from './edit-perso/EnableEdit';
import { selectionFactory } from './edit-perso/selection';
import { SCENE_ID } from './lib/constantes';

import { scene, activateZoom } from './init';

const editor = new Editor();
const stage = new Scene(SCENE_ID);
const log = new Log();

export function Editeur() {
  App(stage, editor, log);
  const enable = new EnableEdit(editor, log);
  const selectElement = selectionFactory(enable);
  scene.node.addEventListener('mousedown', selectElement, false);
  stage.setState({ content: scene });
  const removeZoom = activateZoom();
  scene.node.addEventListener('disconnected', removeZoom);
}

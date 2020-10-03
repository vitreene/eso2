import { EditController } from './EditController';
import { CooStore } from '../coord-store';
export const coo = new CooStore();

// gere la visibilité de l'éditeur d'objet
export class EnableEdit {
  selected = new Set();
  edit;
  editorScene;
  log;

  constructor(editorScene, log) {
    this.editorScene = editorScene;
    this.log = log;
  }

  add(node) {
    console.log('add EnableEdit');
    node.classList.add('selected');
    this.edit = new EditController(node, coo);
    this.edit.mount(this.editorScene);
    this.log.setStore(node.id, coo);
  }
  remove(node) {
    console.log('remove EnableEdit');
    node.classList.remove('selected');
    this.edit.unmount(this.editorScene);
    this.log.setStore(null);
  }
}

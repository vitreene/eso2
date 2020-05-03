import { EditController } from './EditController';
// gere la visibilité de l'éditeur d'objet
export class EnableEdit {
  constructor(editorScene) {
    this.editorScene = editorScene;
  }
  selected = new Set();
  edit = null;
  add(node) {
    console.log('add EnableEdit');
    node.classList.add('selected');
    this.edit = new EditController(node, this.editorScene);
    this.edit.mount();
  }
  remove(node) {
    console.log('remove EnableEdit');
    node.classList.remove('selected');
    this.edit.unmount();
  }
}

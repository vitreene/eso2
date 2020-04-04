import { bind as hyper } from "hyperhtml";
import "./style.scss";

import { layers } from "./register/create-layers";

import { Root } from "./composants/Root";
import { APP_ID } from "./data/constantes";
import { init } from "./scene/init";

// FIXME c'est l'import qui déclenche la lecture de la scene
// rendre plus intentionnel
import { initRuntime } from "./runtime";

import { grid_01_styles, fond_styles } from "./stories/layers";
////////////////////////////////////////////////

const style = document.createElement("style");
style.id = "grid_01_styles";
style.innerHTML = grid_01_styles + fond_styles;
document.head.appendChild(style);

const fond = layers.get("fond");
const grid_01 = layers.get("grid-01");

////////////////////////////////////////////////

// ENTRY POINT
init.then(({ persos, actions }) => {
  const activateZoom = initRuntime(persos, actions);
  const root = new Root(activateZoom);
  const layersList = [fond, grid_01];

  layersOnScene(root, layersList);
});

function layersOnScene(root, layers) {
  root.setState({ content: layers });
  hyper(document.getElementById(APP_ID))`${root}`;
}

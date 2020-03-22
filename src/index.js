import { bind as hyper } from "hyperhtml";
import "./style.scss";

import { layers } from "./register/create-layers";
import { Root } from "./composants/Root";
import { APP_ID } from "./data/constantes";

import { activateZoom } from "./runtime";

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
const root = new Root(activateZoom);

function layersOnScene(root, layers) {
  root.setState({ content: layers });
  hyper(document.getElementById(APP_ID))`${root}`;
}

layersOnScene(root, [fond, grid_01]);

import "./style.scss";
import { init } from "./scene/init";
import { initRuntime } from "./runtime";

export const Player = () =>
  init().then(({ persos, actions }) => initRuntime(persos, actions));

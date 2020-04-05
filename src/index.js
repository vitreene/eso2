import "./style.scss";
import { init } from "./scene/init";
import { initRuntime } from "./runtime";

init.then(({ persos, actions }) => initRuntime(persos, actions));

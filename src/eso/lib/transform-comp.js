const tList = {
  x: { transform: "translateX", unit: "px", zoomable: true },
  y: { transform: "translateY", unit: "px", zoomable: true },
  r: { transform: "rotate", unit: "deg", zoomable: false },
  s: { transform: "scale", unit: "", zoomable: false }, // true ?
  dX: "matrixX",
  dY: "matrixY"
};
// alias
tList.rotate = tList.r;
tList.scale = tList.s;

import { splitUnitValue } from "./helpers";

export function extractTransform(oldStyle) {
  const style = {};
  const transform = {};
  for (const prop in oldStyle) {
    tList[prop]
      ? (transform[prop] = oldStyle[prop])
      : (style[prop] = oldStyle[prop]);
  }
  return { style, transform };
}

export function withTransform(props, zoom) {
  const { dX, dY, ...other } = props;

  let transform = "";
  for (const tr in other) {
    let { value, unit } = splitUnitValue(other[tr]);

    value *= !unit && tList[tr].zoomable ? zoom : 1;
    unit = unit || tList[tr].unit;
    transform += tList[tr].transform + "(" + value + unit + ") ";
  }
  if (dX || dY) {
    transform += ` matrix(1,0,0,1,${dX * zoom || 0},${dY * zoom || 0})`;
  }
  return transform ? { transform } : null;
}

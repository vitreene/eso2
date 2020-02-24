const tList = {
  x: { transform: "translateX", unit: "px", zoomable: true },
  y: { transform: "translateY", unit: "px", zoomable: true },
  r: { transform: "rotate", unit: "deg", zoomable: false },
  s: { transform: "scale", unit: "", zoomable: false }, // true ?
  dX: "matrixX",
  dY: "matrixY"
};

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

//TODO zoom
export function withTransform(props, zoom) {
  const { dX, dY, ...other } = props;

  let transform = "";
  for (const tr in other) {
    transform +=
      tList[tr].transform +
      "(" +
      other[tr] * (tList[tr].zoomable ? zoom : 1) +
      tList[tr].unit +
      ") ";
  }
  if (dX || dY) {
    transform += ` matrix(1,0,0,1,${dX * zoom || 0},${dY * zoom || 0})`;
  }
  return { transform };
}

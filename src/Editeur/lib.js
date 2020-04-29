export function round(precision) {
  return function(value) {
    return Number(value.toFixed(precision));
  };
}
export const toFixed2 = round(2);

export function hypothenuse(x, y) {
  return Math.sqrt(x * x + y * y);
}
export function DEGtoRAD(deg) {
  return (deg * Math.PI) / 180;
}
export function RADtoDEG(rad) {
  return (rad * 180) / Math.PI;
}

export function transformCoords(x = 0, y = 0, rotate = 0, s = 1) {
  const scale = 1 / s;
  const distance = hypothenuse(x, y);
  const angle = Math.atan2(y, x);
  const rad = DEGtoRAD(rotate);
  const coords = {
    x: distance * Math.cos(angle - rad) * scale,
    y: distance * Math.sin(angle - rad) * scale,
  };
  // console.log(toFixed2(x), toFixed2(y), coords);

  return coords;
}
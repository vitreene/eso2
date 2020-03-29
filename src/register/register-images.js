export const imageCollection = {};
const composantTypeImage = ["image", "sprite"];

export default function registerImages(elements, callback) {
  const srcs = findSrcs(
    elements.filter(el => composantTypeImage.includes(el.actor))
  );
  console.log("src", elements, srcs);
  loadImages(srcs, callback);
}

function findSrcs(elements) {
  let srcs = elements.map(el => el.initial.content).filter(Boolean);

  for (const el of elements) {
    el.actions &&
      el.actions.forEach(action => action.content && srcs.push(action.content));
  }
  return srcs;
}
// TODO ajouter width et height à elements
async function loadImages(srcs, callback) {
  const imageCollection = {};

  return srcs.length
    ? await Promise.all(
        srcs.map(
          src =>
            new Promise((resolve, reject) => {
              const ikono = new Image();
              ikono.onload = () => {
                imageCollection[src] = {
                  width: ikono.width,
                  height: ikono.height,
                  ratio: ikono.width / ikono.height,
                  src
                };
                resolve(true);
              };
              ikono.onerror = reject;
              ikono.src = src;
            })
        )
      )
        .then(() => callback(imageCollection))
        .catch(err => console.log("erreur image :", err))
    : callback(imageCollection);
}

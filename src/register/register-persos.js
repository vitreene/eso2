import createPerso from "./register-nature-persos";

export function registerPersos(stories, emitter) {
  const persos = new Map();

  (Array.isArray(stories) ? stories : [stories]).forEach(story => {
    console.log("story", story);
    switch (story.nature) {
      case "sound":
        break;
      case "layer":
        break;
      case "polygon":
        break;
      case "sprite":
        break;
      default:
        persos.set(story.id, createPerso.create(story, emitter));
        break;
    }
  });

  return persos;
}

export function initPersos(persos, emitter) {
  const persosWithEmitters = {};
  for (const id in persos) {
    persosWithEmitters[id] = persos[id](emitter); //.update;
  }
  return persosWithEmitters;
}

// register persos, actions, images, events
// init clock
import EventEmitter2 from "eventemitter2";

import { clock } from "../runtime/clock";
import { TimeLiner } from "../runtime/solver";

import { registerImages } from "../register/register-images";
import { registerPersos } from "../register/register-persos";
import { registerActions } from "../register/register-actions";
import { registerStraps } from "../register/register-straps";

import * as objectStories from "../stories/story-01-persos";
import { eventimes } from "../stories/story-01-eventimes";

const emitter = new EventEmitter2({ wildcard: true, maxListeners: 0 });
const stories = Object.values(objectStories);
export const timeLiner = new TimeLiner(eventimes);

export const init = registerImages(stories).then(coll => {
  imagesCollection = coll;
  const persos = registerPersos(stories, imagesCollection, emitter);
  const actions = registerActions(stories, emitter);
  chrono = clock(timeLiner, emitter);
  registerStraps(emitter);

  return {
    // imagesCollection,
    persos,
    actions,
    chrono
  };
});

// export let actions = registerActions(stories, emitter);

export let imagesCollection;
// export let persos;
export let chrono;

// console.log("CHRONO", chrono);

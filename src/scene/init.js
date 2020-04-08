// register persos, actions, images, events
// init clock
import EventEmitter2 from "eventemitter2";

import { clock } from "../runtime/clock";
import { TimeLiner } from "../runtime/solver";

import { registerImages } from "../register/register-images";
import { registerPersos } from "../register/register-persos";
import { registerActions } from "../register/register-actions";
import { registerStraps } from "../register/register-straps";

// import * as objectStories from "../stories/story01/story-01-persos";
// import { eventimes } from "../stories/story01/story-01-eventimes";

// import { stories as objectStories, eventimes } from "../stories/story01";
import { stories as objectStories, eventimes } from "../stories/story02";

const stories = Object.values(objectStories);
console.log("stories, eventimes", stories, eventimes);
export const timeLiner = new TimeLiner(eventimes);
export const emitter = new EventEmitter2({ wildcard: true, maxListeners: 0 });

export const init = () =>
  registerImages(stories).then((imagesCollection) => {
    const persos = registerPersos(stories, imagesCollection, emitter);
    const actions = registerActions(stories, emitter);
    chrono = clock(timeLiner, emitter);
    registerStraps(chrono, emitter);

    return {
      persos,
      actions,
      chrono,
    };
  });

export let chrono;

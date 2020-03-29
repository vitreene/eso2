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

registerImages(stories).then(coll => {
  imagesCollection = coll;
  chrono = clock(timeLiner, emitter);
});

registerStraps(emitter);

export const actions = registerActions(stories, emitter);
export const persos = registerPersos(stories, emitter);

export const timeLiner = new TimeLiner(eventimes);

export let chrono;
export let imagesCollection;

console.log("CHRONO", chrono);

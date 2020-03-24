// register persos, actions, images, events
// init clock
import EventEmitter2 from "eventemitter2";

import { clock } from "../runtime/clock";
import { TimeLiner } from "../runtime/solver";

import { registerPersos } from "../register/register-persos";
import { registerActions } from "../register/register-actions";
// import { sceneUpdateHandler } from "../runtime/index";

import * as objectStories from "../stories/story-01-persos";
import { eventimes } from "../stories/story-01-eventimes";

const emitter = new EventEmitter2({ wildcard: true, maxListeners: 0 });
const timeLiner = new TimeLiner(eventimes);

const stories = Object.values(objectStories);
export const actions = registerActions(stories, emitter);
export const persos = registerPersos(stories, emitter);

export const chrono = clock(timeLiner, emitter);

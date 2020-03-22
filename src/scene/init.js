// register persos, actions, images, events
// init clock
import EventEmitter2 from "eventemitter2";

import { clock } from "../runtime/clock";
import { TimeLiner } from "../runtime/solver";

import { registerPersos } from "../register/register-persos";
import { registerActions } from "../register/register-actions";
import { sceneUpdateHandler } from "../runtime/index";

import * as stories from "../stories/story-01-persos";
import { eventimes } from "../stories/story-01-eventimes";

const pubSub = new EventEmitter2({ wildcard: true, maxListeners: 0 });

const arrStories = Object.values(stories);
const a = registerActions(arrStories, pubSub);
a(sceneUpdateHandler);

export const persos = registerPersos(arrStories, sceneUpdateHandler);

export const timeLiner = new TimeLiner(eventimes);

export const chrono = clock(pubSub, timeLiner);

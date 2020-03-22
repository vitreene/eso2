import React from "react";
import EventEmitter2 from "eventemitter2";

import { clock } from "./clock";
import { TimeLiner } from "./solver";
import { zoom } from "../eso/lib/zoom";

import registerActions from "../register/register-actions";
import registerImages from "../register/register-images";
import registerActors from "../register/register-actor";
import registerAllSlots from "../register/register-slots";
import registerStraps from "../register/register-straps";

import { prepCasuals, casuals, casualEventimes } from "../data/casual-data";
import { generateCasual } from "../scripts/casual-init";

import { eventimes } from "../data/eventimes";
import { samples } from "../data/initial";

import { layouts } from "../data/layouts";
import { layers } from "../data/actor-layers";

import { arrayToObject } from "../eso/lib/helpers";
import { joinId } from "../eso/lib/helpers";
import {
  DEFAULT_TRANSITION_IN,
  DEFAULT_TRANSITION_OUT,
  STRAP
} from "../data/constantes";

const { persos: casualPersos, eventimes: casualEvents } = generateCasual(
  prepCasuals
);

const persos = [...casuals, ...casualPersos];
export const timeLiner = new TimeLiner(casualEventimes);

export const SlotList = React.createContext({});

// const persos = [...layers, ...samples];
// export const timeLiner = new TimeLiner(eventimes);

console.log("timeLiner", timeLiner);

export const pubSub = new EventEmitter2({ wildcard: true, maxListeners: 0 });
export const elapsed = { chrono: false };

pubSub.on([STRAP, "trace"], a => console.log("TRACE", a));

// pubSub.onAny(function(event, value) {
//   !["elapsed", "secondes"].includes(event) && console.log("*-", event, value);
// });

export function withTimeline(Composant) {
  //init
  zoom.resize();
  console.log("zoom.value", zoom.value);
  window.addEventListener("resize", zoom.resize);
  const slots = registerAllSlots(layouts, persos);
  slots.root = [];
  let actors;
  const actions = registerActions(persos, pubSub);
  const dispatchSlots = slotsOnScene();
  registerStraps(pubSub);

  const startClock = imageCollection => {
    const options = { layouts: arrayToObject(layouts), slots, imageCollection };
    actors = registerActors(persos, pubSub, options);
    elapsed.chrono = clock(pubSub, timeLiner);
  };

  return function() {
    //update
    const [update, setUpdate] = React.useState();

    React.useEffect(() => {
      actions(data => setUpdate(data));
      registerImages(persos, startClock);
      return () => window.removeEventListener("resize", zoom.resize);
    }, []);

    dispatchSlots({ slots, actors, update });

    return elapsed.chrono ? (
      <SlotList.Provider value={slots}>
        <Composant id="root" />
      </SlotList.Provider>
    ) : null;
  };
}

// TODO order
function slotsOnScene() {
  const onScene = {};

  return ({ slots, actors, update }) => {
    if (!update) return slots;

    const { id } = update;
    const slotId = update.layer ? joinId(update.layer, update.slot) : null;

    if (onScene[id]) {
      //reslot
      const precSlotId = onScene[id].slot;
      if (slotId && precSlotId !== slotId) {
        console.log("RESLOT", id);
        update.reslot = true;
        slots[precSlotId] = slots[precSlotId].filter(slot => slot.id !== id);
        addToScene(slotId, id);
        onScene[id].slot = slotId;
      }
      //exit
      if (update.exit) {
        console.log("EXIT");
        update.exit = () => removeFromScene(slots, id);
        !update.transition && (update.transition = DEFAULT_TRANSITION_OUT);
      }
      //update
      onScene[id].update = update;
    } else {
      //enter
      !update.transition && (update.transition = DEFAULT_TRANSITION_IN);
      addToScene(slotId, id);
    }

    // return slots;

    function addToScene(slotId, id) {
      const order = setOrder(slotId);
      onScene[id] = { actor: actors[id], order, id, update, slot: slotId };

      if (slots[slotId]) {
        slots[slotId].push(onScene[id]);
        slots[slotId].sort((a, b) =>
          a.order === b.order ? -1 : a.order - b.order
        );
      } else slots[slotId] = [onScene[id]];
    }

    function setOrder(slotId) {
      return update.order || (slots[slotId] && slots[slotId].length) || 0;
    }

    function removeFromScene(slots, id) {
      slots[onScene[id].slot] = slots[onScene[id].slot].filter(
        slot => slot.id !== id
      );
      delete onScene[id];
    }
  };
}

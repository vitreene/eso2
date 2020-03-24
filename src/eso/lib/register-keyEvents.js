import { MAIN, STRAP } from "../../data/constantes";

export function registerKeyEvents(emit, emitter) {
  if (!emit) return null;
  const keyEvents = {};

  const emitEvent = ({ event: { ns = MAIN, name }, data }, target) => {
    const e = ns === STRAP ? target : null;
    // console.log("e, ns, name, data, target", e, ns, name, data, target);
    emitter.emit([ns, name], { ...data, e } || name);
  };
  for (const event in emit) keyEvents[event] = e => emitEvent(emit[event], e);

  return keyEvents;
}

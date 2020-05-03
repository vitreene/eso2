import {
  TRANSLATE,
  RESIZE,
  ROTATE,
  SCALE,
  CONSTRAIN,
  DUPLICATE,
  HOMOTETIC,
  ROTATE_AND_SCALE,
} from '../constantes';

export function whichPointerAction(action, modifiers) {
  const mode = (modifiers.alt ? 'alt' : '') + (modifiers.shift ? 'shift' : '');
  return actions[action][mode] ? actions[action][mode] : action;
}
const actions = {
  [TRANSLATE]: {
    shift: CONSTRAIN,
    alt: DUPLICATE,
  },
  [RESIZE]: {
    shift: HOMOTETIC,
  },
  [ROTATE]: {
    alt: SCALE,
    shift: CONSTRAIN,
    altshift: ROTATE_AND_SCALE,
  },
};

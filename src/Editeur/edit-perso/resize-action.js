import { transformCoords, objToFixed, toFixed2 } from '../lib';
import { CONSTRAIN } from '../lib/constantes';

export function resizeAction(a, rect) {
  const action = splitAction(a);
  const { left, top, width, height, rotate, scale } = rect;

  return function(px, py, modifier) {
    let po = { x: px, y: py };

    // déplacement
    if (action.action === 'edit')
      return {
        left: left + po.x,
        top: top + po.y,
        width,
        height,
      };

    // si resize proportionnel
    if (modifier === CONSTRAIN) {
      const scaleX = po.x / width;
      const scaleY = po.y / height;
      const sign =
        action.action === 'edit-left-bottom' ||
        action.action === 'edit-right-top'
          ? -1
          : 1;
      const constrain = (scaleX + scaleY * sign) / 2;

      po.x = width * constrain;
      po.y = height * constrain * sign;
    }

    // coordonnées tiennent compte de la rotation et de l'échelle
    let co = transformCoords(po.x, po.y, rotate, scale);

    // adapte l'action  si l'on croise le redimensionnement
    const act = whichAction(action, co, rect);

    // compense le décalage de la rotation css
    const diff = {
      x: (co.x - po.x) / 2,
      y: (co.y - po.y) / 2,
    };
    // FIXME compenser le décalage en cas de contrainte
    if (modifier === CONSTRAIN) co = po;

    let swapW = 0;
    let swapH = 0;
    const style = {};

    switch (act.x) {
      case 'left':
        swapW = action.x === 'right' ? width : 0;
        style.left = left - diff.x + swapW + co.x;
        style.width = width - 2 * swapW - co.x;
        break;
      case 'right':
        swapW = action.x === 'left' ? width : 0;
        style.left = left - diff.x + swapW;
        style.width = width - 2 * swapW + co.x;
        break;
      default:
        break;
    }

    switch (act.y) {
      case 'top':
        swapH = action.y === 'bottom' ? height : 0;
        style.top = top - diff.y + swapH + co.y;
        style.height = height - 2 * swapH - co.y;
        break;
      case 'bottom':
        swapH = action.y === 'top' ? height : 0;
        style.top = top - diff.y + swapH;
        style.height = height - 2 * swapH + co.y;
        break;
      default:
        break;
    }

    return style;
  };
}

// permet d'evaluer quel décalage appliquer lorsque le resize est inversé
export function whichAction(action, co, rect) {
  const quadrant = whichQuadrant(action, co, rect);
  const x = quadrant.x > 0 ? 'right' : 'left';
  const y = quadrant.y > 0 ? 'top' : 'bottom';
  return { x, y };
}

export function whichQuadrant(action, { x, y }, rect) {
  const quadrant = { x: 0, y: 0 };

  switch (action.x) {
    case 'left':
      quadrant.x = Math.sign(x - rect.width);
      break;
    case 'right':
      quadrant.x = Math.sign(x + rect.width);
      break;
    default:
      break;
  }
  switch (action.y) {
    case 'bottom':
      quadrant.y = Math.sign(-y - rect.height);
      break;
    case 'top':
      quadrant.y = Math.sign(-y + rect.height);
      break;
    default:
      break;
  }
  return quadrant;
}

function splitAction(action) {
  const split = action.split('-');
  return {
    action,
    x: split[1],
    y: split[2],
  };
}

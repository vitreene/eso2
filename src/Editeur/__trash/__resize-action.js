import { transformCoords } from '../lib';

// TODO à optimiser quand stable
export function resizeAction(action, rect) {
  const { left, top, width, height, rotate, scale } = rect;
  const sideAction = splitAction(action);

  return function(px, py, modifier) {
    console.log('modifier', modifier);

    if (action === 'edit')
      return {
        left: left + px,
        top: top + py,
        width,
        height,
      };

    const { x, y } = transformCoords(px, py, rotate, scale);
    const quadrant = whichQuadrant(action, x, y, {
      width,
      height,
    });
    const act = whichAction(quadrant);

    let swapW = 0;
    let swapH = 0;
    let style = {};

    const diff = {
      x: (x - px) / 2,
      y: (y - py) / 2,
    };

    /*
Il faut splitter left/right et top/bottom
por factoriser les calculs.
*/
    switch (act) {
      case 'edit-left-top':
        if (action.includes('right')) {
          swapW = width;
        }
        if (action.includes('bottom')) {
          swapH = height;
        }
        style = {
          left: left + x + swapW - diff.x,
          top: top + y + swapH - diff.y,
          width: width - x - 2 * swapW,
          height: height - y - 2 * swapH,
        };
        break;
      case 'edit-right-top':
        if (action.includes('left')) {
          swapW = width;
        }
        if (action.includes('bottom')) {
          swapH = height;
        }
        style = {
          left: left + swapW - diff.x,
          top: top + y + swapH - diff.y,
          width: width + x - 2 * swapW,
          height: height - y - 2 * swapH,
        };
        break;
      case 'edit-left-bottom':
        if (action.includes('right')) {
          swapW = width;
        }
        if (action.includes('top')) {
          swapH = height;
        }
        style = {
          left: left + x + swapW - diff.x,
          top: top + swapH - diff.y,
          width: width - x - 2 * swapW,
          height: height + y - 2 * swapH,
        };
        break;
      case 'edit-right-bottom':
        if (action.includes('left')) {
          swapW = width;
        }
        if (action.includes('top')) {
          swapH = height;
        }

        style = {
          left: left + swapW - diff.x,
          top: top + swapH - diff.y,
          width: width + x - 2 * swapW,
          height: height + y - 2 * swapH,
        };

        break;
      default:
        break;
    }

    return style;
  };
}

// permet d'evaluer quel décalage appliquer lorsque le resize les inversé
export function whichQuadrant(action, x, y, rect) {
  let quadrant = { x: 0, y: 0 };

  switch (action) {
    case 'edit-left-top':
      quadrant = {
        x: Math.sign(x - rect.width),
        y: Math.sign(rect.height - y),
      };
      break;

    case 'edit-right-top':
      quadrant = {
        x: Math.sign(rect.width + x),
        y: Math.sign(rect.height - y),
      };
      break;

    case 'edit-left-bottom':
      quadrant = {
        x: Math.sign(x - rect.width),
        y: Math.sign(-rect.height - y),
      };
      break;

    case 'edit-right-bottom':
      quadrant = {
        x: Math.sign(rect.width + x),
        y: Math.sign(-rect.height - y),
      };
      break;

    default:
      break;
  }

  return quadrant;
}

export function whichAction(quadrant) {
  const axeX = quadrant.x > 0 ? 'right' : 'left';
  const axeY = quadrant.y > 0 ? 'top' : 'bottom';
  return `edit-${axeX}-${axeY}`;
}

function splitAction(action) {
  const split = action.split('-');
  return {
    action,
    x: split[1],
    y: split[2],
  };
}

export function noop() {}
export const noopEmitter = {
  emit: noop,
  listen: noop,
};

export const EDIT_ID = 'edit';
export const SCENE_ID = 'scene';
export const CONTAINER_ESO = 'stage';
export const DEFAULT_SIZE_SCENE = {
  '16/9': {
    w: 1600,
    h: 900,
    r: 16 / 9,
  },
  '4/3': {
    w: 1200,
    h: 900,
    r: 4 / 3,
  },
};

// actions du bloc
export const MOVE = 'move';
export const TRANSLATE = 'translate';
export const ROTATE = 'rotate';
export const SCALE = 'scale';
export const CONSTRAIN = 'constrain';
export const DUPLICATE = 'duplicate';
export const RESIZE = 'resize';
export const HOMOTETIC = 'homotetic';
export const ROTATE_AND_SCALE = 'rotate-and-scale';

export const CONTAINER_ESO = "main";

export const MAIN = "anim";
export const TELCO = "telco";
export const PLAY = "play";
export const PAUSE = "pause";
export const STOP = "stop";
export const REWIND = "rewind";

export const STRAP = "strap";
export const TEMPO = "tempo";

export const SUPPORT = "support";
export const ACTOR = "actor";

export const TOGGLE = "toggle";
export const TICK = 100;
export const DEFAULT_VOLUME = 0.1;

export const EV = "eventList";
export const TC = "telco";
export const DEFAULT_NS = EV;

export const DEFAULT_TRANSITION_IN = "fadeIn";
export const DEFAULT_TRANSITION_OUT = "fadeOut";

export const DEFAULT_SIZE_SCENE = {
  "16/9": {
    w: 1600,
    h: 900,
    r: 16 / 9
  },
  "4/3": {
    w: 1200,
    h: 900,
    r: 4 / 3
  }
};

export const pointerEventList = [
  "onClick",
  "onContextMenu",
  "onDoubleClick",
  "onDrag",
  "onDragEnd",
  "onDragEnter",
  "onDragExit",
  "onDragLeave",
  "onDragOver",
  "onDragStart",
  "onDrop",
  "onMouseDown",
  "onMouseEnter",
  "onMouseLeave",
  "onMouseMove",
  "onMouseOut",
  "onMouseOver",
  "onMouseUp",
  "onPointerDown",
  "onPointerMove",
  "onPointerUp",
  "onPointerCancel",
  "onGotPointerCapture",
  "onLostPointerCapture",
  "onPointerEnter",
  "onPointerLeave",
  "onPointerOver",
  "onPointerOut",
  "onTouchCancel",
  "onTouchEnd",
  "onTouchMove",
  "onTouchStart"
];

export const positionCssProps = ["top", "left", "right", "bottom"];
export const whiteListCssProps = new Set([
  "backgroundPosition",
  "borderBottom",
  "borderBottomWidth",
  "borderLeft",
  "borderLeftWidth",
  "borderRight",
  "borderRightWidth",
  "borderTop",
  "borderTopWidth",
  "borderWidth",
  "borderRadius",
  "flexBasis",
  "fontSize",
  "height",
  "left",
  "letterSpacing",
  "listStylePosition",
  "margin",
  "marginBottom",
  "marginLeft",
  "marginRight",
  "marginTop",
  "padding",
  "minWidth",
  "maxWidth",
  "minHeight",
  "maxHeight",
  "objectPosition",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "paddingTop",
  "perspective",
  "strokeDasharray",
  "strokeDashoffset",
  "strokeWidth",
  "textIndent",
  "top",
  "width",
  "x",
  "y"
]);
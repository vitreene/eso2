import { STRAP, TC, PAUSE } from "../data/constantes";

export const textSample = {
  id: "text-sample",
  nature: "bloc",
  initial: {
    dimensions: { width: 421, height: 214 },
    className: "totoo",
    statStyle: {
      color: "blue",
      fontWeight: "bold",
      fontSize: "12px",
      padding: "8px"
    },
    attr: {
      "data-letter": "alphabet"
    },
    content: "dimanche"
  },
  emit: {
    mousedown: {
      event: { ns: STRAP, name: "move" },
      data: { id: "text-sample", event: "move" }
    },
    click: {
      event: { ns: TC, name: PAUSE }
    }
  },
  /*   emit: {
    click: {
      event: { ns: STRAP, name: "add-event-list" },
      data: {
        name: "click",
        start: 0,
        events: [
          { start: 0, name: "ev100" },
          { start: 1000, name: "ev101" },
          { start: 2000, name: "ev102" }
        ]
      }
    }
  }, */

  listen: [
    { event: "ev011", action: "enter" },
    { event: "ev012", action: "step01" },
    { event: "ev014", action: "step02" },
    { event: "move", action: "move" }
  ],
  actions: [
    {
      name: "move"
    },
    {
      name: "enter",
      move: { layer: "grid-01", slot: "grid-01_s01" },
      statStyle: {
        fontSize: "12px",
        backgroundColor: "#ffff00",
        position: "absolute"
      }
    },
    {
      name: "step01",
      content: "lundi",
      move: { layer: "grid-01", slot: "grid-01_s02" },
      transition: {
        to: {
          // x: 100,
          // y: 100,
          rotate: 200,
          scale: 0.4,
          fontSize: "48px",
          backgroundColor: "green",
          color: "#0033FF"
        },
        duration: 2000
      }
    },
    {
      name: "step02",
      move: { layer: "grid-01", slot: "grid-01_s03" },
      transition: {
        to: {
          // x: 0,
          // y: 0,
          scale: 1.5,
          rotate: 40,
          // rotate: 360 * 4 + 45
          fontSize: "32px",
          backgroundColor: "#00ff00",
          color: "#3300FF"
        },
        duration: 500
      },
      content: "arrivé"
    }
  ]
};
/* 
export const imageSample = {
  id: "image",
  nature: "img",
  initial: {
    content: "vignette.jpg",
    fit: "contain", //"cover"
    statStyle: {
      position: "absolute"
    }
  },
  listen: [
    { event: "go", action: "enter" },
    { event: "ev012", action: "step01" },
    { event: "ev014", action: "step02" }
  ],
  actions: [
    {
      name: "enter",
      move: { layer: "grid-01", slot: "grid-01_s02" },
      dimensions: { width: "100%", height: "100%" },
      transition: { to: "fadeIn" }
      // style: { opacity: 0.5 }
    },
    {
      name: "step01",
      move: { layer: "fond", slot: "fond_s01", rescale: true },
      transition: { to: { opacity: 0.5 } }
    },
    {
      name: "step02",
      move: { layer: "grid-01", slot: "grid-01_s05", rescale: true },
      transition: { to: { opacity: 1 } }
    }
  ]
};
 */

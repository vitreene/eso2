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
      statStyle: { fontSize: "12px", backgroundColor: "#ffff00" }
    },
    {
      name: "step01",
      content: "lundi",
      move: { layer: "grid-01", slot: "grid-01_s03" },
      dynStyle: { color: "#ff0000" },
      transition: {
        to: {
          fontSize: "48px",
          backgroundColor: "#ff0000",
          color: "#0033FF"
        }
      }
    },
    {
      name: "step02",
      move: { layer: "grid-01", slot: "grid-01_s05" },
      transition: {
        to: {
          fontSize: "32px",
          backgroundColor: "#00ff00",
          color: "#3300FF",
          x: -500,
          y: 50,
          rotate: 360 * 4 + 45
        },
        duration: 2000
      },
      content: "arrivé"
    }
  ]
};

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

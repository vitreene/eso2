import { STRAP, TC, PLAY, PAUSE, TOGGLE, DEFAULT_NS } from "../data/constantes";

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
          x: 100,
          y: 100,
          rotate: 200,
          scale: 0.4,
          fontSize: "48px",
          backgroundColor: "green",
          color: "#0033FF"
        },
        duration: 2480 // race condition ?
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

export const imageSample = {
  id: "image",
  nature: "img",
  initial: {
    content: "vignette.jpg",
    fit: "cover", //"cover"
    statStyle: {
      position: "absolute"
    }
  },
  emit: {
    click: {
      event: { ns: STRAP, name: "add-event-list" },
      data: {
        name: "click",
        start: 0,
        events: [
          { start: 0, name: "ev010" },
          { start: 1000, name: "ev011" },
          { start: 2000, name: "ev014" }
        ]
      }
    }
  },
  listen: [
    { event: "go", action: "enter" },
    { event: "ev012", action: "step01" },
    { event: "ev014", action: "step02" },
    { event: "end-rescale-image", action: "end-rescale-image" }
  ],
  actions: [
    {
      name: "end-rescale-image",
      dynStyle: {
        outline: "20px solid red"
      }
    },
    {
      name: "enter",
      move: { layer: "grid-01", slot: "grid-01_s03" },
      dimensions: { width: "100%", height: "100%" },
      transition: { to: "fadeIn" }
      // style: { opacity: 0.5 }
    },
    {
      name: "step01",
      move: { layer: "fond", slot: "fond_s01", rescale: true },
      transition: {
        to: { opacity: 0.5 },
        oncomplete: { event: { ns: DEFAULT_NS, name: "leave-sprite" } }
      }
    },
    {
      name: "step02",
      move: { layer: "grid-01", slot: "grid-01_s02", rescale: true },
      transition: { to: { opacity: 1 } }
    }
  ]
};

export const imageSample2 = {
  id: "image2",
  nature: "img",
  initial: {
    content: "perfume_002.jpg",
    fit: "cover", //"cover"
    statStyle: {
      position: "absolute"
    }
  },
  listen: [
    { event: "go", action: "enter" },
    { event: "ev011", action: "step01" },
    // { event: "ev013", action: "step02" },
    { event: "leave-sprite", action: "step02" },
    { event: "end-rescale-image2", action: "end-rescale-image2" }
  ],
  actions: [
    {
      name: "end-rescale-image2",
      dynStyle: {
        outline: "20px solid red"
      }
    },
    {
      name: "enter",
      move: { layer: "grid-01", slot: "grid-01_s02" },
      dimensions: { width: "100%", height: "100%" },
      transition: { to: "fadeIn" }
      // style: { opacity: 0.5 }
    },
    {
      name: "step01",
      move: { layer: "grid-01", slot: "grid-01_s01", rescale: true },
      transition: { to: { opacity: 0.5 } }
    },
    {
      name: "step02",
      move: { layer: "fond", slot: "fond_s01", rescale: true },
      transition: { to: { opacity: 1 } }
    }
  ]
};

export const togglePlay = {
  id: "togglePlay",
  nature: "button",
  initial: {
    statStyle: {
      color: "white",
      backgroundColor: "blue",
      borderRadius: "4px",
      fontWeight: "bold",
      fontSize: "12px",
      padding: "1rem",
      textTransform: "uppercase",
      textAlign: "center"
    },
    // dimensions: { width: 80, ratio: 1 },
    content: "pause"
  },

  listen: [
    { event: "go", action: "enter" },
    { ns: TC, event: "play", action: "play" },
    { ns: TC, event: "pause", action: "pause" }
  ],
  actions: [
    {
      name: "enter",
      move: { layer: "grid-01", slot: "grid-01_s05" }
    },
    {
      name: "play",
      content: "pause"
    },
    {
      name: "pause",
      content: "play"
    }
  ],

  emit: {
    click: {
      event: { ns: STRAP, name: TOGGLE },
      data: {
        id: "telco",
        ns: TC,
        valueA: PAUSE,
        valueB: PLAY
      }
    }
  }
};

export const spriteSample = {
  id: "sprite",
  nature: "sprite",
  initial: {
    content: "Mystery-80.png",
    dimensions: { height: 300 },
    statStyle: { opacity: 0 }
  },
  listen: [
    { event: "ev011", action: "enter" },
    { event: "ev013", action: "step01" },
    { event: "ev015", action: "exit" },
    { event: "move-sprite", action: "idle" },
    { event: "leave-sprite", action: "leave" }
  ],
  actions: [
    {
      name: "enter",
      move: { layer: "grid-01", slot: "grid-01_s03" },
      transition: { to: { opacity: 1, x: -100, y: 10 } }
    },
    {
      name: "step01",
      move: { layer: "grid-01", slot: "grid-01_s01" },
      transition: { to: { x: 100, y: 50, rotate: 15 } }
    },
    {
      name: "exit",
      exit: true,
      transition: { to: "fadeOut" }
    },
    {
      name: "idle"
    },
    {
      name: "leave",
      leave: true
    }
  ],
  emit: {
    mousedown: {
      event: { ns: STRAP, name: "move" },
      data: { id: "sprite", event: "move-sprite" }
    }
  }
};

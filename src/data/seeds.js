export const layerDefs = [
  { id: "aS", length: 3 },
  { id: "bS", length: 4 },
  { id: "cS", length: 2 }
];

export const updates = {
  0: {
    layer: "aS",
    slot: "0",
    id: 10,
    // dynStyle: { backgroundColor: "grey", left: "-=10", top: "+=50" },
    dynStyle: {
      backgroundColor: "grey"
    },
    dimensions: { height: 100, ratio: 2 },
    content: "grey",
    classes: "toto truc"
  },
  50: {
    id: 10,
    layer: "bS",
    slot: "1",
    classes: "+=tom  -=toto",
    transition: {
      to: { backgroundColor: "red" },
      duration: 500
    }
  },

  2010: {
    layer: "aS",
    slot: "0",
    id: 10,
    transition: {
      to: { x: 200, y: 150, scale: 2, backgroundColor: "purple" },
      duration: 1000
    }
  },

  2000: {
    layer: "bS",
    slot: "0",
    id: 11,
    dimensions: { height: 100, ratio: 2 },
    dynStyle: {
      //   x: 20,
      //   y: "50px",
      rotate: 45,
      opacity: 0
      //   scale: 1.41
    },
    statStyle: {
      transformOrigin: "center",
      backgroundColor: "yellow",
      //   flex: 1,
      margin: "10px"
    },
    content: "yellow"
  },
  2500: {
    id: 11,
    transition: {
      to: { effect: "fadeIn", duration: 1000 }
    }
  },

  3000: {
    layer: "aS",
    slot: "2",
    id: 12,
    dynStyle: { backgroundColor: "orange" },
    content: "XOXOX"
  },
  4500: {
    id: 11
    // leave: true
  },
  4000: {
    layer: "cS",
    slot: "0",
    id: 12,
    dynStyle: { backgroundColor: "crimson" },
    content: "crimson"
  }
};

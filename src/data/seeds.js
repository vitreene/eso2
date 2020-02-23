export const layerDefs = [
  { id: "aS", length: 3 },
  { id: "bS", length: 4 },
  { id: "cS", length: 2 }
];

export const updates = {
  1000: {
    layer: "aS",
    slot: "0",
    id: 10,
    dynStyle: { backgroundColor: "grey", left: "-=10", top: "+=50" },
    content: "grey"
  },
  2000: {
    layer: "bS",
    slot: "0",
    id: 11,
    dynStyle: { backgroundColor: "yellow" },
    content: "yellow"
  },
  3500: {
    id: 11,
    leave: true
  },
  4000: {
    layer: "aS",
    slot: "2",
    id: 12,
    dynStyle: { backgroundColor: "orange" },
    content: "XOXOX"
  },
  5000: {
    layer: "cS",
    slot: "0",
    id: 12,
    dynStyle: { backgroundColor: "crimson" },
    content: "crimson"
  }
};

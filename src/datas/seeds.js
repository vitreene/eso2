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
    style: { backgroundColor: "grey" },
    content: "grey"
  },
  2000: {
    layer: "bS",
    slot: "0",
    id: 11,
    style: { backgroundColor: "yellow" },
    content: "yellow"
  },
  3000: {
    id: 11,
    leave: true
  },
  4000: {
    layer: "aS",
    slot: "2",
    id: 12,
    style: { backgroundColor: "orange" },
    content: "XOXOX"
  },
  5000: {
    layer: "cS",
    slot: "0",
    id: 12,
    style: { backgroundColor: "crimson" },
    content: "crimson"
  }
};

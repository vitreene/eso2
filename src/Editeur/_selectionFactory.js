export function selectionFactory(container, EnableEdit) {
  const selected = new Set();
  let deep = 0;
  const enable = new EnableEdit();
  const scene = container._wire$;

  return function selectElement(e) {
    const multi = e.shiftKey;
    const under = e.altKey;
    const belows = document.elementsFromPoint(e.clientX, e.clientY);
    let below = belows[0];
    if (under) {
      let maxDeep = Infinity;
      belows.forEach((el, index) => el.isEqualNode(scene) && (maxDeep = index));
      deep = maxDeep === 0 ? 0 : (deep + 1) % maxDeep;
      below = belows[deep];
    }
    const noSelection = below.isEqualNode(scene);
    if (noSelection) deselectAll();
    else {
      if (selected.has(below) && multi) {
        enable.remove(below);
        selected.delete(below);
      } else {
        deselectAll();
        selected.add(below);
        enable.add(below);
      }
    }
    function deselectAll() {
      if (multi) return;
      selected.forEach((el) => enable.remove(el));
      selected.clear();
    }
  };
}

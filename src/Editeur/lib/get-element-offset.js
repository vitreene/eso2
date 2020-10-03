export function getElementOffset(el = null) {
  const width = el && el.offsetWidth;
  const height = el && el.offsetHeight;

  function getOffset(el, left = 0, top = 0) {
    if (!el || isNaN(el.offsetLeft) || isNaN(el.offsetTop))
      return { x: left, y: top, top, left, width, height };
    return getOffset(
      el.offsetParent,
      left + el.offsetLeft - el.scrollLeft,
      top + el.offsetTop - el.scrollTop
    );
  }
  return getOffset(el);
}

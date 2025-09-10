/** Determines whether the element is scrollable. Does not include `overflow: hidden`. */
export function hasScrollbar(element: Element) {
  const overflowY = window.getComputedStyle(element).overflowY;
  return (
    // I'm not sure if this null check is necessary for some browsers? But I'm keeping it
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    overflowY != null &&
    !(overflowY.includes(`hidden`) || overflowY.includes(`visible`)) &&
    element.scrollHeight >= element.clientHeight
  );
}

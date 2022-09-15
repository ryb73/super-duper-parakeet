import { isDefined } from "../type-checks";

/** Determines whether the element is scrollable. Does not include `overflow: hidden`. */
export function hasScrollbar(element: Element) {
  const overflowY = window.getComputedStyle(element).overflowY;
  return (
    isDefined(overflowY) &&
    !(overflowY.includes(`hidden`) || overflowY.includes(`visible`)) &&
    element.scrollHeight >= element.clientHeight
  );
}

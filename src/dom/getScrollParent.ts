import { isDefined } from "../type-checks";

/** Determines whether the element is scrollable. Does not include `overflow: hidden`. */
function hasScrollbar(element: Element) {
  const overflowY = window.getComputedStyle(element).overflowY;
  return (
    isDefined(overflowY) &&
    !(overflowY.includes(`hidden`) || overflowY.includes(`visible`)) &&
    element.scrollHeight >= element.clientHeight
  );
}

export function getScrollParent(element: HTMLElement): HTMLElement | null {
  if (hasScrollbar(element)) {
    return element;
  }

  if (
    !isDefined(element.parentElement) ||
    element.parentElement === document.body
  ) {
    return document.scrollingElement as HTMLElement;
  }

  return getScrollParent(element.parentElement);
}

import { hasScrollbar } from "./hasScrollbar.js";

export function getScrollParent(element: HTMLElement): HTMLElement | null {
  if (hasScrollbar(element)) {
    return element;
  }

  if (
    element.parentElement == null ||
    element.parentElement === document.body
  ) {
    return document.scrollingElement as HTMLElement;
  }

  return getScrollParent(element.parentElement);
}

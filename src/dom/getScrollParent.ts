import { isDefined } from "../type-checks.js";
import { hasScrollbar } from "./hasScrollbar.js";

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

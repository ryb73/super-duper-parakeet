import styled from "@emotion/styled";
import * as Collapsible from "@radix-ui/react-collapsible";
import React, { useCallback, useEffect, useState } from "react";
import { isDefined } from "../type-checks.js";

const additionalStyleProps = {
  hasBeenOpen: true,
  prerender: true,
};

const makeStyledCollapsible = styled(Collapsible.Content, {
  shouldForwardProp: (s) =>
    !Object.keys(additionalStyleProps).includes(s as string),
});

const StyledCollapsibleContent = makeStyledCollapsible<
  typeof additionalStyleProps
>(
  // Prerender the content so that radix can retrieve the height. Position it absolutely so that
  // it doesn't affect the layout.
  ({ prerender }) =>
    prerender
      ? {
          position: `absolute`,
          top: 0,
          visibility: `hidden`,
          zIndex: -1,
        }
      : {},
  // If the content is initially mounted but closed (i.e. forceMount is passed into
  // DynamicHeightCollapsibleContent), we want the animation to act as if it's already happened
  // (i.e. if there's an animation with animation-fill-mode forward where the height goes to 0,
  //  the height should be rendered as 0 immediately rather than showing the animation).
  // This is achieved by forcing the animation duration to 0 until the content is opened.
  // "!important" is unfortunately required because (afaict) radix is using their own logic to set
  // or unset the animation props. It kind of seems like they're trying to accomplish the same thing
  // I'm doing here, except it's not working?
  ({ forceMount, hasBeenOpen }) =>
    forceMount && !hasBeenOpen
      ? {
          animationDuration: `0s !important`,
        }
      : {},
);

type Props = {
  readonly isOpen: boolean;
};

/** Mount Collapsible.Content to the page so that it gets dynamically sized before hiding. */
export function DynamicHeightCollapsibleContent({
  isOpen,
  ...props
}: Collapsible.CollapsibleContentProps & Props) {
  const [rendered, setRendered] = useState(false);
  const [elem, setElem] = useState<HTMLElement>();

  const handleRef = useCallback(
    (e: HTMLElement | null) => setElem(e ?? undefined),
    [],
  );

  const [hasBeenOpen, setHasBeenOpen] = useState(isOpen);

  useEffect(() => {
    if (isOpen && !hasBeenOpen) setHasBeenOpen(true);
  }, [hasBeenOpen, isOpen]);

  useEffect(() => {
    if (rendered || !isDefined(elem)) return undefined;

    const interval = setInterval(() => {
      const heightValue = +getComputedStyle(elem)
        .getPropertyValue(`--radix-collapsible-content-height`)
        .replace(/px/gu, ``);

      // In my testing, I never recorded an instance where the element is rendered but height isn't set.
      // Can't hurt to be safe here though, right?
      if (!Number.isNaN(heightValue) && heightValue > 0) {
        setRendered(true);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [elem, rendered]);

  return (
    <StyledCollapsibleContent
      {...props}
      forceMount={rendered ? props.forceMount : true}
      hasBeenOpen={hasBeenOpen}
      prerender={!rendered}
      ref={handleRef}
    />
  );
}

import { keyframes } from "@emotion/react";

export const radixCollapsibleHeightAnimations = {
  open: keyframes({
    from: { height: 0 },
    to: { height: `var(--radix-collapsible-content-height, 0)` },
  }),
  close: keyframes({
    from: { height: `var(--radix-collapsible-content-height, 0)` },
    to: { height: 0 },
  }),
};

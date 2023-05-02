import { sst } from "./simple-styled";

/**
 * Renders a <sup> which doesn't affect the line height. This prevents the superscript text from
 * affecting the container height and thus affecting vertical alignment, for example in a table cell
 * or flex child.
 */
export const SafeSup = sst(`sup`)({
  lineHeight: 0,
});

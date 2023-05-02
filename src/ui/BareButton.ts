import { SafeButton } from "./SafeButton";
import { ssc } from "./simple-styled";

export const BareButton = ssc(SafeButton)({
  background: `none`,
  border: 0,
  color: `inherit`,
  letterSpacing: `inherit`,
  padding: 0,
});

import { delay as fpDelay } from "fp-ts/lib/Task";

export function delay(ms: number) {
  // eslint-disable-next-line total-functions/no-premature-fp-ts-effects
  return fpDelay(ms)(() => Promise.resolve())();
}

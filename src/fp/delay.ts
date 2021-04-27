import { delay as fpDelay } from "fp-ts/lib/Task";

export function delay(ms: number) {
  return fpDelay(ms)(() => Promise.resolve())();
}

type Height = number;
type Width = number;
export type Resolution = [Width, Height];

const resolutions: Resolution[] = [
  [1024, 768],
  [1280, 800],
  [1366, 768],
  [1440, 900],
  [1920, 1080],
];

export function withResolutions<T>(fn: (resolution: Resolution) => T[]) {
  // TODO: Use flatMap once Node 10 is dropped
  // eslint-disable-next-line unicorn/prefer-array-flat
  return resolutions
    .map((resolution) => fn(resolution))
    .reduce((acc, a) => [...acc, ...a], []);
}

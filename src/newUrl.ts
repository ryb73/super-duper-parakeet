export function newUrl(url: string) {
  try {
    // eslint-disable-next-line total-functions/no-partial-url-constructor
    return new URL(url);
  } catch {
    return undefined;
  }
}

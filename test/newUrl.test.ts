// eslint-disable-next-line @typescript-eslint/no-shadow
import { expect, test } from "@jest/globals";
import { newUrl } from "../src/newUrl.js";

test(`good`, () => {
  expect(newUrl(`https://example.com`)).toBeInstanceOf(URL);
});

test(`bad`, () => {
  expect(newUrl(`dkjslhfsdfsdf`)).toBeUndefined();
});

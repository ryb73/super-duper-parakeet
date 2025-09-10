import { newUrl } from "../src/newUrl.js";

test(`good`, () => {
  expect(newUrl(`https://example.com`)).toBeInstanceOf(URL);
});

test(`bad`, () => {
  expect(newUrl(`dkjslhfsdfsdf`)).toBeUndefined();
});

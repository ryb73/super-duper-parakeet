import { newUrl } from "../src/newUrl";

test(`good`, () => {
  expect(newUrl(`https://example.com`)).toBeInstanceOf(URL);
});

test(`bad`, () => {
  expect(newUrl(`dkjslhfsdfsdf`)).toBeUndefined();
});

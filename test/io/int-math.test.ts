import type { Int } from "io-ts";
import { one, zero } from "../../src/io/constants";
import {
  addInt,
  floor,
  lengthInt,
  maxInt,
  minInt,
  multiplyInt,
  parseIntStrong,
  subtractInt,
} from "../../src/io/int-math";

test(`add`, () => {
  expect(addInt(one, zero, 48 as Int)).toBe(49);
});

test(`subtract`, () => {
  expect(subtractInt(one, zero, 48 as Int)).toBe(-47);
});

test(`multiply`, () => {
  expect(multiplyInt(one, 2 as Int, 48 as Int)).toBe(96);
});

test(`minInt`, () => {
  expect(minInt(one, zero, 48 as Int)).toBe(0);
});

test(`maxInt`, () => {
  expect(maxInt(one, zero, 48 as Int)).toBe(48);
});

test(`floor`, () => {
  expect(floor(452.234_234)).toBe(452);
});

test(`length`, () => {
  expect(lengthInt([3, 4234, 231, 2, 12_312, 3, 121, 2])).toBe(8);
});

describe(`parseIntStrong`, () => {
  test(`int`, () => {
    expect(parseIntStrong(`101`)).toBe(101);
  });

  test(`decimal`, () => {
    expect(parseIntStrong(`313.232`)).toBe(313);
  });

  test(`string`, () => {
    expect(parseIntStrong(`string`)).toBeNull();
  });
});

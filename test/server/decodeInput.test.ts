import { isLeft } from "fp-ts/lib/Either.js";
import { string } from "io-ts";
import type { MinimalResponse } from "../../src/server/decodeInput.js";
import { decodeInput } from "../../src/server/decodeInput.js";

test(`no existing data`, async () => {
  expect.assertions(3);

  const req = `reqq`;

  const res = {
    status: jest.fn(),
    end: jest.fn(),
  };
  const handler = jest.fn();

  const resultantHandler = decodeInput(string, (r: string) => r.repeat(2))(
    handler,
  );

  await resultantHandler(req, res, {});

  expect(res.status.mock.calls).toEqual([]);
  expect(res.end.mock.calls).toEqual([]);
  expect(handler.mock.calls).toEqual([[req, res, { input: `${req}${req}` }]]);
});

test(`existing data`, async () => {
  expect.assertions(3);

  const req = `reqq`;

  const res = {
    status: jest.fn(),
    end: jest.fn(),
    // Add another method just to make sure the types are working correctly (I forget the word for it, inheritance? duck typing? ugh it's late)
    another: jest.fn(),
  };

  const existingData = { derple: `tv` };

  const handler = jest.fn(
    /* eslint-disable unused-imports/no-unused-vars */
    (
      rq: string,
      rs: MinimalResponse & { another: () => void },
      args: { derple: string; input: string },
    ) => {},
    /* eslint-enable unused-imports/no-unused-vars */
  );

  const resultantHandler = decodeInput(string, (r: string) => r.repeat(2))(
    handler,
  );

  await resultantHandler(req, res, existingData);

  expect(res.status.mock.calls).toEqual([]);
  expect(res.end.mock.calls).toEqual([]);
  expect(handler.mock.calls).toEqual([
    [req, res, { input: `${req}${req}`, ...existingData }],
  ]);
});

// This shouldn't really be relied upon in practice, but I want to be sure nothing
// weird happens if the programmer passes in data with an existing `input` key
test(`existing input key`, async () => {
  expect.assertions(3);

  const req = `reqq`;

  const res = {
    status: jest.fn(),
    end: jest.fn(),
  };

  const existingData = { derple: `tv`, input: 42 };

  const handler = jest.fn(
    /* eslint-disable unused-imports/no-unused-vars */
    (
      rq: string,
      rs: MinimalResponse,
      args: { derple: string; input: string },
    ) => {},
    /* eslint-enable unused-imports/no-unused-vars */
  );

  const resultantHandler = decodeInput(string, (r: string) => r.repeat(2))(
    handler,
  );

  await resultantHandler(req, res, existingData);

  expect(res.status.mock.calls).toEqual([]);
  expect(res.end.mock.calls).toEqual([]);
  expect(handler.mock.calls).toEqual([
    [req, res, { ...existingData, input: `${req}${req}` }],
  ]);
});

describe(`error`, () => {
  test(`base`, async () => {
    expect.assertions(3);

    const req = `reqq`;

    const res = {
      status: jest.fn(),
      end: jest.fn(),
    };
    const handler = jest.fn();

    const resultantHandler = decodeInput(string, () => 0)(handler);

    await resultantHandler(req, res, {});

    expect(res.status.mock.calls).toEqual([[400]]);
    expect(res.end.mock.calls).toEqual([[]]);
    expect(handler.mock.calls).toEqual([]);
  });

  test(`onError`, async () => {
    expect.assertions(4);

    const res = {
      status: jest.fn(),
      end: jest.fn(),
    };

    const req = `reqq`;
    const handler = jest.fn();
    const onError = jest.fn();

    const resultantHandler = decodeInput(string, () => 0, { onError })(handler);

    await resultantHandler(req, res, {});

    expect(res.status.mock.calls).toEqual([[400]]);
    expect(res.end.mock.calls).toEqual([[]]);
    expect(handler.mock.calls).toEqual([]);

    const decoded = string.decode(0);
    if (!isLeft(decoded)) throw new Error(`oops`);
    expect(onError.mock.calls).toEqual([[decoded.left]]);
  });
});

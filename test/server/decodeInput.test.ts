import { isLeft } from "fp-ts/lib/Either";
import { string } from "io-ts";
import type { MinimalResponse } from "../../src/server/decodeInput";
import { decodeInput } from "../../src/server/decodeInput";

test(`no existing data`, async () => {
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
  const req = `reqq`;

  const res = {
    status: jest.fn(),
    end: jest.fn(),
  };

  const existingData = { derple: `tv` };

  const handler = jest.fn(
    /* eslint-disable @typescript-eslint/no-unused-vars */
    (
      rq: string,
      rs: MinimalResponse,
      args: { derple: string; input: string },
    ) => {},
    /* eslint-enable @typescript-eslint/no-unused-vars */
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

describe(`error`, () => {
  test(`base`, async () => {
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

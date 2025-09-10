import dayjs from "dayjs";
import { DayUtc } from "../../src/io/DayUtc.js";
import { forceDecode } from "../../src/io/forceDecode.js";

describe(`basic`, () => {
  test(`decode`, () => {
    const s = `2021-09-24 04:47:18.583412`;
    expect(forceDecode(DayUtc, s).toISOString()).toBe(
      `2021-09-24T04:47:18.583Z`,
    );
  });

  test(`encode`, () => {
    const day = dayjs(`2021-09-24 04:47:18.583412`, { utc: true });
    expect(DayUtc.encode(day)).toBe(`2021-09-24T04:47:18.583Z`);
  });
});

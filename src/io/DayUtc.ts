import type { Dayjs } from "dayjs";
import dayjs, { isDayjs } from "dayjs";
import { Type, failure, string, success } from "io-ts";

// Cache days mainly to prevent equality checks from failing leading to unnecessary re-renders
// This is possible because Dayjs objects are immutable (TODO: they are immutable, right?)
class Cache {
  private readonly dayMap = new Map<string, Dayjs>();

  public get(day: Dayjs) {
    const key = day.toISOString();

    const existing = this.dayMap.get(key);
    if (existing) return existing;

    this.dayMap.set(key, day);
    return day;
  }
}

const cache = new Cache();

const DayUtc = string.pipe(
  new Type<Dayjs, string, string>(
    `DayUtcFromString`,
    (v): v is Dayjs => isDayjs(v),
    (s, c) => {
      const result = dayjs(s);
      if (!result.isValid()) return failure(s, c, `Invalid Date`);
      return success(cache.get(result));
    },
    (m: Dayjs) => m.toISOString(),
  ),
  `DayUtc`,
);
export { DayUtc };

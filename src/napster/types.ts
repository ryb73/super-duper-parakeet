import type { TypeOf } from "io-ts";
import { type } from "io-ts";
import { brandedString } from "../io/brandedString";

export type UserIdBrand = {
  readonly NapsterUserIdBrand: unique symbol;
};

const UserId = brandedString<UserIdBrand>(`NapsterUserId`);
// eslint-disable-next-line @typescript-eslint/no-redeclare
type UserId = TypeOf<typeof UserId>;
export { UserId };

const Account = type({
  account: type({
    id: UserId,
  }),
});
// eslint-disable-next-line @typescript-eslint/no-redeclare
type Account = TypeOf<typeof Account>;
export { Account };

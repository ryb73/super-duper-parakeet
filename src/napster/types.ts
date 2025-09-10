import type { TypeOf } from "io-ts";
import {
  boolean,
  exact,
  intersection,
  literal,
  nullType,
  number,
  partial,
  strict,
  string,
  union,
} from "io-ts";
import { BooleanFromString } from "io-ts-types";
import { brandedNonEmptyString } from "../io/brandedString.js";
import { DayUtc } from "../io/DayUtc.js";
import { nullable } from "../io/nullable.js";

export type Config = { apiKey: string; accessToken: string };

export type UserIdBrand = {
  readonly NapsterUserIdBrand: unique symbol;
};

const UserId = brandedNonEmptyString<UserIdBrand>(`NapsterUserId`);
type UserId = TypeOf<typeof UserId>;
export { UserId };

const Account = strict({
  account: intersection([
    strict({
      id: UserId,
    }),

    exact(
      partial({
        cobrand: nullable(string),
        cocat: nullable(string),
        country: nullable(string),
        created: nullable(DayUtc),
        email: nullable(string),
        entitlements: exact(
          partial({
            canPlayPremiumRadio: boolean,
            canStreamHiRes: boolean,
            canStreamOffline: boolean,
            canStreamOnDemand: boolean,
            canStreamOnHomeDevice: boolean,
            canStreamOnMobile: boolean,
            canStreamOnPC: boolean,
            canStreamOnWeb: boolean,
            canStreamRadio: boolean,
            canUpgradeStreams: boolean,
            isMonthlyPlayBasedTier: boolean,
            isOneTimePlayBasedTier: boolean,
            isPlayBasedTier: boolean,
            maxDeviceCount: nullable(number),
            maxDownloadBitrate: nullable(number),
            maxPcCount: nullable(number),
            maxStreamBitrate: nullable(number),
            maxStreamCount: nullable(number),
            playsRemaining: nullable(number),
            skipLimit: nullable(number),
            skipLimitMinutes: nullable(number),
            totalPlays: nullable(number),
          }),
        ),
        firstName: nullable(string),
        isCurrentSubscriptionPayable: boolean,
        isPublic: boolean,
        lang: string,
        lastName: nullable(string),
        middleName: nullable(string),
        nickName: nullable(string),
        nonDmcaRadioUser: boolean,
        originCode: string,
        parentalControlEnabled: boolean,
        preferredLanguage: string,
        screenName: string,
        screenNameAutoCreated: union([BooleanFromString, boolean]), // it gives me a string, but maybe they'll fix in future?
        scrobblingEnabled: boolean,
        state: nullable(string),
        subscription: exact(
          partial({
            billingPartner: string,
            billingPartnerCode: string,
            catalog: string,
            createDate: DayUtc,
            createdWithSocialProvider: nullType,
            expirationDate: number,
            id: string,
            isSuspended: boolean,
            isTrial: boolean,
            productCode: string,
            productName: string,
            productServiceTerm: string,
            state: union([literal(`EXPIRED`), string]),
            tierCode: string,
            tierName: string,
            trialLengthDays: number,
          }),
        ),
        type: literal(`account`),
        userName: string,
      }),
    ),
  ]),
});
type Account = TypeOf<typeof Account>;
export { Account };

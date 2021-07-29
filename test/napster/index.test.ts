import dayjs from "dayjs";
import { string } from "io-ts";
import { forceDecode } from "../../src/io/forceDecode";
import { getAccount, refreshAccessToken } from "../../src/napster";
import type { Account, Config, UserId } from "../../src/napster/types";

const {
  NAPSTER_API_KEY,
  NAPSTER_SECRET,
  NAPSTER_REDIRECT_URI,
  NAPSTER_REFRESH_TOKEN,
} = process.env;

const isConfigured =
  NAPSTER_API_KEY &&
  NAPSTER_SECRET &&
  NAPSTER_REDIRECT_URI &&
  NAPSTER_REFRESH_TOKEN;

const describeFn = isConfigured ? describe : describe.skip;

function apiKey() {
  return forceDecode(string, NAPSTER_API_KEY);
}

async function accessToken() {
  const secret = forceDecode(string, NAPSTER_SECRET);
  const redirectUri = forceDecode(string, NAPSTER_REDIRECT_URI);
  const refreshToken = forceDecode(string, NAPSTER_REFRESH_TOKEN);

  return (await refreshAccessToken(apiKey(), secret, redirectUri, refreshToken))
    .access_token;
}

async function config(): Promise<Config> {
  const token = await accessToken();
  return {
    accessToken: token,
    apiKey: apiKey(),
  };
}

describeFn(`napster`, () => {
  test(`refreshAccessToken`, async () => {
    expect(await accessToken()).toBeDefined();
  });

  test(`getAccount`, async () => {
    expect(await getAccount(await config())).toStrictEqual<Account>({
      account: {
        cobrand: `40134`,
        cocat: `40134:101:en_GB`,
        country: `US`,
        created: dayjs(`2017-09-20T01:25:17.000Z`),
        email: `rpbiwer@gmail.com`,
        entitlements: {
          canPlayPremiumRadio: false,
          canStreamHiRes: false,
          canStreamOffline: false,
          canStreamOnDemand: false,
          canStreamOnHomeDevice: false,
          canStreamOnMobile: false,
          canStreamOnPC: false,
          canStreamOnWeb: false,
          canStreamRadio: false,
          canUpgradeStreams: true,
          isMonthlyPlayBasedTier: false,
          isOneTimePlayBasedTier: false,
          isPlayBasedTier: false,
          maxDeviceCount: 1,
          maxDownloadBitrate: 320,
          maxPcCount: 0,
          maxStreamBitrate: 320,
          maxStreamCount: 0,
          playsRemaining: null,
          skipLimit: 6,
          skipLimitMinutes: 60,
          totalPlays: null,
        },
        firstName: null,
        id: `531CD0A99037AB40E050960A3803398F` as UserId,
        isCurrentSubscriptionPayable: false,
        isPublic: true,
        lang: `en-GB`,
        lastName: null,
        middleName: null,
        nickName: null,
        nonDmcaRadioUser: true,
        originCode: `default`,
        parentalControlEnabled: false,
        preferredLanguage: `en_GB`,
        screenName: `Artist15025`,
        screenNameAutoCreated: true,
        scrobblingEnabled: false,
        state: null,
        subscription: {
          billingPartner: `Rhapsody`,
          billingPartnerCode: `Rhapsody`,
          catalog: `US`,
          createDate: dayjs(`2017-09-20T01:25:17.000Z`),
          createdWithSocialProvider: null,
          expirationDate: 0,
          id: ``,
          isSuspended: false,
          isTrial: false,
          productCode: ``,
          productName: ``,
          productServiceTerm: ``,
          state: `EXPIRED`,
          tierCode: `R25`,
          tierName: ``,
          trialLengthDays: 0,
        },
        type: `account`,
        userName: `rpbiwer@gmail.com`,
      },
    });
  });
});

// https://developer.spotify.com/documentation/general/guides/scopes/
export type Scope =
  | "app-remote-control"
  | "playlist-modify-private"
  | "playlist-modify-public"
  | "playlist-read-collaborative"
  | "playlist-read-private"
  | "streaming"
  | "ugc-image-upload"
  | "user-follow-modify"
  | "user-follow-read"
  | "user-library-modify"
  | "user-library-read"
  | "user-modify-playback-state"
  // user-read-birthdate deprecated? no longer on aforementioned docs page
  | "user-read-birthdate"
  | "user-read-currently-playing"
  | "user-read-email"
  | "user-read-playback-position"
  | "user-read-playback-state"
  | "user-read-private"
  | "user-read-recently-played"
  | "user-top-read";

function scopesToStr(scopes: Scope[]) {
  return scopes.join(`,`);
}

export function createAuthorizeUrl(
  clientId: string,
  redirectUri: string,
  scopes: Scope[],
  responseType: "code" | "token",
  { state, forceShowDialog }: { state?: string; forceShowDialog?: boolean },
) {
  const queryParams: Record<string, string> = {
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: scopesToStr(scopes),
    response_type: responseType,
  };

  if (state !== undefined) queryParams[`state`] = state;
  if (forceShowDialog !== undefined)
    queryParams[`forceShowDialog`] = String(forceShowDialog);

  const query = new URLSearchParams(queryParams).toString();

  return `https://accounts.spotify.com/authorize?${query}`;
}

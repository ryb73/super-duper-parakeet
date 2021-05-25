import React from "react";

export type Options = {
  retryCount?: number;
};

function Loading({ retryCount }: Options = {}) {
  return (
    <div>
      Loading...
      {retryCount && ` (retry ${retryCount})`}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
type Loading = typeof Loading;

export { Loading };

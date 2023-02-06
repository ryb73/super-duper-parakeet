import React from "react";

export type Options = {
  retryCount?: number;
};

function Loading({ retryCount = 0 }: Options = {}) {
  return (
    <div>
      Loading...
      {retryCount > 0 && ` (retry ${retryCount})`}
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-redeclare
type Loading = typeof Loading;

export { Loading };

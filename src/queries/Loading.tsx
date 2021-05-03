import React from "react";
import type { QueryObserverLoadingResult } from "react-query";

export function Loading({ result }: { result?: QueryObserverLoadingResult }) {
  return (
    <div>
      Loading...{` `}
      {result && result.failureCount > 0 && `(retry ${result.failureCount})`}
    </div>
  );
}

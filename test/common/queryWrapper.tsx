import type { PropsWithChildren } from "react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

// eslint-disable-next-line @typescript-eslint/ban-types
export function queryWrapper({ children }: PropsWithChildren<{}>) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

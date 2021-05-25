import type { PropsWithChildren } from "react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

export const queryClient = new QueryClient();

// eslint-disable-next-line @typescript-eslint/ban-types
export function queryWrapper({ children }: PropsWithChildren<{}>) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

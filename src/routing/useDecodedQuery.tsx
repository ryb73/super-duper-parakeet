import type { Type } from "io-ts";
import { useRouter } from "next/router.js";
import { useMemo } from "react";
import { forceDecode } from "../io/forceDecode.js";

export function useDecodedQuery<A, O>(T: Type<A, O>) {
  const { query } = useRouter();
  return useMemo(() => forceDecode(T, query), [T, query]);
}

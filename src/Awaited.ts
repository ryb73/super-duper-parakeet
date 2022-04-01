/** @deprecated Included in latest Typescript. */
export type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;

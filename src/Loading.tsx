export type Options = {
  readonly retryCount?: number;
};

function Loading({ retryCount = 0 }: Options = {}) {
  return (
    <div>
      Loading...
      {retryCount > 0 && ` (retry ${retryCount})`}
    </div>
  );
}

type Loading = typeof Loading;

export { Loading };

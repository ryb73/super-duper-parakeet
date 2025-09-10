import type {
  ExactC,
  IntersectionC,
  PartialC,
  Props,
  Type,
  TypeC,
  UnionC,
} from "io-ts";
import {
  ExactType,
  InterfaceType,
  IntersectionType,
  PartialType,
  UnionType,
  exact,
  intersection,
  partial,
  type,
  union,
} from "io-ts";
import { isDefined } from "../type-checks.js";
import type { RenameKey } from "../types/RenameKey.js";
import type {
  ClassOfHasProps,
  ClassesOfHasProps,
  HasPropsC,
  PropsOfHasProps,
} from "./HasPropsC.js";

type RenameKeyLeafType<
  T extends PartialC<any> | TypeC<any>,
  Old extends string,
  New extends string,
> = T extends TypeC<any>
  ? TypeC<RenameKey<T["props"], Old, New>>
  : T extends PartialC<any>
  ? PartialC<RenameKey<T["props"], Old, New>>
  : never;

/* eslint-disable @typescript-eslint/no-use-before-define */
type RenameKeyClassArray<
  CS extends [HasPropsC, HasPropsC, ...HasPropsC[]],
  Old extends string,
  New extends string,
  C1 extends HasPropsC = CS[0],
  C2 extends HasPropsC = CS[1],
> = CS extends [C1, C2]
  ? [RenameKeyType<C1, Old, New>, RenameKeyType<C2, Old, New>]
  : CS extends [C1, ...infer Rest]
  ? Rest extends [HasPropsC, HasPropsC, ...HasPropsC[]]
    ? [RenameKeyType<C1, Old, New>, ...RenameKeyClassArray<Rest, Old, New>]
    : never
  : never;
/* eslint-enable @typescript-eslint/no-use-before-define */

export type RenameKeyType<
  T extends HasPropsC,
  Old extends string,
  New extends string,
> = T extends PartialC<any> | TypeC<any>
  ? RenameKeyLeafType<T, Old, New>
  : T extends ExactC<infer Inner>
  ? Inner extends PartialC<any> | TypeC<any>
    ? ExactC<RenameKeyLeafType<T["type"], Old, New>>
    : never
  : T extends UnionC<any>
  ? UnionC<RenameKeyClassArray<T["types"], Old, New>>
  : T extends IntersectionC<any>
  ? IntersectionC<RenameKeyClassArray<T["types"], Old, New>>
  : never;

function renameKeyType<
  T extends TypeC<any>,
  Old extends string,
  New extends string,
>(T: T, oldKey: Old, newKey: New): RenameKeyType<T, Old, New> {
  const { [oldKey]: discard, ...rest } = T.props;
  if (!isDefined(discard)) return T as unknown as RenameKeyType<T, Old, New>;

  return type({ ...rest, [newKey]: discard }) as RenameKeyType<T, Old, New>;
}

function renameKeyPartial<
  T extends PartialC<any>,
  Old extends string,
  New extends string,
>(T: T, oldKey: Old, newKey: New): RenameKeyType<T, Old, New> {
  const { [oldKey]: discard, ...rest } = T.props;
  if (!isDefined(discard)) return T as unknown as RenameKeyType<T, Old, New>;

  return partial({ ...rest, [newKey]: discard }) as RenameKeyType<T, Old, New>;
}

function renameKeyLeafType<
  T extends PartialC<any> | TypeC<any>,
  Old extends string,
  New extends string,
>(T: T, oldKey: Old, newKey: New): RenameKeyType<T, Old, New> {
  if (T instanceof InterfaceType) {
    return renameKeyType(T, oldKey, newKey);
  }

  if (T instanceof PartialType) {
    return renameKeyPartial(T, oldKey, newKey);
  }

  throw new Error(`Unexpected type: ${(T as Type<any>).name}`);
}

function renameKeyExactType<
  T extends ExactC<TypeC<any>>,
  Old extends string,
  New extends string,
>(T: T, oldKey: Old, newKey: New): RenameKeyType<T, Old, New> {
  return exact(renameKeyLeafType(T.type, oldKey, newKey)) as RenameKeyType<
    T,
    Old,
    New
  >;
}

export function renameKey<
  /* eslint-disable @typescript-eslint/no-use-before-define */
  Old extends string,
  New extends string,
  T extends HasPropsC<P, C, CS>,
  P extends Props = PropsOfHasProps<T>,
  C extends PartialC<P> | TypeC<P> = ClassOfHasProps<T>,
  CS extends [
    HasPropsC<P, C>,
    HasPropsC<P, C>,
    ...HasPropsC<P, C>[],
  ] = ClassesOfHasProps<T>,
  /* eslint-enable @typescript-eslint/no-use-before-define */
>(T: T, oldKey: Old, newKey: New): RenameKeyType<T, Old, New> {
  if (T instanceof InterfaceType || T instanceof PartialType) {
    return renameKeyLeafType(T, oldKey, newKey);
  }

  if (T instanceof ExactType) {
    return renameKeyExactType(T, oldKey, newKey);
  }

  if (T instanceof UnionType) {
    const [One, Two, ...Rest] = T.types;
    return union([
      renameKey(One as HasPropsC, oldKey, newKey),
      renameKey(Two as HasPropsC, oldKey, newKey),
      ...(Rest.map((UT) => renameKey(UT as HasPropsC, oldKey, newKey)) as any),
    ]) as unknown as RenameKeyType<T, Old, New>;
  }

  if (T instanceof IntersectionType) {
    const [One, Two, Three, Four, Five] = T.types;
    return intersection(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      [
        renameKey(One as HasPropsC, oldKey, newKey),
        renameKey(Two as HasPropsC, oldKey, newKey),
        Three != null
          ? renameKey(Three as HasPropsC, oldKey, newKey)
          : undefined,
        Four != null ? renameKey(Four as HasPropsC, oldKey, newKey) : undefined,
        Five != null ? renameKey(Five as HasPropsC, oldKey, newKey) : undefined,
      ].filter(isDefined) as any,
    ) as unknown as RenameKeyType<T, Old, New>;
  }

  throw new Error(`Unexpected type: ${(T as Type<any>).name}`);
}

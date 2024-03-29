import type {
  ExactC,
  IntersectionC,
  PartialC,
  Props,
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
  union,
} from "io-ts";
import { isDefined } from "../type-checks";
import type {
  ClassOfHasProps,
  ClassesOfHasProps,
  HasPropsC,
  PropsOfHasProps,
} from "./HasPropsC";

/* eslint-disable @typescript-eslint/no-use-before-define */
type PartializeClassArray<
  CS extends [HasPropsC, HasPropsC, ...HasPropsC[]],
  C1 extends HasPropsC = CS[0],
  C2 extends HasPropsC = CS[1],
> = CS extends [C1, C2]
  ? [MakePartial<C1>, MakePartial<C2>]
  : CS extends [C1, ...infer Rest]
  ? Rest extends [HasPropsC, HasPropsC, ...HasPropsC[]]
    ? [MakePartial<C1>, ...PartializeClassArray<Rest>]
    : never
  : never;
/* eslint-enable @typescript-eslint/no-use-before-define */

export type MakePartial<T extends HasPropsC> = T extends TypeC<any>
  ? PartialC<PropsOfHasProps<T>>
  : T extends PartialC<any>
  ? T
  : T extends ExactC<any>
  ? ExactC<MakePartial<T["type"]>>
  : T extends UnionC<any>
  ? UnionC<PartializeClassArray<T["types"]>>
  : T extends IntersectionC<any>
  ? IntersectionC<PartializeClassArray<T["types"]>>
  : never;

export function makePartial<
  /* eslint-disable @typescript-eslint/no-use-before-define */
  T extends HasPropsC<P, C, CS>,
  P extends Props = PropsOfHasProps<T>,
  C extends PartialC<P> | TypeC<P> = ClassOfHasProps<T>,
  CS extends [
    HasPropsC<P, C>,
    HasPropsC<P, C>,
    ...HasPropsC<P, C>[],
  ] = ClassesOfHasProps<T>,
  /* eslint-enable @typescript-eslint/no-use-before-define */
>(T: T): MakePartial<T> {
  if (T instanceof InterfaceType) {
    return partial(T.props) as MakePartial<T>;
  }

  if (T instanceof PartialType) {
    return T as unknown as MakePartial<T>;
  }

  if (T instanceof ExactType) {
    const inner = makePartial<PartialC<P> | TypeC<P>, P, C, CS>(T.type);
    return exact(inner) as unknown as MakePartial<T>;
  }

  if (T instanceof UnionType) {
    const [One, Two, ...Rest] = T.types;
    return union([
      makePartial(One as HasPropsC),
      makePartial(Two as HasPropsC),
      ...Rest.map((UT) => makePartial(UT as HasPropsC)),
    ]) as unknown as MakePartial<T>;
  }

  if (T instanceof IntersectionType) {
    const [One, Two, Three, Four, Five] = T.types;
    return intersection(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      [
        makePartial(One as HasPropsC),
        makePartial(Two as HasPropsC),
        isDefined(Three) ? makePartial(Three as HasPropsC) : undefined,
        isDefined(Four) ? makePartial(Four as HasPropsC) : undefined,
        isDefined(Five) ? makePartial(Five as HasPropsC) : undefined,
      ].filter((v) => isDefined(v)) as any,
    ) as unknown as MakePartial<T>;
  }

  throw new Error(`Unexpected type: ${(T as HasPropsC).name}`);
}

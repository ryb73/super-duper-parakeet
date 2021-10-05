import type {
  ExactC,
  IntersectionC,
  PartialC,
  Props,
  TypeC,
  UnionC,
} from "io-ts";

export type HasPropsC<
  P extends Props = any,
  C extends PartialC<P> | TypeC<P> = any,
  CS extends [HasPropsC<P, C>, HasPropsC<P, C>, ...HasPropsC<P, C>[]] = any,
> = ExactC<C> | IntersectionC<CS> | PartialC<P> | TypeC<P> | UnionC<CS>;

export type PropsOfHasProps<T extends HasPropsC> = T extends ExactC<TypeC<any>>
  ? T["type"]["props"]
  : T extends HasPropsC<infer P>
  ? P
  : never;

export type ClassOfHasProps<T extends HasPropsC> = T extends HasPropsC<
  any,
  infer C
>
  ? C
  : never;

export type ClassesOfHasProps<T extends HasPropsC> = T extends HasPropsC<
  any,
  any,
  infer CS
>
  ? CS
  : never;

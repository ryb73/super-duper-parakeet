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
  M extends [HasPropsC<P, C>, HasPropsC<P, C>, ...HasPropsC<P, C>[]] = any,
> = ExactC<C> | IntersectionC<M> | PartialC<P> | TypeC<P> | UnionC<M>;

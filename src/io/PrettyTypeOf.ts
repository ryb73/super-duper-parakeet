import type { Any, TypeOf } from "io-ts";
import type { Prettify } from "../types/Prettify";

export type PrettyTypeOf<T extends Any> = Prettify<TypeOf<T>>;

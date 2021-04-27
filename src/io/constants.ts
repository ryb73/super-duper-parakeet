import { Int } from "io-ts";
import { forceEither } from "../fp/forceEither";

export const zero = forceEither(Int.decode(0));
export const one = forceEither(Int.decode(1));
export const two = forceEither(Int.decode(2));
export const three = forceEither(Int.decode(3));
export const four = forceEither(Int.decode(4));
export const five = forceEither(Int.decode(5));
export const six = forceEither(Int.decode(6));
export const seven = forceEither(Int.decode(7));
export const eight = forceEither(Int.decode(8));
export const nine = forceEither(Int.decode(9));

import { nanoid } from "nanoid";
import { useState } from "react";

function randomClassName() {
  return `x${nanoid()}`;
}

export function useRandomClassName() {
  return useState(() => randomClassName())[0];
}

import type { ButtonHTMLAttributes, ClassAttributes } from "react";
import React from "react";
import type { O } from "ts-toolbelt";

export function SafeButton(
  props: ClassAttributes<HTMLButtonElement> &
    JSX.IntrinsicAttributes &
    O.Required<ButtonHTMLAttributes<HTMLButtonElement>, "type">,
) {
  // eslint-disable-next-line react/button-has-type
  return <button {...props} />;
}

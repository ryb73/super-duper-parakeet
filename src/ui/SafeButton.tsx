import type { ButtonHTMLAttributes } from "react";
import React, { forwardRef } from "react";
import type { O } from "ts-toolbelt";

export const SafeButton = forwardRef<
  HTMLButtonElement,
  O.Required<ButtonHTMLAttributes<HTMLButtonElement>, "type">
  // eslint-disable-next-line total-functions/no-unsafe-readonly-mutable-assignment
>(function SafeButton(props, ref) {
  // eslint-disable-next-line react/button-has-type
  return <button {...props} ref={ref} />;
});

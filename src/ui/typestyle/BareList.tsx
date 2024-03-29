import type { ComponentPropsWithoutRef, ElementRef } from "react";
import React, { forwardRef } from "react";
import { classes, style } from "typestyle";
import { bareListStyles } from "../common/bareListStyles";

const baseClassName = style(bareListStyles);

export const BareList = forwardRef<
  ElementRef<"ul">,
  ComponentPropsWithoutRef<"ul">
>(function BareList({ className, ...props }, ref) {
  return (
    <ul className={classes(baseClassName, className)} ref={ref} {...props} />
  );
});

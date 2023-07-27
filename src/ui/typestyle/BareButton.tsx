import type { ComponentPropsWithoutRef, ElementRef } from "react";
import React, { forwardRef } from "react";
import { classes, style } from "typestyle";
import { bareButtonStyles } from "../common/bareButtonStyles";
import { SafeButton } from "../SafeButton";

const baseClassName = style(bareButtonStyles);

export const BareButton = forwardRef<
  ElementRef<typeof SafeButton>,
  ComponentPropsWithoutRef<typeof SafeButton>
>(function BareButton({ className, ...props }, ref) {
  return (
    <SafeButton
      className={classes(baseClassName, className)}
      ref={ref}
      {...props}
    />
  );
});

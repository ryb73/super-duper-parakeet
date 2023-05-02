import type { CSSProperties, ComponentType, ElementRef } from "react";
import React, { forwardRef } from "react";

// eslint-disable-next-line @typescript-eslint/no-redeclare
export function sst<Tag extends keyof JSX.IntrinsicElements>(Tag: Tag) {
  return (baseStyle: CSSProperties) =>
    forwardRef<
      ElementRef<Tag>,
      Omit<JSX.IntrinsicElements[Tag], "key" | "ref">
    >(function SimpleStyled({ style: propsStyle, ...props }, ref) {
      return (
        // @ts-expect-error Not sure how to fix this error tbh
        <Tag style={{ ...baseStyle, ...propsStyle }} ref={ref} {...props} />
      );
    });
}

export function ssc<P extends { style?: CSSProperties }>(
  Component: ComponentType<P>,
) {
  return (baseStyle: CSSProperties) =>
    forwardRef<ElementRef<ComponentType<P>>, Omit<P, "key" | "ref">>(
      // @ts-expect-error Not sure how to fix this error tbh
      function SimpleStyledComponent({ style: propsStyle, ...props }: P, ref) {
        return (
          // @ts-expect-error Not sure how to fix this error tbh
          <Component
            style={{ ...baseStyle, ...propsStyle }}
            ref={ref}
            {...props}
          />
        );
      },
    );
}

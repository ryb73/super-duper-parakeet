import type { Interpolation, PropsOf, Theme } from "@emotion/react";
import type { StyledComponent } from "@emotion/styled";
import styled from "@emotion/styled";
import type React from "react";
import type { ComponentProps, ComponentType } from "react";

export function safeStyledElement<
  Tag extends keyof JSX.IntrinsicElements,
  StyleProps extends Record<string, any>,
>(
  tag: Tag,
  typedefs: StyleProps,
): (
  ...styles: Interpolation<
    StyleProps & { theme?: Theme; as?: React.ElementType }
  >[]
) => StyledComponent<StyleProps, JSX.IntrinsicElements[Tag]> {
  return styled(tag, {
    shouldForwardProp: (prop) =>
      !Object.keys(typedefs).includes(prop as string),
  });
}

export function safeStyledComponent<
  C extends ComponentType<ComponentProps<C>>,
  StyleProps extends Record<string, any>,
>(
  Component: C,
  typedefs: StyleProps,
): (
  ...styles: Interpolation<
    PropsOf<C> & StyleProps & { theme?: Theme; as?: React.ElementType }
  >[]
) => StyledComponent<PropsOf<C> & StyleProps> {
  return styled(Component, {
    shouldForwardProp: (prop) =>
      !Object.keys(typedefs).includes(prop as string),
  });
}

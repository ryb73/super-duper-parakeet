import styled from "@emotion/styled";
import { useCallback, useEffect } from "react";
import type { HTMLAttributes, PropsWithChildren } from "react";
import { useRandomClassName } from "./randomClassName.js";

type Props = PropsWithChildren<
  Omit<HTMLAttributes<HTMLSpanElement>, "onClick"> & {
    readonly htmlFor: string;
    readonly setAriaLabel?: boolean;
  }
>;

const StyledSpan = styled.span({
  cursor: `default`,
});

export function FakeLabel({
  htmlFor,
  children,
  setAriaLabel = true,
  ...props
}: Props) {
  const generatedClassName = useRandomClassName();
  const labelId = props.id ?? generatedClassName;

  const handleClick = useCallback(() => {
    document.querySelector<HTMLElement>(`#${htmlFor}`)?.focus();
  }, [htmlFor]);

  useEffect(() => {
    if (!setAriaLabel) return undefined;

    const targetElem = document.querySelector(`#${htmlFor}`);
    if (targetElem == null) return undefined;

    targetElem.setAttribute(`aria-labelledby`, labelId);

    return () => targetElem.removeAttribute(`aria-labelledby`);
  }, [htmlFor, labelId, setAriaLabel]);

  return (
    <StyledSpan id={labelId} onClick={handleClick} {...props}>
      {children}
    </StyledSpan>
  );
}

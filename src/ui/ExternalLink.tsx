import type { AnchorHTMLAttributes, DetailedHTMLProps } from "react";
import React from "react";

export function ExternalLink({
  children,
  ...props
}: Omit<
  DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
  "rel" | "target"
>) {
  return (
    <a {...props} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

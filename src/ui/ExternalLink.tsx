import type { AnchorHTMLAttributes, DetailedHTMLProps } from "react";

export function ExternalLink({
  children,
  ...props
}: Omit<
  DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
  "rel" | "target"
>) {
  return (
    <a {...props} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  );
}

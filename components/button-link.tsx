import { ArrowRight } from "lucide-react";
import type { AnchorHTMLAttributes } from "react";

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "secondary";
};

export function ButtonLink({ className = "", variant = "primary", children, ...props }: ButtonLinkProps) {
  const styles =
    variant === "primary"
      ? "bg-accent text-primary hover:bg-amber-400"
      : "bg-white/10 text-white ring-1 ring-white/35 hover:bg-white/20";

  return (
    <a
      className={`focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-bold transition ${styles} ${className}`}
      {...props}
    >
      {children}
      <ArrowRight size={18} aria-hidden="true" />
    </a>
  );
}

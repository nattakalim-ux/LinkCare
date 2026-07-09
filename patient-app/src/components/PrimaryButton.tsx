"use client";

import Link from "next/link";

type BaseProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
};

const styles = {
  primary:
    "bg-gradient-to-r from-teal to-dashboard-blue text-white shadow-sm shadow-turquoise/20 hover:brightness-105 active:brightness-95",
  secondary: "bg-surface text-navy hover:bg-surface/70",
};

export function PrimaryButton({
  children,
  className = "",
  variant = "primary",
  href,
  onClick,
  type = "button",
  disabled,
}: BaseProps & {
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const classes = `flex h-14 w-full items-center justify-center rounded-button text-button font-semibold transition duration-150 disabled:opacity-50 disabled:pointer-events-none ${styles[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}

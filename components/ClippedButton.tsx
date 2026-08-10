"use client";

import { ReactNode, isValidElement, cloneElement, CSSProperties } from "react";
import clsx from "clsx";

type ClippedButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  className?: string;
  asChild?: boolean;
};

type ChildProps = {
  className?: string;
  style?: CSSProperties;
};

export function ClippedButton({
  children,
  onClick,
  disabled,
  type = "button",
  className = "",
  asChild = false,
}: ClippedButtonProps) {
  const sharedClasses = clsx(
    "inline-flex items-center justify-center gap-2",
    "rounded-md border px-6 py-2.5 text-xs font-bold tracking-widest uppercase",
    "bg-black border-[#F6CC60] text-[#F6CC60]",
    "shadow-[0_0_10px_rgba(246,204,96,0.35)]",
    "transition-all hover:brightness-110 hover:shadow-[0_0_16px_rgba(246,204,96,0.5)]",
    "disabled:cursor-not-allowed disabled:opacity-50",
    className,
  );

  if (asChild && isValidElement<ChildProps>(children)) {
    const child = children;
    return cloneElement(child, {
      className: clsx(child.props.className, sharedClasses),
    });
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(sharedClasses, "cursor-pointer")}
    >
      {children}
    </button>
  );
}

"use client";

import { Download } from "lucide-react";

interface DevHostButtonProps {
  href: string;
  children: React.ReactNode;
  download?: boolean;
}

export default function DevHostButton({
  href,
  children,
  download = false,
}: DevHostButtonProps) {
  return (
    <a
      href={href}
      download={download || undefined}
      className="group relative inline-flex items-center justify-center"
    >
      <span
        className="
          relative inline-flex items-center justify-center gap-3
          overflow-hidden rounded-sm
          border border-[#8F6B2E]/60
          bg-transparent
          px-7 py-3.5
          font-norse text-sm font-bold uppercase tracking-[0.3em]
          text-[#B99A55]
          shadow-[inset_0_0_0_1px_rgba(246,204,96,0.03)]
          transition-all duration-300
          group-hover:-translate-y-0.5
          group-hover:border-[#F6CC60]/80
          group-hover:bg-[#F6CC60]/5
          group-hover:text-[#F6CC60]
          group-hover:shadow-[0_0_20px_rgba(246,204,96,0.10),inset_0_0_14px_rgba(246,204,96,0.04)]
          active:translate-y-0
        "
      >
        <span
          className="
            pointer-events-none absolute inset-y-0 -left-10 w-8
            rotate-[20deg]
            bg-white/10 blur-sm
            transition-all duration-700
            group-hover:left-[110%]
          "
        />

        <Download
          size={17}
          strokeWidth={1.8}
          className="relative transition-transform duration-300 group-hover:-translate-y-0.5"
        />

        <span className="relative">{children}</span>
      </span>
    </a>
  );
}
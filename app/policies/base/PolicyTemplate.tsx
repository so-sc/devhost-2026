"use client";

import React from "react";

interface PolicyTemplateProps {
  title: string;
  children: React.ReactNode;
}

export default function PolicyTemplate({
  title,
  children,
}: PolicyTemplateProps) {
  return (
    <main className="flex min-h-screen flex-col items-center bg-black px-6 pt-20 pb-10 font-sans text-white">
      <div className="w-full max-w-3xl">
        <h2 className="font-norse-bold mb-6 text-center text-4xl font-extrabold tracking-[0.12em] uppercase md:text-7xl">
          <span className="bg-gradient-to-r from-[#F6CC60] via-[#FFF5D0] to-[#C9963E] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(246,204,96,0.3)]">
            {title}
          </span>
        </h2>
        <section className="font-lora space-y-5 text-justify text-base leading-relaxed font-light text-white md:text-lg">
          {children}
        </section>
      </div>
    </main>
  );
}

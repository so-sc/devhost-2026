"use client";

import React from "react";

interface PolicyTemplateProps {
  title: string;
  children: React.ReactNode;
  bgImage?: string;
  mobileBgImage?: string;
}

export default function PolicyTemplate({
  title,
  children,
  bgImage,
  mobileBgImage,
}: PolicyTemplateProps) {
  return (
    <main className="relative flex min-h-screen flex-col items-center bg-black px-6 pt-28 md:pt-36 pb-32 md:pb-40 font-lora text-white overflow-hidden">
      {bgImage && (
        <div
          className={`pointer-events-none absolute inset-0 z-0 ${mobileBgImage ? 'hidden md:block' : 'block'}`}
          style={{
            backgroundImage: `url('${bgImage}')`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      )}
      {mobileBgImage && (
        <div
          className="pointer-events-none absolute inset-0 z-0 block md:hidden"
          style={{
            backgroundImage: `url('${mobileBgImage}')`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      )}
      <div className="relative z-10 w-full max-w-3xl">
        <h1 className="text-primary font-norse-bold mb-12 text-center text-4xl font-bold tracking-wider md:text-5xl">
          {title}
        </h1>
        <section className="space-y-5 text-justify text-base leading-relaxed font-light text-white md:text-lg">
          {children}
        </section>
      </div>
    </main>
  );
}

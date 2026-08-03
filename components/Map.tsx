"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Map = () => {
  const topCut1 = useRef<HTMLDivElement>(null);
  const topCut2 = useRef<HTMLDivElement>(null);
  const bottomCut1 = useRef<HTMLDivElement>(null);
  const bottomCut2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animateCut = (
      el: HTMLDivElement | null,
      y: number,
      duration: number,
      skew: number,
    ) => {
      if (!el) return;

      gsap.to(el, {
        y,
        skewY: skew,
        opacity: 0.15,
        duration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    };

    animateCut(topCut1.current, 6, 5, 3);
    animateCut(topCut2.current, -6, 6, -3);
    animateCut(bottomCut1.current, -6, 5, -3);
    animateCut(bottomCut2.current, 6, 6, 3);
  }, []);

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0a0a0a] px-4 text-white sm:px-6">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at top, rgba(246,204,96,0.06), transparent 45%),
            radial-gradient(circle at bottom, rgba(255,255,255,0.02), transparent 70%),
            linear-gradient(180deg,#191919 0%,#121212 55%,#090909 100%)
          `,
        }}
      />

      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at center, rgba(45,45,45,.65) 0%, rgba(18,18,18,.92) 60%, #090909 100%)",
        }}
      />

      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle, transparent 40%, rgba(0,0,0,.65) 100%)",
        }}
      />

      {/* Gold Glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[700px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px]"
        style={{
          background:
            "radial-gradient(circle, rgba(246,204,96,.08), transparent 70%)",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 py-16 lg:grid-cols-5">
        {/* Left */}
        <div className="space-y-6 lg:col-span-2">
          <h2 className="font-norse-bold text-6xl text-[#F6CC60] uppercase md:text-7xl">
            Location
          </h2>

          <h3 className="font-norse text-xl text-gray-200 md:text-2xl">
            Sahyadri College of Engineering &amp; Management
          </h3>

          <p className="font-trajan max-w-md leading-8 text-gray-400">
            Looking to join the fun? You&apos;ll find us right here, where
            passion fuels lasting memories.
          </p>

          {/* Decorative Divider */}
          <div className="flex items-center gap-4 pt-2">
            <div className="h-px w-20 bg-gradient-to-r from-[#F6CC60] to-transparent" />

            <div className="flex h-3 w-3 rotate-45 border border-[#F6CC60]" />

            <div className="h-px flex-1 bg-gradient-to-r from-[#F6CC60]/60 to-transparent" />
          </div>
        </div>
        {/* Right */}
        <div className="relative lg:col-span-3">
          {/* Outer Glow */}
          <div className="absolute -inset-5 rounded-xl bg-[#F6CC60]/10 blur-3xl" />

          {/* Frame */}
          <div className="relative rounded-xl border border-[#6C5730] bg-[#23201A]/40 p-4 shadow-[0_20px_80px_rgba(0,0,0,.55)] backdrop-blur-md">
            {/* Gold Accent */}
            <div className="absolute top-0 right-8 left-8 h-px bg-gradient-to-r from-transparent via-[#F6CC60] to-transparent" />
            <div className="absolute right-8 bottom-0 left-8 h-px bg-gradient-to-r from-transparent via-[#F6CC60] to-transparent" />

            {/* Inner Border */}
            <div className="overflow-hidden rounded-lg border border-[#C89D47]/70">
              <iframe
                src="https://maps.google.com/maps?q=Sahyadri%20College%20of%20Engineering%20and%20Management&t=&z=16&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[500px] w-full border-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Map;

"use client";

import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Map = () => {
  const topCut1 = useRef(null);
  const topCut2 = useRef(null);
  const bottomCut1 = useRef(null);
  const bottomCut2 = useRef(null);

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
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url('/images/parchment-texture.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.6,
          mixBlendMode: "soft-light",
        }}
      />

      {/* Gold glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(246,204,96,.07),transparent_65%)]" />

      {/* Dark overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black/35" />

      {/* Main Content */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 sm:px-10 lg:grid-cols-5 lg:px-14 xl:px-20">
        
        {/* LEFT — TEXT */}
        <div className="space-y-6 lg:col-span-2">
          <h2 className="font-norse-bold text-6xl font-extrabold tracking-[0.12em] uppercase md:text-8xl">
            <span className="bg-gradient-to-r from-[#F6CC60] via-[#FFF5D0] to-[#C9963E] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(246,204,96,0.3)]">
              Location
            </span>
          </h2>

          <h3 className="font-norse text-lg tracking-[0.10em] text-[#C8A24C]/80 sm:tracking-[0.14em] md:text-2xl">
            Sahyadri College of Engineering &amp; Management
          </h3>

          <p
            className="max-w-md text-base leading-[1.75] tracking-[0.03em] text-white/75"
            style={{
              textShadow:
                "0 1px 1px rgba(0,0,0,.7),0 0 12px rgba(246,204,96,.08)",
            }}
          >
            Looking to join the fun? You&apos;ll find us right here, where
            passion fuels lasting memories.
          </p>
        </div>

        {/* RIGHT — LOCATION IMAGE */}
        <div className="relative lg:col-span-3 lg:flex lg:justify-center">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Sahyadri+College+of+Engineering+and+Management"
            target="_blank"
            rel="noopener noreferrer"
            className="group block w-full lg:w-[88%]"
          >
            <div className="relative overflow-hidden rounded-sm">
              
              {/* Location image */}
              <Image
                src="/images/map.png"
                alt="Sahyadri College of Engineering and Management"
                width={1500}
                height={1000}
                className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                priority
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/10 transition-all duration-300 group-hover:bg-black/25" />

              {/* Click to view */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2">
                <div className="border border-[#F6CC60]/70 bg-black/70 px-6 py-2 backdrop-blur-sm transition-all duration-300 group-hover:border-[#F6CC60]">
                  <span className="font-norse text-sm tracking-[0.2em] text-[#F6CC60] uppercase">
                    Click to View Location
                  </span>
                </div>
              </div>

            </div>
          </a>
        </div>

      </div>
    </section>
  );
};

export default Map;
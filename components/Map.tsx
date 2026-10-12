"use client";

import Image from "next/image";
import React from "react";
// import { gsap } from "gsap";

const Map = () => {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0a0a0a] px-4 py-8 text-white sm:px-24">
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url('/images/parchment-texture.jpg')",
          backgroundSize: "100% 100%",
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
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 py-16 text-center sm:text-left lg:grid-cols-5">
        {/* LEFT — TEXT */}
        <div className="space-y-6 lg:col-span-2">
          <h2 className="font-norse-bold text-6xl font-extrabold tracking-[0.12em] uppercase md:text-8xl">
            <span className="from-gold via-gold-light to-gold-deep bg-gradient-to-r bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(246,204,96,0.3)]">
              Location
            </span>
          </h2>

          <h3 className="font-norse text-gold-antique/80 text-lg font-semibold tracking-[0.10em] sm:tracking-[0.14em] md:text-xl">
            Sahyadri College of Engineering &amp; Management
          </h3>

          <p
            className="font-lora text-base leading-[1.75] tracking-[0.03em] text-white/75 sm:text-lg"
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
        <div className="relative lg:col-span-3 lg:flex lg:justify-end">
          <a
            href="https://www.google.com/maps/search/?api=1&query=Sahyadri+College+of+Engineering+and+Management"
            target="_blank"
            rel="noopener noreferrer"
            className="group block w-full sm:w-[75%]"
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
                <div className="border-gold/70 group-hover:border-gold border bg-black/70 px-2 py-1 backdrop-blur-sm transition-all duration-300 sm:px-6 sm:py-2">
                  <span className="font-norse text-gold text-xs tracking-[1px] uppercase sm:text-sm sm:tracking-[0.2em]">
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

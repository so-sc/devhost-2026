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
  className="pointer-events-none absolute inset-0"
  style={{
    backgroundImage: "url('/images/parchment-texture.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 0.6,
    mixBlendMode: "soft-light",
  }}
/>


<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(246,204,96,.07),transparent_65%)]" />


<div className="pointer-events-none absolute top-10 right-0 z-[1] hidden w-[280px] lg:block xl:w-[380px]">
  <img
    src="/images/about-temple.png"
    alt=""
    className="h-auto w-full object-contain opacity-[0.12] select-none"
  />
</div>


<div className="pointer-events-none absolute top-[-30px] left-1/2 z-[1] hidden w-[180px] -translate-x-1/2 sm:block md:w-[240px]">
  <img
    src="/images/sun-graphic.svg"
    alt=""
    className="h-auto w-full object-contain opacity-[0.12] select-none"
  />
</div>


<div className="pointer-events-none absolute bottom-0 left-0 z-[1] hidden w-[220px] lg:block xl:w-[260px]">
  <img
    src="/images/mythic_spartan_shield.webp"
    alt=""
    className="h-auto w-full object-contain opacity-[0.18] select-none"
  />
</div>

<div className="pointer-events-none absolute bottom-0 left-0 z-[1] block w-[120px] sm:w-[150px] lg:hidden">
  <img
    src="/images/mythic_spartan_shield.webp"
    alt=""
    className="h-auto w-full object-contain opacity-[0.10] select-none"
  />
</div>

      {/* Main Content */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 py-16 lg:grid-cols-5">
        {/* Left */}
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
  className="max-w-md text-base leading-[1.75] tracking-[0.03em] text-white/75 "
  style={{
    textShadow:
      "0 1px 1px rgba(0,0,0,.7),0 0 12px rgba(246,204,96,.08)",
  }}
>
  Looking to join the fun? You&apos;ll find us right here, where
  passion fuels lasting memories.
</p>
         
        </div>
        {/* Right */}
        <div className="relative lg:col-span-3">
         

          {/* Frame */}
          <div className="relative rounded-xl border border-[#312b20] bg-[#23201A]/40 p-4 shadow-[0_20px_80px_rgba(0,0,0,.55)] backdrop-blur-md">
            {/* Gold Accent */}
            <div className="absolute top-0 right-8 left-8 h-px bg-gradient-to-r from-transparent via-[#F6CC60] to-transparent" />
            <div className="absolute right-8 bottom-0 left-8 h-px bg-gradient-to-r from-transparent via-[#F6CC60] to-transparent" />

            {/* Inner Border */}
            <div className="overflow-hidden rounded-lg border border-[#C89D47]/40">
              <iframe
                src="https://maps.google.com/maps?q=Sahyadri%20College%20of%20Engineering%20and%20Management&t=&z=16&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[480px] w-full border-0"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Map;

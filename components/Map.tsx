"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
const Map = () => {
  const frameRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleGlowRef = useRef(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    let split: SplitType | null = null;
    const ctx = gsap.context(() => {
      split = new SplitType(paragraphRef.current!, {
        types: "lines",
      });

      split.lines?.forEach((line) => {
        line.style.overflow = "hidden";
      });

      gsap.set(split.lines, {
        opacity: 0,
        y: 20,
      });
      gsap.to(split.lines, {
        opacity: 1,
        y: 0,
        stagger: 0.12,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: paragraphRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
      gsap.from(frameRef.current, {
        opacity: 0,
        y: 100,
        scale: 0.94,
        rotationX: 8,
        transformPerspective: 1000,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: frameRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
      gsap.from(mapRef.current, {
        clipPath: "inset(0 50% 0 50%)",
        duration: 1.3,
        delay: 25,
        ease: "power4.out",
        scrollTrigger: {
          trigger: mapRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
      gsap.to(titleGlowRef.current, {
        filter: "drop-shadow(0 0 20px rgba(246,204,96,.6))",
        scale: 1.01,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
      });
    });
    return () => {
      split?.revert();
      ctx.revert();
    };
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
          <h2
            ref={titleRef}
            className="font-norse-bold text-6xl font-extrabold tracking-[0.12em] uppercase md:text-8xl"
          >
            <span
              ref={titleGlowRef}
              className="bg-gradient-to-r from-[#F6CC60] via-[#FFF5D0] to-[#C9963E] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(246,204,96,0.3)]"
            >
              Location
            </span>
          </h2>

          <h3 className="font-norse text-lg tracking-[0.10em] text-[#C8A24C]/80 sm:tracking-[0.14em] md:text-2xl">
            Sahyadri College of Engineering &amp; Management
          </h3>

          <p
            ref={paragraphRef}
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
        {/* Right */}
        <div className="relative lg:col-span-3">
          {/* Frame */}
          <div
            ref={frameRef}
            className="relative rounded-xl border border-[#312b20] bg-[#23201A]/40 p-4 shadow-[0_20px_80px_rgba(0,0,0,.55)] backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-[#F6CC60]/60 hover:shadow-[0_25px_80px_rgba(246,204,96,0.12)]"
          >
            {/* Gold Accent */}
            <div className="absolute top-0 right-8 left-8 h-px bg-gradient-to-r from-transparent via-[#F6CC60] to-transparent" />
            <div className="absolute right-8 bottom-0 left-8 h-px bg-gradient-to-r from-transparent via-[#F6CC60] to-transparent" />

            {/* Inner Border */}
            <div
              ref={mapRef}
              className="overflow-hidden rounded-lg border border-[#C89D47]/40"
            >
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

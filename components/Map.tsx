"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Map = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const captionRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const mapFrameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set([titleRef.current, captionRef.current, paragraphRef.current], {
          opacity: 0,
          y: 35,
        });

        gsap.set(mapFrameRef.current, {
          opacity: 0,
          scale: 0.97,
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        });

        tl.to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        })
          .to(
            captionRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
            },
            "-=0.3",
          )
          .to(
            paragraphRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
            },
            "-=0.2",
          )
          .to(
            mapFrameRef.current,
            {
              opacity: 1,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.3",
          );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0a0a0a] px-4 py-8 text-white sm:px-24"
    >
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
          <h2
            ref={titleRef}
            className="font-norse-bold text-6xl font-extrabold tracking-[0.12em] uppercase md:text-8xl"
          >
            <span className="bg-gradient-to-r from-[#F6CC60] via-[#FFF5D0] to-[#C9963E] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(246,204,96,0.3)]">
              Location
            </span>
          </h2>

          <h3
            ref={captionRef}
            className="font-norse text-lg font-semibold tracking-[0.10em] text-[#C8A24C]/80 sm:tracking-[0.14em] md:text-xl"
          >
            Sahyadri College of Engineering &amp; Management
          </h3>

          <p
            ref={paragraphRef}
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
        <div
          ref={mapFrameRef}
          className="relative mx-auto w-full sm:w-[75%] lg:col-span-3 lg:mx-0 lg:flex lg:w-full lg:justify-end"
        >
          <a
            href="https://www.google.com/maps/search/?api=1&query=Sahyadri+College+of+Engineering+and+Management"
            target="_blank"
            rel="noopener noreferrer"
            className="group block w-full"
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
                <div className="border border-[#F6CC60]/70 bg-black/70 px-2 py-1 backdrop-blur-sm transition-all duration-300 group-hover:border-[#F6CC60] sm:px-6 sm:py-2">
                  <span className="font-norse text-xs tracking-[1px] text-[#F6CC60] uppercase sm:text-sm sm:tracking-[0.2em]">
                    Click to View Location
                  </span>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* Bottom Transition Gradient */}
      <div
        className="pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-32"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(10, 10, 10, 0.4) 30%, rgba(12, 9, 1, 0.85) 75%, #0c0901 100%)",
        }}
      />
    </section>
  );
};

export default Map;

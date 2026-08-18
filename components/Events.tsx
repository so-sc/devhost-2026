"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { events } from "@/assets/data/events";

gsap.registerPlugin(ScrollTrigger);

const CornerBorder = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 42 42"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 18V8a6 6 0 0 1 6-6h10"
      stroke="#C8A24C"
      strokeWidth="1.4"
      strokeLinecap="round"
    />

    <path
      d="M2 28V22H8V16H14"
      stroke="#C8A24C"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <circle cx="8" cy="8" r="1.8" fill="#C8A24C" />
  </svg>
);

export default function Events() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate cards only
      cardsRef.current.forEach((card) => {
        gsap.to(card, {
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "top 60%",
            toggleActions: "play none none none",
          },
        });
      });

      // Responsive clip-path for green background
      const updateClipPath = () => {
        if (!bgRef.current) return;
        const width = window.innerWidth;
        if (width >= 1024) {
          bgRef.current.style.clipPath =
            "polygon(0% 0%, 100% 0%, 100% 92%, 85% 100%, -5% 100%)";
        } else {
          bgRef.current.style.clipPath =
            "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
        }
      };

      updateClipPath();
      window.addEventListener("resize", updateClipPath);
      return () => window.removeEventListener("resize", updateClipPath);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative flex flex-col items-center overflow-hidden bg-black py-20 md:py-30"
    >
      {/* Static Green Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0"
        style={{
          clipPath: "polygon(0% 0%, 100% 0%, 100% 92%, 85% 100%, -5% 100%)",

          background: `
    radial-gradient(circle at top,
      rgba(200,162,76,0.06),
      transparent 45%),
    radial-gradient(circle at bottom,
      rgba(255,255,255,0.02),
      transparent 65%),
    linear-gradient(
      180deg,
      #1a1a1a 0%,
      #121212 50%,
      #0b0b0b 100%
    )
  `,
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle, transparent 45%, rgba(0,0,0,.55) 100%)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(45,45,45,0.65) 0%, rgba(22,22,22,0.95) 55%, #0d0d0d 100%)",
        }}
      />

      {/* Optional marble texture later

<Image
    src="/textures/marble.webp"
    alt=""
    fill
    className="object-cover opacity-[0.05] pointer-events-none"
/>

*/}

      {/* Heading */}
      <div className="relative z-10 mb-8 px-4 text-center">
        <div
          className="absolute inset-0 -z-10 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(200,162,76,.08), transparent 70%)",
            textShadow: "0 2px 6px rgba(0,0,0,.55),0 8px 20px rgba(0,0,0,.35)",
          }}
        />
        <div className="relative mb-4 text-center sm:mb-6">
          <h2 className="font-norse-bold mb-2 text-6xl font-extrabold tracking-[0.12em] md:text-8xl">
            <span className="bg-gradient-to-r from-[#F6CC60] via-[#FFF5D0] to-[#C9963E] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(246,204,96,0.3)]">
              DEVHOST EVENTS
            </span>
          </h2>
          <h3 className="font-norse text-lg font-semibold tracking-[0.10em] text-[#C8A24C]/80 sm:tracking-[0.14em] md:text-2xl">
            build, compete and leave your mark
          </h3>
        </div>
        {/* Rulebook button */}
        {/* <div className="mt-6 flex flex-col items-center">
          <a href="/brochure/devhost_event_rulebook.pdf" download>
            <ClippedButton
              innerBg="bg-[#1B1A18]"
              outerBg="bg-[#C8A24C]"
              textColor="text-[#F5E4B2]"
              className="border border-[#C8A24C]/70 shadow-[0_0_12px_rgba(200,162,76,0.15)] transition-all duration-300 hover:border-[#F6CC60] hover:shadow-[0_0_22px_rgba(200,162,76,0.28)]"
            >
              <span className={`${dalek.className} text-xs tracking-wider`}>
                EVENT RULEBOOK
              </span>
            </ClippedButton>
          </a>
        </div> */}
      </div>
      <div
        className="pointer-events-none absolute top-[340px] left-1/2 -z-0 h-[700px] w-[1100px] -translate-x-1/2 rounded-full blur-[160px]"
        style={{
          background:
            "radial-gradient(circle, rgba(200,162,76,.06), transparent 70%)",
        }}
      />

      {/* Event cards */}
      <div className="relative z-10 grid w-full max-w-[1200px] grid-cols-1 gap-8 px-4 lg:grid-cols-2">
        {events.map((event, idx) => {
          return (
            <div
              key={event.id}
              ref={(el) => {
                if (el) cardsRef.current[idx] = el;
              }}
              className="relative mx-auto w-full overflow-hidden border border-[#C8A24C]/60 shadow-[0_0_12px_rgba(200,162,76,0.08)] transition-all duration-500 hover:-translate-y-1 hover:border-[#E2B756] hover:shadow-[0_18px_35px_rgba(200,162,76,0.18)]"
              style={{
                clipPath:
                  "polygon(20px 0%, 100% 0%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0% 100%, 0% 12px)",
              }}
            >
              <CornerBorder className="absolute top-2 right-2 z-20 h-8 w-8 rotate-90" />
              <CornerBorder className="absolute right-1 bottom-1 z-20 h-8 w-8 rotate-180" />
              <CornerBorder className="absolute bottom-1 left-1 z-20 h-8 w-8 -rotate-90" />

              <div
                className="relative z-10 m-[2px] flex h-full flex-col p-4 sm:flex-row"
                style={{
                  clipPath:
                    "polygon(20px 0%,100% 0%,100% calc(100% - 12px),calc(100% - 12px) 100%,0% 100%,0% 12px)",

                  background:
                    "linear-gradient(145deg,#353330 0%,#2b2927 45%,#1d1b1a 100%)",

                  boxShadow:
                    "inset 0 0 0 1px rgba(255,255,255,.03), inset 0 20px 45px rgba(255,255,255,.03), 0 0 25px rgba(0,0,0,.45)",
                }}
              >
                <div
                  className="relative aspect-square w-full overflow-hidden border border-[#C8A24C]/40 shadow-inner sm:aspect-[4/5] sm:w-1/2 md:mb-2"
                  style={{
                    clipPath:
                      "polygon(20px 0%, 100% 0%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0% 100%, 0% 12px)",
                  }}
                >
                  <Image
                    src={event.image}
                    alt={event.title}
                    width={500}
                    height={500}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>

                <div className="font-lora mt-3 flex flex-1 flex-col justify-between px-4 py-5 pl-0 sm:mt-0 sm:pl-4">
                  <div>
                    <h2
                      className={`font-norse mb-5 text-2xl font-bold tracking-wide text-[#F6CC60] lg:text-3xl`}
                    >
                      {/* &gt;  */}
                      {event.title}
                    </h2>
                    <p className="text-md mb-1 text-white/90 italic">
                      {event.tagline}
                    </p>
                    <p className="mb-2 text-sm text-white/70 lg:text-sm">
                      {event.description}
                    </p>
                    <div className="space-y-0.5 pt-4 text-sm text-white/80">
                      <p>
                        <span className="mr-1 font-semibold text-[#F6CC60]">
                          Date:
                        </span>
                        {event.date}
                      </p>
                      <p>
                        <span className="mr-1 font-semibold text-[#F6CC60]">
                          Time:
                        </span>
                        {event.time}
                      </p>
                      <p>
                        <span className="mr-1 font-semibold text-[#F6CC60]">
                          Organizer:
                        </span>
                        {event.organizer}
                      </p>
                      <p>
                        <span className="mr-1 font-semibold text-[#F6CC60]">
                          Contact:
                        </span>
                        {event.contact}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

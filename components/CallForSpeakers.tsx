"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SpeakerCarousel from "./SpeakerCarousel";
import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

const SUN_X = 58;

const BEAMS = [
  { x: SUN_X, w: 30, rot: -3, a: 0.22, blur: 26 },
  { x: SUN_X - 6, w: 14, rot: 9, a: 0.13, blur: 16 },
  { x: SUN_X + 6, w: 12, rot: -14, a: 0.12, blur: 16 },
  { x: SUN_X - 1, w: 7, rot: 3, a: 0.16, blur: 8 },
  { x: SUN_X + 12, w: 8, rot: -22, a: 0.08, blur: 14 },
  { x: SUN_X - 12, w: 9, rot: 17, a: 0.08, blur: 14 },
];

const SUN_GLOW = `radial-gradient(
  ellipse 38% 55% at ${SUN_X}% -4%,
  rgba(255,214,150,0.42) 0%,
  rgba(255,190,120,0.12) 40%,
  transparent 70%
), radial-gradient(
  ellipse 70% 60% at ${SUN_X}% 0%,
  rgba(255,215,160,0.14) 0%,
  transparent 75%
)`;

export default function CallForSpeakers() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    let refreshTimer: NodeJS.Timeout;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>("[data-reveal]", section);

      const wraps = gsap.utils.toArray<HTMLElement>(
        "[data-beam-wrap]",
        section,
      );

      const beams = gsap.utils.toArray<HTMLElement>("[data-beam]", section);

      gsap.set(wraps, {
        rotation: (_i: number, el: HTMLElement) => Number(el.dataset.rot) || 0,
        transformOrigin: "50% 0%",
        force3D: true,
      });

      gsap.set(beams, {
        transformOrigin: "50% 0%",
        opacity: 0,
        scaleY: 0.12,
        force3D: true,
      });

      gsap.set(bgRef.current, {
        opacity: 0,
        force3D: true,
      });

      gsap.set(glowRef.current, {
        opacity: 0,
        force3D: true,
      });

      gsap.set(items, {
        opacity: 0,
        y: 32,
        force3D: true,
      });

      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
          end: "top 25%",
          scrub: 0.4,
          invalidateOnRefresh: true,
        },
      });

      entranceTl
        .to(bgRef.current, { opacity: 1, ease: "none" }, 0)
        .to(glowRef.current, { opacity: 1, ease: "none" }, 0)
        .to(
          beams,
          {
            opacity: 1,
            scaleY: 1,
            stagger: 0.04,
            ease: "none",
          },
          0,
        )
        .to(
          items,
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
          },
          0.1,
        );

      const sway = wraps.map((el, i) =>
        gsap.to(el, {
          rotation: Number(el.dataset.rot) + (i % 2 ? -2 : 2),
          opacity: 0.75,
          duration: 6 + i * 1.7,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        }),
      );

      refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);

      return () => {
        clearTimeout(refreshTimer);
        sway.forEach((tween) => tween.kill());
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="speakers"
      className="relative min-h-svh w-full overflow-hidden bg-[#050403] py-18 pb-24 text-white sm:py-24 sm:pb-32 lg:px-8"
    >
      <div
        ref={bgRef}
        className="absolute inset-0 bg-[url('/images/greek-callfs2.png')] bg-cover bg-center bg-no-repeat opacity-0 will-change-[opacity] sm:bg-right lg:bg-[url('/images/greek-callfs.png')]"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent sm:bg-gradient-to-r sm:from-black/70 sm:via-black/30 sm:to-transparent" />

      <div
        ref={glowRef}
        className="pointer-events-none absolute inset-0 z-[3] opacity-0 mix-blend-screen will-change-[opacity]"
        style={{
          background: SUN_GLOW,
        }}
      />

      <div className="pointer-events-none absolute inset-0 z-[3] mix-blend-screen">
        {BEAMS.map((b, i) => (
          <div
            key={i}
            data-beam-wrap
            data-rot={b.rot}
            className={`absolute -top-[4%] h-[105%] will-change-transform ${
              i >= 4 ? "hidden lg:block" : ""
            }`}
            style={{
              left: `${b.x - b.w / 2}%`,
              width: `${b.w}%`,
              filter: `blur(${b.blur}px)`,
            }}
          >
            <div
              data-beam
              className="h-full w-full will-change-transform"
              style={{
                clipPath: "polygon(40% 0, 60% 0, 100% 100%, 0 100%)",
                background: `linear-gradient(
                  to bottom,
                  rgba(255,226,175,${b.a}) 0%,
                  rgba(255,214,150,${(b.a * 0.45).toFixed(3)}) 40%,
                  transparent 100%
                )`,
              }}
            />
          </div>
        ))}
      </div>

      <div
        data-reveal
        className="relative z-10 flex min-h-svh w-full flex-col justify-between will-change-[opacity,transform]"
      >
        <div className="w-full px-4 md:px-20 xl:px-30 xl:pt-24">
          <h2 className="font-norse-bold mb-2 bg-gradient-to-r from-[#F6CC60] via-[#FFF5D0] to-[#C9963E] bg-clip-text text-6xl font-extrabold tracking-[0.12em] text-transparent uppercase drop-shadow-[0_2px_10px_rgba(246,204,96,0.3)] md:text-8xl">
            Call for Speakers
          </h2>

          <p className="font-norse text-lg font-semibold tracking-[0.10em] text-[#C8A24C]/80 sm:tracking-[0.14em] md:text-2xl">
            Grace the mythic stage of DevHost 2026
          </p>

          <p className="font-lora text-md mx-[-10] mt-8 max-w-xl px-3 leading-relaxed tracking-[0.02em] break-words text-white sm:text-lg sm:leading-[1.75] sm:tracking-[0.03em] md:py-10 lg:max-w-6xl lg:py-10 xl:max-w-5xl">
            Share your knowledge, research, and technical vision with
            developers, students, and industry leaders. Whether your focus is AI
            and machine learning, open source infrastructure, cloud and Web3, or
            software architecture, take the stage at DevHost 2026.
          </p>

          <div className="mt-8 flex w-full flex-col items-center gap-3 sm:mt-18 md:mt-2">
            <Button
              onClick={() => {
                window.location.href = "https://forms.gle/PxRYSUCY5ycXWERDA";
              }}
            >
              Submit Proposal
            </Button>
          </div>
        </div>

        <div className="mt-10 w-full">
          <SpeakerCarousel />
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import SpeakerCarousel from "./SpeakerCarousel";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);
export default function SpeakersInfo() {
  const sectionRef = useRef<HTMLElement>(null);
  // const titleRef = useRef<HTMLHeadingElement>(null);
  // const titleGlowRef = useRef<HTMLSpanElement>(null);
  // const captionRef = useRef<HTMLHeadingElement>(null);
  // const paragraphRef = useRef<HTMLParagraphElement>(null);
  // const buttonRef = useRef<HTMLAnchorElement>(null);
  const ornamentDesktopRef = useRef<HTMLDivElement>(null);
  const ornamentMobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // let split: SplitType | null = null;

    const ctx = gsap.context(() => {
      // split = new SplitType(paragraphRef.current!, {
      //   types: "lines",
      // });

      // split.lines?.forEach((line) => {
      //   line.style.overflow = "hidden";
      // });

      // gsap.set([titleRef.current, captionRef.current, buttonRef.current], {
      //   opacity: 0,
      //   y: 40,
      // });

      // if (split?.lines) {
      //   gsap.set(split.lines, {
      //     opacity: 0,
      //     y: 20,
      //   });
      // }

      // const tl = gsap.timeline({
      //   scrollTrigger: {
      //     trigger: sectionRef.current,
      //     start: "top 75%",
      //     toggleActions: "play none none reverse",
      //   },
      // });

      // tl.to(titleRef.current, {
      //   opacity: 1,
      //   y: 0,
      //   duration: 0.6,
      //   ease: "power3.out",
      // })
      //   .to(
      //     captionRef.current,
      //     {
      //       opacity: 1,
      //       y: 0,
      //       duration: 0.4,
      //       ease: "power2.out",
      //     },
      //     "-=0.3",
      //   )
      //   .add(() => {
      //     if (split?.lines) {
      //       gsap.to(split.lines, {
      //         opacity: 1,
      //         y: 0,
      //         stagger: 0.12,
      //         duration: 0.6,
      //         ease: "power2.out",
      //       });
      //     }
      //   })
      //   .to(
      //     buttonRef.current,
      //     {
      //       opacity: 1,
      //       y: 0,
      //       duration: 0.4,
      //       ease: "back.out(1.3)",
      //     },
      //     "-=0.1",
      //   );

      // gsap.to(titleGlowRef.current, {
      //   filter: "drop-shadow(0 0 18px rgba(246,204,96,0.6))",
      //   scale: 1.01,
      //   duration: 2.5,
      //   repeat: -1,
      //   yoyo: true,
      //   ease: "sine.inOut",
      // });

      [ornamentDesktopRef.current, ornamentMobileRef.current].forEach(
        (ornament) => {
          if (!ornament) return;

          gsap.to(ornament, {
            rotate: 360,
            duration: 180,
            repeat: -1,
            ease: "none",
          });
        },
      );
    }, sectionRef);
    return () => {
      // split?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="speakers"
      className="relative flex w-full items-center justify-center overflow-hidden bg-[#050403] py-18 text-white sm:py-26 lg:px-8 lg:py-34"
    >
      <div
        className=""
        style={{
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

      <div className="relative z-10 mx-auto w-[80%]">
        <div className="relative mb-4 text-center sm:mb-6">
          <h2 className="font-norse-bold mb-2 text-6xl font-extrabold tracking-[0.12em] uppercase md:text-8xl">
            <span className="bg-gradient-to-r from-[#F6CC60] via-[#FFF5D0] to-[#C9963E] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(246,204,96,0.3)]">
              Call for Speakers
            </span>
          </h2>
          <h3 className="font-norse text-lg font-semibold tracking-[0.10em] text-[#C8A24C]/80 sm:tracking-[0.14em] md:text-2xl">
            Grace the Mythic Stage of DevHost 2026
          </h3>
        </div>

        <div
          ref={ornamentDesktopRef}
          className="pointer-events-none absolute top-8 left-1/2 z-0 hidden -translate-x-1/2 lg:block"
          style={{ width: "clamp(180px, 24vw, 420px)" }}
        >
          <Image
            src="/images/speakers_ornament.png"
            alt=""
            width={600}
            height={600}
            className="h-auto w-full opacity-[0.08] select-none"
            style={{ objectPosition: "center top" }}
          />
        </div>
        <div
          ref={ornamentMobileRef}
          className="pointer-events-none absolute top-56 left-1/2 z-0 block -translate-x-1/2 lg:hidden"
          style={{ width: "clamp(180px, 55vw, 300px)" }}
        >
          <Image
            src="/images/speakers_ornament.png"
            alt=""
            width={600}
            height={600}
            className="h-auto w-full object-contain opacity-[0.08] mix-blend-screen select-none"
            style={{ objectPosition: "center top" }}
          />
        </div>

        <div className="relative mx-auto flex flex-col items-center pt-4 sm:w-full sm:max-w-[80%] sm:pt-8">
          <div className="relative z-10 w-full text-justify">
            <p
              className="font-lora text-md leading-relaxed tracking-[0.02em] break-words text-white sm:text-lg sm:leading-[1.75] sm:tracking-[0.03em]"
              style={{
                textShadow:
                  "0 1px 1px rgba(0,0,0,.7),0 0 12px rgba(246,204,96,.08)",
              }}
            >
              Share your knowledge, research, and technical vision with
              passionate developers, students, and industry leaders. Whether you
              specialize in AI & Machine Learning, Open Source Infrastructure,
              Cloud & Web3, or Software Architecture, take the stage and inspire
              passionate developers at DevHost 2026.
            </p>
          </div>
        </div>

        <SpeakerCarousel />

        <div className="mt-10 flex w-full flex-col items-center gap-3 sm:mt-12">
          <Button
            onClick={() => {
              window.location.href = "https://forms.gle/PxRYSUCY5ycXWERDA";
            }}
          >
            Submit Proposal
          </Button>
        </div>
      </div>
    </section>
  );
}

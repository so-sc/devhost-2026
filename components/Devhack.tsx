"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

export default function DevHackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const captionRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const titleGlowRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const mountainRef = useRef<HTMLDivElement>(null);

  const devhackData = {
    title: "DevHack",
    caption: "36 Hours. Real Problems. Working Code.",
    about:
      "DevHack is the centre of DEVHOST. Teams get a problem statement, 36 hours, and mentors who've shipped actual products. What you build in that window is up to you.",
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: "power3.out" },
      });

      tl.from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.9,
      })
        .from(
          captionRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.5"
        )
        .from(
          paragraphRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.4"
        )
        .from(
          buttonRef.current,
          {
            y: 15,
            opacity: 0,
            duration: 0.6,
          },
          "-=0.3"
        );

      // subtle ambient glow pulse on the title
      gsap.to(titleGlowRef.current, {
        filter: "drop-shadow(0 2px 18px rgba(246,204,96,0.45))",
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // slow parallax drift on the mountain backdrop
      gsap.to(mountainRef.current, {
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="devhack"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#050403] py-18 text-white sm:py-26 lg:px-8"
    >
      {/* Parchment texture overlay */}
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

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(246,204,96,.07),transparent_65%)]" />

      {/* Mountain silhouette footer */}
      <div
        ref={mountainRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[280px] w-full opacity-30 sm:h-[340px]"
      >
        <Image
          src="/images/mountain.png"
          alt=""
          fill
          className="object-cover object-bottom select-none"
        />
      </div>

      <div className="relative z-10 mx-auto w-[90%]">
        <div className="relative mb-4 text-center sm:mb-6">
          <h2
            ref={titleRef}
            className="font-norse-bold mb-2 text-6xl font-extrabold tracking-[0.12em] uppercase md:text-8xl"
          >
            <span
              ref={titleGlowRef}
              className="bg-gradient-to-r from-[#F6CC60] via-[#FFF5D0] to-[#C9963E] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(246,204,96,0.3)]"
            >
              {devhackData.title}
            </span>
          </h2>

          <h3
            ref={captionRef}
            className="font-norse text-lg font-semibold tracking-[0.10em] text-[#C8A24C]/80 sm:tracking-[0.14em] md:text-2xl"
          >
            {devhackData.caption}
          </h3>
        </div>

        <div className="relative mx-auto flex flex-col items-center pt-4 sm:w-full sm:max-w-[80%] sm:pt-8">
          <div className="relative z-10 w-full text-center">
            <p
              ref={paragraphRef}
              className="font-lora text-md leading-relaxed tracking-[0.02em] break-words text-white sm:text-lg sm:leading-[1.75] sm:tracking-[0.03em]"
              style={{
                textShadow:
                  "0 1px 1px rgba(0,0,0,.7),0 0 12px rgba(246,204,96,.08)",
              }}
            >
              {devhackData.about}
            </p>
          </div>
        </div>

        <div
          ref={buttonRef}
          className="mt-10 flex w-full flex-col items-center gap-3 sm:mt-12"
        >
          <Button
            onClick={() => {
              window.open(
                "https://forms.gle/your-devhack-register-link",
                "_blank",
                "noopener,noreferrer"
              );
            }}
          >
            Register
          </Button>
        </div>
      </div>
    </section>
  );
}
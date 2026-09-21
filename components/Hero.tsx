"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const aboutContentRef = useRef<HTMLDivElement>(null);
  const wheelWrapperRef = useRef<HTMLDivElement>(null);
  const leftSoldierRef = useRef<HTMLDivElement>(null);
  const rightSoldierRef = useRef<HTMLDivElement>(null);
  const blackFogRef = useRef<HTMLDivElement>(null);

  const devhostData = {
    title: "About DevHost",
    caption: "Where Ancient Wisdom Meets Future Code",
    about:
      "Devhost, the flagship event is a remarkable tech convergence by Sahyadri Open Source Community (SOSC), is set to be an exhilarating experience with an exciting mix of technical and non-technical events. It seeks to equip participants with knowledge and skills, while encouraging curiosity and fostering innovation. With a variety of tech and non-tech battles and events featuring dev talks and workshops led by industry experts, it creates opportunities for both personal development and self-exploration. Join the 36-hour live hack event to bring your ideas to fruition, with challenges designed for every level of experience.",
  };

  useEffect(() => {
    if (
      !sectionRef.current ||
      !heroContentRef.current ||
      !aboutContentRef.current ||
      !leftSoldierRef.current ||
      !rightSoldierRef.current ||
      !bgRef.current ||
      !wheelWrapperRef.current ||
      !blackFogRef.current
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // =========================
      // MOBILE TIMELINE (< 640px)
      // =========================
      mm.add("(max-width: 639px)", () => {
        gsap.set(heroContentRef.current, {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
        });

        gsap.set(leftSoldierRef.current, {
          xPercent: 0,
          opacity: 1,
          scale: 1,
        });

        gsap.set(rightSoldierRef.current, {
          xPercent: 0,
          opacity: 1,
          scale: 1,
        });

        gsap.set(wheelWrapperRef.current, {
          xPercent: -50,
          yPercent: -58,
          scale: 1,
          opacity: 1,
        });

        gsap.set(bgRef.current, {
          scale: 1,
          opacity: 1,
        });

        gsap.set(blackFogRef.current, {
          opacity: 0,
        });

        gsap.set(aboutContentRef.current, {
          opacity: 0,
          scale: 0.85,
          y: 40,
          filter: "blur(12px)",
        });

        const mobileTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=180%",
            pin: true,
            scrub: 1,
          },
        });

        mobileTimeline
          // PHASE 1: Hero text zooms out, fog builds, soldiers slide completely off-screen
          .to(
            heroContentRef.current,
            {
              scale: 4.2,
              opacity: 0,
              filter: "blur(20px)",
              ease: "power2.in",
            },
            0,
          )
          .to(
            blackFogRef.current,
            {
              opacity: 0.35,
              ease: "power1.inOut",
            },
            0,
          )
          .to(
            bgRef.current,
            {
              scale: 1.18,
              opacity: 0.85,
              ease: "power1.out",
            },
            0,
          )
          .to(
            wheelWrapperRef.current,
            {
              scale: 1.15,
              opacity: 0.35,
              ease: "power1.out",
            },
            0,
          )
          .to(
            leftSoldierRef.current,
            {
              xPercent: -200,
              opacity: 0,
              ease: "power2.inOut",
            },
            0,
          )
          .to(
            rightSoldierRef.current,
            {
              xPercent: 200,
              opacity: 0,
              ease: "power2.inOut",
            },
            0,
          )

          // PHASE 2: About DevHost emerges with zero soldiers visible
          .to(
            aboutContentRef.current,
            {
              opacity: 1,
              scale: 1,
              y: 0,
              filter: "blur(0px)",
              ease: "power2.out",
            },
            0.35,
          )
          .to(
            aboutContentRef.current,
            {
              opacity: 1,
              scale: 1,
            },
            1.0,
          );
      });

      // ===================================
      // TABLET TIMELINE (640px to 1023px)
      // ===================================
      mm.add("(min-width: 640px) and (max-width: 1023px)", () => {
        gsap.set(heroContentRef.current, {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
        });

        gsap.set(leftSoldierRef.current, {
          xPercent: 0,
          opacity: 1,
          scale: 1,
        });

        gsap.set(rightSoldierRef.current, {
          xPercent: 0,
          opacity: 1,
          scale: 1,
        });

        gsap.set(wheelWrapperRef.current, {
          xPercent: -50,
          yPercent: -50,
          scale: 1,
          opacity: 1,
        });

        gsap.set(bgRef.current, {
          scale: 1,
          opacity: 1,
        });

        gsap.set(blackFogRef.current, {
          opacity: 0,
        });

        gsap.set(aboutContentRef.current, {
          opacity: 0,
          scale: 0.85,
          y: 40,
          filter: "blur(12px)",
        });

        const tabletTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=180%",
            pin: true,
            scrub: 1,
          },
        });

        tabletTimeline
          // PHASE 1: Hero text zooms out, fog builds, soldiers soften
          .to(
            heroContentRef.current,
            {
              scale: 4.2,
              opacity: 0,
              filter: "blur(20px)",
              ease: "power2.in",
            },
            0,
          )
          .to(
            blackFogRef.current,
            {
              opacity: 0.2,
              ease: "power1.inOut",
            },
            0,
          )
          .to(
            bgRef.current,
            {
              scale: 1.18,
              opacity: 1,
              ease: "power1.out",
            },
            0,
          )
          .to(
            wheelWrapperRef.current,
            {
              scale: 1.15,
              opacity: 0.35,
              ease: "power1.out",
            },
            0,
          )
          .to(
            leftSoldierRef.current,
            {
              opacity: 0.75,
              scale: 0.95,
              ease: "power1.out",
            },
            0,
          )
          .to(
            rightSoldierRef.current,
            {
              opacity: 0.75,
              scale: 0.95,
              ease: "power1.out",
            },
            0,
          )

          // PHASE 2: About DevHost emerges with soldiers stepping outward on tablet (-18% / 18%)
          .to(
            aboutContentRef.current,
            {
              opacity: 1,
              scale: 1,
              y: 0,
              filter: "blur(0px)",
              ease: "power2.out",
            },
            0.35,
          )
          .to(
            leftSoldierRef.current,
            {
              xPercent: -18,
              opacity: 0.7,
              ease: "power2.out",
            },
            0.35,
          )
          .to(
            rightSoldierRef.current,
            {
              xPercent: 18,
              opacity: 0.7,
              ease: "power2.out",
            },
            0.35,
          )
          .to(
            aboutContentRef.current,
            {
              opacity: 1,
              scale: 1,
            },
            1.0,
          );
      });

      // =========================
      // DESKTOP TIMELINE (>= 1024px)
      // =========================
      mm.add("(min-width: 1024px)", () => {
        gsap.set(heroContentRef.current, {
          scale: 1,
          opacity: 1,
          filter: "blur(0px)",
        });

        gsap.set(leftSoldierRef.current, {
          xPercent: 0,
          opacity: 1,
          scale: 1,
        });

        gsap.set(rightSoldierRef.current, {
          xPercent: 0,
          opacity: 1,
          scale: 1,
        });

        gsap.set(wheelWrapperRef.current, {
          xPercent: -50,
          yPercent: -50,
          scale: 1,
          opacity: 1,
        });

        gsap.set(bgRef.current, {
          scale: 1,
          opacity: 1,
        });

        gsap.set(blackFogRef.current, {
          opacity: 0,
        });

        gsap.set(aboutContentRef.current, {
          opacity: 0,
          scale: 0.85,
          y: 40,
          filter: "blur(12px)",
        });

        const desktopTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=180%",
            pin: true,
            scrub: 1,
          },
        });

        desktopTimeline
          // PHASE 1: Hero text zooms out, fog builds, soldiers adjust opacity
          .to(
            heroContentRef.current,
            {
              scale: 4.2,
              opacity: 0,
              filter: "blur(20px)",
              ease: "power2.in",
            },
            0,
          )
          .to(
            blackFogRef.current,
            {
              opacity: 0.2,
              ease: "power1.inOut",
            },
            0,
          )
          .to(
            bgRef.current,
            {
              scale: 1.18,
              opacity: 1,
              ease: "power1.out",
            },
            0,
          )
          .to(
            wheelWrapperRef.current,
            {
              scale: 1.15,
              opacity: 0.35,
              ease: "power1.out",
            },
            0,
          )
          .to(
            leftSoldierRef.current,
            {
              opacity: 0.85,
              scale: 0.95,
              ease: "power1.out",
            },
            0,
          )
          .to(
            rightSoldierRef.current,
            {
              opacity: 0.85,
              scale: 0.95,
              ease: "power1.out",
            },
            0,
          )

          // PHASE 2: About DevHost emerges with soldiers stepping slightly outward (-8% / 8%)
          .to(
            aboutContentRef.current,
            {
              opacity: 1,
              scale: 1,
              y: 0,
              filter: "blur(0px)",
              ease: "power2.out",
            },
            0.35,
          )
          .to(
            leftSoldierRef.current,
            {
              xPercent: -8,
              opacity: 0.95,
              ease: "power2.out",
            },
            0.35,
          )
          .to(
            rightSoldierRef.current,
            {
              xPercent: 8,
              opacity: 0.95,
              ease: "power2.out",
            },
            0.35,
          )
          .to(
            aboutContentRef.current,
            {
              opacity: 1,
              scale: 1,
            },
            1.0,
          );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#050403]"
    >
      {/* HERO BACKGROUND */}
      <div ref={bgRef} className="absolute inset-0 z-0 h-full w-full">
        {/* DESKTOP BACKGROUND */}
        <Image
          src="/images/herobackground.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hidden h-full w-full object-cover sm:block"
        />
        {/* MOBILE BACKGROUND */}
        <Image
          src="/mobile_hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="block h-full w-full object-cover sm:hidden"
        />
      </div>

      {/* FULL PITCH-BLACK FOG TRANSITION OVERLAY */}
      <div
        ref={blackFogRef}
        className="pointer-events-none absolute inset-0 z-10 h-full w-full bg-[#050403]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(5,4,3,0.55) 0%, rgba(5,4,3,0.92) 85%)",
        }}
      />

      {/* ROTATING RUNE WHEEL */}
      <div
        ref={wheelWrapperRef}
        className="pointer-events-none absolute top-1/2 left-1/2 z-[2] aspect-square w-[min(78vw,260px)] sm:w-[min(70vw,380px)] md:w-[min(65vw,480px)] lg:w-[min(85vw,620px)]"
      >
        <div className="h-full w-full animate-[spin_35s_linear_infinite]">
          <Image
            src="/hero-section-wheel.png"
            alt=""
            fill
            priority
            sizes="(max-width: 640px) 78vw, 620px"
            className="object-contain"
          />
        </div>
      </div>

      {/* LEFT SOLDIER */}
      <div
        ref={leftSoldierRef}
        className="pointer-events-none absolute bottom-0 left-[-4%] z-[12] w-[min(46vw,190px)] sm:left-0 sm:w-auto"
      >
        {/* DESKTOP SOLDIER LEFT */}
        <Image
          src="/soldier-left.png"
          alt=""
          width={500}
          height={600}
          priority
          className="hidden h-[min(80vh,540px)] w-auto object-contain object-bottom sm:block"
        />
        {/* MOBILE SOLDIER LEFT */}
        <Image
          src="/mobile_soldier_left.png"
          alt=""
          width={400}
          height={600}
          priority
          className="block h-80 w-full object-contain sm:hidden"
        />
      </div>

      {/* RIGHT SOLDIER */}
      <div
        ref={rightSoldierRef}
        className="pointer-events-none absolute right-[-8%] bottom-0 z-[12] w-[min(46vw,340px)] sm:right-0 sm:w-auto"
      >
        {/* DESKTOP SOLDIER RIGHT */}
        <Image
          src="/soldier-right.png"
          alt=""
          width={500}
          height={600}
          priority
          className="hidden h-[min(80vh,540px)] w-auto object-contain object-bottom sm:block"
        />
        {/* MOBILE SOLDIER RIGHT */}
        <Image
          src="/mobile_soldier_right.png"
          alt=""
          width={400}
          height={600}
          priority
          className="block h-80 w-full object-contain sm:hidden"
        />
      </div>

      {/* HERO CONTENT LAYER */}
      <div
        ref={heroContentRef}
        className="relative z-20 flex flex-col items-center justify-center px-4 text-center max-sm:-translate-y-10 sm:px-6"
      >
        {/* LOGOS ABOVE TITLE */}
        <div className="relative z-10 mb-2 flex items-center justify-center gap-2 sm:mb-3 sm:gap-3 md:mb-4 md:gap-4 lg:gap-5">
          <Image
            src="/sosc_logo.svg"
            alt="SOSC"
            width={70}
            height={70}
            priority
            className="h-auto w-10 sm:w-12 md:w-14 lg:w-16"
          />
          <Image
            src="/synergia_logo.svg"
            alt="Synergia"
            width={150}
            height={70}
            priority
            className="h-auto w-16 sm:w-20 md:w-24 lg:w-28"
          />
          <Image
            src="/sahyadri-logo.png"
            alt="Sahyadri"
            width={90}
            height={90}
            priority
            className="h-auto w-10 sm:w-12 md:w-14 lg:w-16"
          />
        </div>

        {/* DEVHOST TITLE */}
        <div className="relative z-10">
          <div
            className="absolute -inset-x-20 -inset-y-10 -z-10 blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.2) 65%, transparent 82%)",
            }}
          />
          <div
            className="absolute -inset-x-10 -inset-y-6 -z-10 scale-90 blur-xl"
            style={{
              background:
                "radial-gradient(ellipse, rgba(212,175,55,0.35) 0%, rgba(212,175,55,0.12) 45%, transparent 75%)",
            }}
          />
          <Image
            src="/DVHST.png"
            alt="DevHost"
            width={390}
            height={200}
            priority
            className="mb-4 h-34 w-auto sm:mb-5 sm:h-40 md:mb-6 md:h-44 lg:h-49"
          />
        </div>

        {/* TAGLINE */}
        <p className="font-norse-bold relative z-10 text-base tracking-wider text-white sm:text-lg sm:tracking-widest md:text-xl lg:text-2xl">
          Ideas that Echo Through Time
        </p>
      </div>

      {/* ABOUT DEVHOST CONTENT LAYER */}
      <div
        ref={aboutContentRef}
        id="about"
        className="pointer-events-auto absolute inset-0 z-30 flex flex-col items-center justify-center px-4 text-center sm:px-6"
      >
        <div className="mx-auto w-[90%] max-w-4xl text-center">
          {/* TITLE */}
          <div className="relative mb-4 text-center sm:mb-6">
            <h2 className="font-norse-bold mb-2 text-5xl font-extrabold tracking-[0.12em] uppercase sm:text-6xl md:text-7xl lg:text-8xl">
              <span className="bg-gradient-to-r from-[#F6CC60] via-[#FFF5D0] to-[#C9963E] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(246,204,96,0.3)]">
                {devhostData.title}
              </span>
            </h2>

            {/* CAPTION */}
            <h3 className="font-norse text-base font-semibold tracking-[0.10em] text-[#C8A24C]/80 sm:text-lg sm:tracking-[0.14em] md:text-xl lg:text-2xl">
              {devhostData.caption}
            </h3>
          </div>

          {/* DESCRIPTION */}
          <div className="relative mx-auto w-full text-justify sm:max-w-[85%] md:max-w-[80%]">
            <p
              className="font-lora text-justify text-sm leading-relaxed tracking-[0.02em] break-words text-white sm:text-base sm:leading-[1.75] sm:tracking-[0.03em] md:text-lg"
              style={{
                textShadow:
                  "0 1px 1px rgba(0,0,0,.7), 0 0 12px rgba(246,204,96,.08)",
              }}
            >
              {devhostData.about}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

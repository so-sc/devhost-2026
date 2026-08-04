"use client";
import { useRef, useState } from "react";
import HeroBackground from "./ui/HeroBackground";
import Sword from "./sword";
import DecryptText from "./animated/TextAnimation";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";

export default function Hero() {
  const targetRef = useRef(null);

  // Scope scroll tracking to this section only, not the whole page
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const swordY = useTransform(scrollYProgress, [0, 0.5], [0, -500]);
  const circleScale = useTransform(scrollYProgress, [0.3, 0.8], [0, 20]);
  const titleOpacity = useTransform(scrollYProgress, [0.7, 1], [0, 1]);

  // Fire the decrypt animation every time the title scrolls into view
  const [titleRevealed, setTitleRevealed] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setTitleRevealed(latest >= 0.85);
  });

  return (
    <div ref={targetRef} className="relative h-[200vh] w-full bg-black">
      {/* Sticky viewport — pins visuals in place while scroll drives the animation */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background */}
        <HeroBackground />

        {/* Sword */}
        <Sword y={swordY} />

        {/* Iris/vignette circle */}
        <motion.div
          style={{ scale: circleScale }}
          className="absolute top-1/2 left-1/2 z-30 h-[100px] w-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black"
        />

        {/* Title */}
        <motion.div
          style={{ opacity: titleOpacity }}
          className="absolute top-1/2 left-1/2 z-40 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-4 md:gap-10"
        >
          {/* Left ornament — mirrored */}
          <Image
            src="/ornament.svg"
            alt=""
            width={100}
            height={100}
            className="h-24 shrink-0 scale-x-[-1] opacity-80 md:h-40"
          />

          <div className="text-center">
            {/* Organizer logos — appears with the title, after circle transition */}
            <div className="mb-2 flex flex-col items-center gap-1">
              <p className="font-norse-bold text-[15px] tracking-[3px] text-white/80 sm:text-sm md:text-lg md:tracking-[6px]">
                Organizers
              </p>
              <div className="flex items-center justify-center gap-3 sm:gap-6">
                <div className="relative h-8 w-8 sm:h-10 sm:w-10">
                  <Image
                    src="/sahyadri-logo.png"
                    alt="Sahyadri College of Engineering & Management"
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 24px, 32px"
                  />
                </div>
                <div className="relative h-16 w-16 sm:h-18 sm:w-18">
                  <Image
                    src="/synergia_logo.svg"
                    alt="Synergia"
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 24px, 32px"
                  />
                </div>
                <div className="relative h-10 w-10 sm:h-12 sm:w-12">
                  <Image
                    src="/sosc_logo.svg"
                    alt="Sahyadri Open Source Community"
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 24px, 32px"
                  />
                </div>
              </div>
            </div>

            <h1 className="font-norse-bold text-6xl tracking-[6px] sm:text-7xl sm:tracking-[10px] md:text-[10rem] md:tracking-[20px]">
              <span className="bg-gradient-to-r from-[#F6CC60] via-[#FFF5D0] to-[#C9963E] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(246,204,96,0.3)]">
                <DecryptText
                  text="DEVHOST"
                  trigger={titleRevealed}
                  className="inline-block"
                  revealDelayMs={100}
                  trailSize={4}
                  startDelayMs={0}
                />
              </span>
            </h1>

            <h2 className="font-norse-bold pb-4 text-3xl tracking-[6px] text-white sm:pb-8 sm:text-3xl sm:tracking-[10px] md:text-5xl">
              <DecryptText
                text="2026"
                trigger={titleRevealed}
                className="inline-block"
                style={{
                  textShadow:
                    "0 1px 1px rgba(0,0,0,.7), 0 0 12px rgba(246,204,96,.08)",
                }}
                revealDelayMs={90}
                trailSize={3}
                startDelayMs={600}
              />
            </h2>

            <p className="font-norse-bold text-sm tracking-[6px] text-white sm:text-xl sm:tracking-[10px] md:text-2xl">
              <DecryptText
                text="Where mortal minds break the limits of divinity."
                trigger={titleRevealed}
                className="inline-block"
                revealDelayMs={40}
                trailSize={8}
                startDelayMs={1000}
              />
            </p>
          </div>

          {/* Right ornament */}
          <Image
            src="/ornament.svg"
            alt=""
            width={100}
            height={100}
            className="h-24 shrink-0 opacity-80 md:h-40"
          />
        </motion.div>
      </div>
    </div>
  );
}

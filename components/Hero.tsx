"use client";
import Image from "next/image";

function Pillar({ side }: { side: "left" | "right" }) {
  return (
    <div
      className={`pointer-events-none absolute top-0 z-0 h-full opacity-70 ${
        side === "left"
          ? "left-0 -translate-x-1/2 sm:translate-x-0"
          : "right-0 translate-x-1/2 sm:translate-x-0"
      } w-[150px] xs:w-[170px] sm:w-[190px] md:w-[240px]`}
    >
      <Image
        src="/pillar.png"
        alt=""
        fill
        className={`object-cover ${side === "right" ? "scale-x-[-1]" : ""}`}
        priority
      />
    </div>
  );
}

export default function Hero() {
  return (
    <div className="relative flex h-dvh w-full flex-col items-center justify-center overflow-hidden bg-black px-6">
      {/* Background overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg-greek.svg"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <Pillar side="left" />
      <Pillar side="right" />

      {/* Organizer logos */}
      <div className="relative z-10 flex items-center justify-center gap-4 sm:gap-6">
        <div className="relative h-9 w-9 sm:h-14 sm:w-14">
          <Image
            src="/sahyadri-logo.png"
            alt="Sahyadri College of Engineering & Management"
            fill
            className="object-contain"
            sizes="(max-width: 640px) 56px, 64px"
          />
        </div>
        <div className="relative h-14 w-14 sm:h-24 sm:w-24">
          <Image
            src="/synergia_logo.svg"
            alt="Synergia"
            fill
            className="object-contain"
            sizes="(max-width: 640px) 56px, 64px"
          />
        </div>
        <div className="relative h-10 w-10 sm:h-16 sm:w-16">
          <Image
            src="/sosc_logo.svg"
            alt="Sahyadri Open Source Community"
            fill
            className="object-contain"
            sizes="(max-width: 640px) 56px, 64px"
          />
        </div>
      </div>

      {/* Presents */}
      <p className="-translate-y-3 relative z-10 text-sm font-norse-bold tracking-[3px] text-white/70 sm:text-base">
        presents
      </p>

      {/* Main logo */}
      <div className="relative z-10 -translate-y-7 h-40 w-40 sm:h-60 sm:w-60 md:h-100 md:w-100">
        <Image
          src="/DVHST.png"
          alt="DevHost 2026"
          fill
          priority
          className="object-contain"
        />
      </div>

      {/* Tagline */}
      <p className="relative -translate-y-12 sm:-translate-y-20 md:-translate-y-28 text-center text-sm font-norse-bold tracking-[2px] text-white sm:text-base sm:tracking-[4px] md:text-lg">
        immortal minds build mortal ideas
      </p>
    </div>
  );
}
"use client";
import Image from "next/image";
import CloudLayer from "./CloudFlayer";



export default function Hero() {
  return (
    <div className="relative flex h-dvh w-full flex-col items-center justify-center gap-4 overflow-hidden bg-black px-6">
      {/* Background overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/greek_bg.svg"
          alt=""
          fill
          priority
          className="object-cover"
        />
        <CloudLayer />
      </div>

      {/* Organizer logos */}
      <div className="relative z-10 flex items-center justify-center gap-4 sm:gap-6">
        <div className="relative h-14 w-14 sm:h-16 sm:w-16">
          <Image
            src="/sahyadri-logo.png"
            alt="Sahyadri College of Engineering & Management"
            fill
            className="object-contain"
            sizes="(max-width: 640px) 56px, 64px"
          />
        </div>
        <div className="relative h-14 w-14 sm:h-16 sm:w-16">
          <Image
            src="/sosc_logo.svg"
            alt="Sahyadri Open Source Community"
            fill
            className="object-contain"
            sizes="(max-width: 640px) 56px, 64px"
          />
        </div>
        <div className="relative h-14 w-14 sm:h-16 sm:w-16">
          <Image
            src="/synergia_logo.svg"
            alt="Synergia"
            fill
            className="object-contain"
            sizes="(max-width: 640px) 56px, 64px"
          />
        </div>
      </div>

      {/* Presents */}
      <p className="font-norse-bold relative z-10 text-sm tracking-[6px] text-white/70 sm:text-base sm:tracking-[10px]">
        presents
      </p>

      {/* Main logo */}
      <div className="relative z-10 h-40 w-40 -translate-y-7 sm:h-60 sm:w-60 md:h-72 md:w-72">
        <Image
          src="/DVHST.svg"
          alt="DevHost 2026"
          fill
          priority
          className="object-contain"
        />
      </div>

      {/* Tagline */}
      <p className="font-norse-bold relative -translate-y-7 text-center text-sm tracking-[3px] text-white sm:text-base sm:tracking-[4px] md:text-lg">
        immortal minds build mortal ideas
      </p>
    </div>
  );
}
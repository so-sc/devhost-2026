"use client";

import Link from "next/link";
import { ClippedButton } from "./ClippedButton";

export default function SpeakersInfo() {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden bg-[#050403] py-20 text-white">
      {/* <div className="absolute top-5 left-5 z-10 h-10 w-10 border-t-2 border-l-2 border-[#F6CC60]/50" />
      <div className="absolute top-5 right-5 z-10 h-10 w-10 border-t-2 border-r-2 border-[#F6CC60]/50" />
      <div className="absolute bottom-5 left-5 z-10 h-10 w-10 border-b-2 border-l-2 border-[#F6CC60]/50" />
      <div className="absolute right-5 bottom-5 z-10 h-10 w-10 border-r-2 border-b-2 border-[#F6CC60]/50" /> */}

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

      <div className="relative z-10 mx-auto flex w-[80%] flex-col items-center">
        <h2 className="font-norse-bold mb-4 text-center text-6xl font-extrabold tracking-[0.12em] uppercase md:text-8xl">
          <span className="bg-gradient-to-r from-[#F6CC60] via-[#FFF5D0] to-[#C9963E] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(246,204,96,0.3)]">
            Meet Our Speakers
          </span>
        </h2>

        <p
          className="mb-10 max-w-2xl text-center text-base leading-relaxed tracking-[0.02em] text-white sm:text-lg sm:leading-[1.75] sm:tracking-[0.03em]"
          style={{
            textShadow:
              "0 1px 1px rgba(0,0,0,.7),0 0 12px rgba(246,204,96,.08)",
          }}
        >
          From startup founders to industry veterans, our speakers bring real
          experience from the front lines of tech. Hear their stories, learn
          from their journeys, and get a glimpse into where the industry is
          headed next.
        </p>

        <div className="flex justify-center">
          <Link href="/speakers">
            <span className="block">
              <ClippedButton className="font-orbitron px-8 py-4 text-lg font-bold tracking-wide">
                View Speakers
              </ClippedButton>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

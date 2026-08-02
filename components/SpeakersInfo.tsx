"use client";

import Image from "next/image";
import { Mic } from "lucide-react";

export default function SpeakersInfo() {
  return (
    <section
      id="speakers"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#050403] px-4 py-12 text-white sm:px-6 lg:px-8"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url('/images/parchment-texture.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.6,
          mixBlendMode: "soft-light",
          filter: "brightness(0.92) saturate(0.85)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(246,204,96,.07),transparent_65%)]" />

      <div className="relative z-10 mx-auto w-[80%] max-w-[700px] sm:w-full">
        <div className="relative mb-4 text-center sm:mb-6">
          <h2 className="font-dalek mb-2 text-2xl font-extrabold tracking-[0.12em] uppercase sm:text-3xl md:text-4xl lg:text-[2.4rem]">
            <span className="bg-gradient-to-r from-[#F6CC60] via-[#FFF5D0] to-[#C9963E] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(246,204,96,0.3)]">
              Call for Speakers
            </span>
          </h2>
          <h3 className="font-cinzel text-[11px] tracking-[0.10em] text-[#F6CC60]/90 uppercase sm:text-xs sm:tracking-[0.14em] md:text-sm">
            Grace the Mythic Stage of DevHost 2026
          </h3>
        </div>

        <div
          className="pointer-events-none absolute top-6 left-1/2 z-0 hidden -translate-x-1/2 lg:block"
          style={{ width: "clamp(180px, 24vw, 420px)" }}
        >
          <Image
            src="/images/speakers_ornament.jpg"
            alt=""
            width={600}
            height={600}
            className="h-auto w-full object-contain opacity-[0.08] mix-blend-screen select-none"
            style={{ objectPosition: "center top" }}
          />
        </div>
        <div
          className="pointer-events-none absolute top-4 left-1/2 z-0 block -translate-x-1/2 lg:hidden"
          style={{ width: "clamp(110px, 38vw, 180px)" }}
        >
          <Image
            src="/images/speakers_ornament.jpg"
            alt=""
            width={600}
            height={600}
            className="h-auto w-full object-contain opacity-[0.03] mix-blend-screen select-none"
            style={{ objectPosition: "center top" }}
          />
        </div>

        <div className="relative mx-auto mt-2 flex w-[80%] max-w-[620px] flex-col items-center sm:w-full">
          <div className="relative z-10 w-full text-center">
            <p
              className="font-cinzel text-xs leading-relaxed tracking-[0.02em] break-words text-[#E6C46D] sm:text-sm sm:leading-[1.75] sm:tracking-[0.03em] md:text-[15px]"
              style={{
                textShadow:
                  "0 1px 1px rgba(0,0,0,.7),0 0 12px rgba(246,204,96,.08)",
              }}
            >
              Share your knowledge, research, and technical vision with
              passionate developers, students, and industry leaders. Whether you
              specialize in AI &amp; Machine Learning, Open Source
              Infrastructure, Cloud &amp; Web3, or Software Architecture — take
              the stage and inspire 1000+ passionate developers at DevHost 2026.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-center sm:mt-8">
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="group font-dalek inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#FCE98A] via-[#F6CC60] to-[#C9963E] px-7 py-3 text-xs font-bold tracking-[0.14em] text-black uppercase shadow-[0_20px_45px_rgba(246,204,96,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_56px_rgba(246,204,96,0.32)] hover:brightness-110 focus:ring-2 focus:ring-[#F6CC60]/60 focus:outline-none active:scale-[0.98] sm:px-8 sm:py-3.5 sm:text-sm"
          >
            <Mic
              size={18}
              className="text-black transition-transform duration-300 group-hover:-translate-y-0.5"
            />
            <span>Apply as a Speaker</span>
          </a>
        </div>
      </div>
    </section>
  );
}

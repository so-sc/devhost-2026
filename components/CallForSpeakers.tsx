"use client";

import Image from "next/image";
import { Mic } from "lucide-react";

export default function SpeakersInfo() {
  return (
    <section
      id="speakers"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#050403] py-12 text-white lg:px-8"
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

        <div className="relative mx-auto flex flex-col items-center pt-4 sm:w-full sm:max-w-[80%] sm:pt-8">
          <div className="relative z-10 w-full text-justify">
            <p
              className="font-trajan text-md leading-relaxed tracking-[0.02em] break-words text-white sm:text-lg sm:leading-[1.75] sm:tracking-[0.03em]"
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

        <div className="mt-6 flex w-full flex-col items-center gap-3 sm:mt-8">
          <a
            href="/brochure/devhost_2025.pdf"
            download
            className="group font-dalek inline-flex items-center justify-center gap-2.5 rounded-sm border border-[#C9963E] bg-gradient-to-b from-[#1C1A17] via-[#121212] to-[#080808] px-6 py-3 text-xs font-bold tracking-[0.12em] text-[#F6CC60] uppercase shadow-[0_0_16px_rgba(246,204,96,0.08),inset_0_0_0_1px_rgba(246,204,96,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[#F6CC60] hover:text-[#FFF3C1] hover:shadow-[0_0_24px_rgba(246,204,96,0.25)] active:scale-[0.98] sm:px-8 sm:py-3 sm:text-sm sm:tracking-[0.14em]"
          >
            {" "}
            <Mic
              size={18}
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />
            <span>Apply as a Speaker</span>
          </a>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Button from "./Button";

const titleSponsor = {
  src: "/sponsors/title-sponsor.png",
  alt: "Title Sponsor",
  href: "mailto:sosc@sahyadri.edu.in",
};

const coSponsors = [
  {
    src: "/sponsors/co-sponsor.png",
    alt: "Co-Sponsor",
    href: "mailto:sosc@sahyadri.edu.in",
  },
  {
    src: "/sponsors/co-sponsor.png",
    alt: "Co-Sponsor",
    href: "mailto:sosc@sahyadri.edu.in",
  },
];

function SponsorCard({
  sponsor,
  isTitle = false,
}: {
  sponsor: {
    src: string;
    alt: string;
    href: string;
  };
  isTitle?: boolean;
}) {
  return (
    <a
      href={sponsor.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative ${
        isTitle ? "w-[280px] sm:w-[340px]" : "w-[230px] sm:w-[260px]"
      }`}
    >
      {/* Outer glow */}
      <div className="absolute -inset-3 rounded-md bg-[#C9963E]/10 opacity-0 blur-xl transition duration-700 group-hover:opacity-100" />

      {/* Gold frame */}
      <div className="relative rounded-md border border-[#C9963E]/60 p-[2px] shadow-[0_0_20px_rgba(201,150,62,0.08)] transition-all duration-500 group-hover:border-[#F6CC60] group-hover:shadow-[0_0_30px_rgba(246,204,96,0.18)]">
        {/* Marble plaque */}
        <div
          className={`relative flex ${
            isTitle ? "h-[150px] sm:h-[165px]" : "h-[125px] sm:h-[140px]"
          } w-full items-center justify-center overflow-hidden rounded-[3px] border border-[#C9963E]/20 bg-[#11100e]`}
        >
          {/* Marble base */}
          <div
            className="absolute inset-0 opacity-80"
            style={{
              backgroundImage: `
                radial-gradient(
                  ellipse at 20% 20%,
                  rgba(255,255,255,0.07) 0%,
                  transparent 35%
                ),
                radial-gradient(
                  ellipse at 80% 70%,
                  rgba(201,150,62,0.06) 0%,
                  transparent 40%
                ),
                linear-gradient(
                  135deg,
                  #181715 0%,
                  #0b0a09 35%,
                  #171614 55%,
                  #090807 100%
                )
              `,
            }}
          />

          {/* Marble veins */}
          <div
            className="pointer-events-none absolute inset-[-30%] opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(
                  125deg,
                  transparent 25%,
                  rgba(255,255,255,0.12) 26%,
                  transparent 27%,
                  transparent 48%,
                  rgba(255,255,255,0.08) 49%,
                  transparent 50%,
                  transparent 72%,
                  rgba(201,150,62,0.08) 73%,
                  transparent 74%
                )
              `,
              transform: "rotate(-8deg) scale(1.3)",
            }}
          />

          {/* Center highlight */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.07),transparent_60%)]" />

          {/* Sponsor logo */}
          {/* <div className="relative z-10 h-[115px] w-[230px] sm:h-[130px] sm:w-[270px]"> 
          <Image 
          src={titleSponsor.src} 
          alt={titleSponsor.alt} 
          fill sizes="270px" 
          className="object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)] transition-transform duration-500 group-hover:scale-[1.03]" /> 
          */}
          <div className="relative z-10 h-full w-full">
            <Image
              src={sponsor.src}
              alt={sponsor.alt}
              fill
              className="drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)] transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>

          {/* Shine */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
      </div>
    </a>
  );
}

export default function SponsorsLogo() {
  return (
    <section
      id="sponsors"
      className="relative flex w-full items-center justify-center overflow-hidden bg-[#050403] py-18 pb-24 text-white sm:py-24 sm:pb-32 lg:px-8"
    >
      {/* Section background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url('/images/parchment-sponsor.jpg')",
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          opacity: 0.6,
          mixBlendMode: "soft-light",
        }}
      />

      {/* Dark overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(246,204,96,.07),transparent_65%)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6">
        {/* Small ornament */}
        <div className="mb-2 opacity-70">
          <div className="relative h-14 w-14">
            <Image
              src="/images/sponsor-ornament.png"
              alt=""
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="relative mb-4 text-center sm:mb-6">
          <h2 className="font-norse-bold mb-2 text-6xl font-extrabold tracking-[0.12em] uppercase md:text-8xl">
            <span className="bg-gradient-to-r from-[#F6CC60] via-[#FFF5D0] to-[#C9963E] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(246,204,96,0.3)]">
              sponsors
            </span>
          </h2>

          <h3 className="font-norse text-lg font-semibold tracking-[0.10em] text-[#C8A24C]/80 sm:tracking-[0.14em] md:text-2xl">
            powering devhost 2026
          </h3>
        </div>
        {/* Sponsor */}
        <div className="mt-12 grid w-full grid-cols-1 items-center justify-items-center gap-10 md:grid-cols-3 md:gap-6 lg:gap-10">
          {/* Co-Sponsor 1 */}
          <SponsorCard sponsor={coSponsors[0]} />

          {/* Title Sponsor */}
          <SponsorCard sponsor={titleSponsor} isTitle />

          {/* Co-Sponsor 2 */}
          <SponsorCard sponsor={coSponsors[1]} />
        </div>{" "}
        <div className="mt-20 flex w-full flex-col items-center gap-3 sm:mt-18">
          <Button
            onClick={() => {
              window.location.href = "mailto:sosc@sahyadri.edu.in";
            }}
          >
            Sponsor DevHost
          </Button>
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Button from "./Button";
import OtherSponsors from "./OtherSponsors";

const titleSponsor = {
  src: "/sponsors/titlesponsor.png",
  alt: "Title Sponsor",
  href: "mailto:sosc@sahyadri.edu.in",
};

const coSponsors = [
  {
    src: "/sponsors/cosponsor.png",
    alt: "Co-Sponsor",
    href: "mailto:sosc@sahyadri.edu.in",
  },
  {
    src: "/sponsors/cosponsor.png",
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
      className={`group relative block w-full ${
        isTitle
          ? "max-w-[360px] sm:max-w-[400px]"
          : "max-w-[300px] sm:max-w-[330px]"
      }`}
    >
      {/* Glow behind the plaque */}
      <div className="absolute -inset-4 rounded-full bg-[#C9963E]/10 opacity-0 blur-2xl transition-all duration-700 group-hover:opacity-100" />

      {/* Plaque */}
      <div
        className={`relative aspect-[2.1/1] w-full scale-120 overflow-hidden`}
      >
        {/* Sponsor plaque image */}
        <Image
          src={sponsor.src}
          alt={sponsor.alt}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-[1.025]"
          priority={isTitle}
        />

        {/* Center text */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center">
          <span
            className={`font-norse-bold text-2xl font-semibold tracking-[0.10em] sm:tracking-[0.14em] ${
              isTitle ? "text-[#C8A24C]" : "text-[#3b2414]"
            }`}
          >
            {isTitle ? "TITLE SPONSOR" : "CO-SPONSOR"}
          </span>
        </div>

        {/* Very subtle hover shine */}
        <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
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
        <div className="mt-12 grid w-full grid-cols-1 items-center justify-items-center gap-18 md:grid-cols-3 md:gap-6 lg:gap-10">
          {/* Co-Sponsor 1 */}
          <SponsorCard sponsor={coSponsors[0]} />

          {/* Title Sponsor */}
          <SponsorCard sponsor={titleSponsor} isTitle />

          {/* Co-Sponsor 2 */}
          <SponsorCard sponsor={coSponsors[1]} />
        </div>
        <OtherSponsors />
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
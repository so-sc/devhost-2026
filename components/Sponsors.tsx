"use client";

import Image from "next/image";
import OtherSponsors from "./OtherSponsors";

const titleSponsor = {
  src: "/sponsors/titlesponsor.png",
  logo: "/sponsors/eg-logo.png",
  dimensions: "h-18 w-42 sm:h-24 sm:w-50",
  url: "https://egsoftware.com/global",
  desc: "Title Sponsor",
  alt: "Title Sponsor",
};

const coSponsors = {
  src: "/sponsors/cosponsor.png",
  logo: "/sponsors/acic-logo.png",
  dimensions: "h-10 w-32 sm:h-12 sm:w-40",
  url: "https://www.acicsahyadri.com/",
  desc: "Incubation partner",
  alt: "Co-Sponsor",
};

function SponsorCard({
  sponsor,
  isTitle = false,
}: {
  sponsor: {
    src: string;
    alt: string;
    logo: string;
    desc: string;
    url: string;
    dimensions?: string;
  };
  isTitle?: boolean;
}) {
  return (
    <div
      className="group relative block w-full max-w-[360px] sm:max-w-[400px]"
      //   ${
      //   isTitle
      //     ? "max-w-[360px] sm:max-w-[400px]"
      //     : "max-w-[300px] sm:max-w-[330px]"
      // }
    >
      {/* Glow behind the plaque */}
      <div className="absolute -inset-4 rounded-full bg-[#C9963E]/10 opacity-0 blur-2xl transition-all duration-700 group-hover:opacity-100" />

      {/* Plaque */}

{/* Plaque */}
<a
  href={sponsor.url}
  target="_blank"
  rel="noopener noreferrer"
  aria-label={`Visit ${sponsor.alt} website`}
  className="group/plaque relative block aspect-[2.1/1] w-full scale-120 overflow-hidden"
>
  {/* Sponsor plaque image */}
  <Image
    src={sponsor.src}
    alt={sponsor.alt}
    fill
    className="object-contain transition-transform duration-500 group-hover/plaque:scale-[1.025]"
    priority={isTitle}
  />

  {/* Center content */}
  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 px-4 text-center">
    {/* Sponsor logo */}
    <div className={`relative ${sponsor.dimensions}`}>
      <Image
        src={sponsor.logo}
        alt={`${sponsor.alt} logo`}
        fill
        className="mt-1 object-contain"
      />
    </div>

    {/* Sponsor description */}
    {sponsor.desc && (
      <span
        className={`font-norse-bold -mt-1 text-sm font-semibold tracking-[0.08em] sm:text-base ${
          isTitle ? "text-[#C8A24C]" : "text-[#3b2414]"
        }`}
      >
        {sponsor.desc}
      </span>
    )}
  </div>

  {/* Hover shine */}
  <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden opacity-0 transition-opacity duration-700 group-hover/plaque:opacity-100">
    <div className="absolute inset-y-0 left-1/2 w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#c8a24c]/20 to-transparent blur-md" />
  </div>
</a>
    </div>
  );
}

export default function SponsorsLogo() {
  return (
    <section
      id="sponsors"
      className="relative flex w-full items-center justify-center overflow-hidden bg-[#050403] py-18 pb-24 text-white sm:py-30 sm:pb-32 lg:px-8"
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

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-4 sm:px-6">
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
        <div className="mt-12 grid w-full grid-cols-1 items-center justify-items-center gap-18">
          {/* Title Sponsor */}
          <SponsorCard sponsor={titleSponsor} isTitle />

          {/* Co-Sponsor 1 */}
          <SponsorCard sponsor={coSponsors} />
        </div>
        <OtherSponsors />
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";

const otherSponsors = [
  {
    logo: "/sponsors/codechef.png",
    name: "CodeChef",
    title: "CP PARTNER",
    description: [
      "Annual subscription of CodeChef Pro for Top 3 in CP.",
      "50% discount on CodeChef Pro for all DevHost participants.",
    ],
  },
  {
    logo: "/sponsors/n8n-logo.png",
    name: "n8n",
    title: "TECHNOLOGY PARTNER",
    description: [
      "n8n Cloud Pro license for top 30 hackathon teams.",
      "Full access during the hackathon duration.",
    ],
  },
  {
    logo: "/sponsors/render-logo.png",
    name: "Render",
    title: "TECHNOLOGY PARTNER",
    description: [
      "$50 Render credit for attendees of DevHost 2026.",
      "$500 / $300 / $100 credit for Top 3 winning teams.",
    ],
  },
  {
    logo: "/sponsors/xyz-logo.png",
    name: ".xyz",
    title: "TECHNOLOGY PARTNER",
    description: [
      "Free individual .xyz domain for the first year.",
      "Available for all hackathon participants.",
    ],
  },
  {
    logo: "/sponsors/codecrafters-logo.png",
    name: "CodeCrafters",
    title: "TECHNOLOGY PARTNER",
    description: [
      "1st: 2-year VIP membership.",
      "2nd: 1-year VIP membership.",
      "3rd: 6-month VIP membership for winning teams.",
    ],
  },
  {
    logo: "/sponsors/sarvam-logo.png",
    name: "Sarvam AI",
    title: "TECHNOLOGY PARTNER",
    description: ["500 AI credits for every hackathon participating team."],
  },
  {
    logo: "/sponsors/acic-logo.png",
    name: "ACIC Sahyadri",
    title: "INCUBATION PARTNER",
    description: [
      "Top 5-10 hackathon teams receive pre-incubation support.",
      "Applicable for interested founder teams.",
    ],
  },
  {
    logo: "/sponsors/unstop-logo.png",
    name: "Unstop",
    title: "PLATFORM PARTNER",
    description: ["Official registration platform for DevHost 2026."],
  },
];

function OtherSponsorCard({
  sponsor,
}: {
  sponsor: (typeof otherSponsors)[number];
}) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    // Touch interaction toggle for phones/tablets
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches
    ) {
      setIsActive((prev) => !prev);
    }
  };

  return (
    <div
      className="group relative flex w-full cursor-pointer items-center justify-center transition-transform duration-300 hover:scale-105"
      onClick={handleClick}
    >
      {/* STONE BRICK CONTAINER */}
      <div className="relative aspect-[1.35/1] w-full overflow-hidden drop-shadow-[0_10px_25px_rgba(0,0,0,0.95)]">
        {/* SPONSOR BRICK IMAGE */}
        <Image
          src="/sponsor_brick.png"
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-contain"
          priority
        />

        {/* BRICK CONTENT AREA (Perfectly centered inside stone brick boundaries) */}
        <div className="absolute inset-[8%] z-10 flex flex-col items-center justify-center p-3 text-center sm:inset-[10%]">
          {/* FRONT STATE: LOGO + NAME + TITLE */}
          <div
            className={`flex h-full w-full flex-col items-center justify-center text-center transition-all duration-500 ease-out ${
              isActive
                ? "pointer-events-none -translate-y-3 opacity-0"
                : "translate-y-0 opacity-100"
            } [@media(hover:hover)]:group-hover:pointer-events-none [@media(hover:hover)]:group-hover:-translate-y-3 [@media(hover:hover)]:group-hover:opacity-0`}
          >
            {/* Logo */}
            <div className="flex h-14 w-full items-center justify-center sm:h-16">
              <div className="relative h-10 w-full max-w-[130px] sm:h-12">
                <Image
                  src={sponsor.logo}
                  alt={sponsor.name}
                  fill
                  sizes="130px"
                  className="object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)] filter"
                />
              </div>
            </div>

            {/* Sponsor Name */}
            <h4 className="font-norse mt-1 w-full text-center text-lg font-bold tracking-[0.12em] text-[#E0B957] uppercase drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)] sm:text-xl">
              {sponsor.name}
            </h4>

            {/* Title */}
            <p className="font-lora mt-0.5 w-full text-center text-[9px] tracking-[0.18em] text-[#C8A24C] uppercase sm:text-[11px]">
              [{sponsor.title}]
            </p>
          </div>

          {/* BACK / HOVER STATE: PERKS LIST (PERFECTLY CENTERED) */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center px-3 py-2 text-center transition-all duration-500 ease-out ${
              isActive
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-3 opacity-0"
            } [@media(hover:hover)]:group-hover:pointer-events-auto [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100`}
          >
            <ul className="font-lora flex flex-col items-center justify-center space-y-1.5 text-center text-[11px] leading-snug text-[#F1E8D5] sm:text-xs">
              {sponsor.description.map((perk, i) => (
                <li key={i} className="w-full text-center">
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OtherSponsors() {
  return (
    <div className="mt-16 w-full sm:mt-20">
      {/* Section Header */}
      <div className="mb-10 text-center sm:mb-12">
        <h3 className="font-norse-bold text-3xl font-bold tracking-[0.14em] text-[#C8A24C] uppercase sm:text-4xl">
          Other Sponsors
        </h3>
      </div>

      {/* SPONSOR BRICKS GRID (CENTERED ON ALL ROWS, 4 PER ROW ON DESKTOP) */}
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-center gap-4 sm:gap-5 md:gap-6">
        {otherSponsors.map((sponsor) => (
          <div
            key={sponsor.name}
            className="flex w-[250px] shrink-0 justify-center sm:w-[260px] md:w-[265px]"
          >
            <OtherSponsorCard sponsor={sponsor} />
          </div>
        ))}
      </div>
    </div>
  );
}

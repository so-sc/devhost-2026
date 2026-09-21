"use client";

import { useState } from "react";
import Image from "next/image";

const otherSponsors = [
  {
    logo: "/sponsors/codechef.png",
    name: "CodeChef",
    title: "CP PARTNER",
    description: [
      "Annual subscription of CodeChef Pro for the Top 3 in CP.",
      "50% discount on CodeChef Pro for all Devhost participants.",
    ],
    width: "w-[170px]",
  },
  {
    logo: "/sponsors/n8n-logo.png",
    name: "n8n",
    title: "TECHNOLOGY PARTNER",
    description: [
      "n8n Cloud Pro license for all hackathon participants.",
      "Full access during the hackthon",
    ],
    width: "w-[130px]",
  },
  {
    logo: "/sponsors/render-logo.png",
    name: "Render",
    title: "TECHNOLOGY PARTNER",
    description: [
      "$50 Render credit for attendees of Devhost 2026.",
      "$500/$300/$100 credit for the Top 3 Hackathon winning teams.inners must use Render Workflows to be eligible.",
    ],
    width: "w-[140px]",
  },
  {
    logo: "/sponsors/xyz-logo.png",
    name: ".xyz",
    title: "TECHNOLOGY PARTNER",
    description: [
      "Individual .xyz domain free for the first year.",
      "Available for all hackathon participants.",
    ],
    width: "w-[100px]",
  },
  {
    logo: "/sponsors/codecrafters-logo.png",
    name: "CodeCrafters",
    title: "TECHNOLOGY PARTNER",
    description: [
      "1st: 2-year VIP membership.",
      "2nd: 1-year VIP membership.",
      "3rd: 6-month VIP membership.",
      "Applicable for hackathon winning teams.",
    ],
    width: "w-[150px]",
  },
  {
    logo: "/sponsors/sarvam-logo.png",
    name: "Sarvam AI",
    title: "TECHNOLOGY PARTNER",
    description: ["500 credits for every hackathon participating team."],
    width: "w-[150px]",
  },
  {
    logo: "/sponsors/acic-logo.png",
    name: "ACIC Sahyadri",
    title: "INCUBATIONN PARTNER",
    description: [
      "Top 5/10 teams of the hackathon will get pre incubation support.",
      "Applicable only if the teams are interested.",
    ],
    width: "w-[100px]",
  },
];

function SponsorInfo({
  sponsor,
  isActive,
}: {
  sponsor: (typeof otherSponsors)[number];
  isActive: boolean;
}) {
  return (
    <div className="relative h-full w-full">
      <div
        className={`/* Mobile click state */ absolute inset-0 flex flex-col items-center justify-center px-6 text-center transition-all duration-500 ease-out ${
          isActive ? "translate-y-3 opacity-0" : "translate-y-0 opacity-100"
        } /* Desktop hover state */ [@media(hover:hover)]:group-hover:-translate-y-3 [@media(hover:hover)]:group-hover:opacity-0`}
      >
        {/* Logo */}
        <div className="flex h-[95px] w-full items-center justify-center">
          <div className={`relative h-[75px] ${sponsor.width} max-w-full`}>
            <Image
              src={sponsor.logo}
              alt={sponsor.name}
              fill
              sizes="170px"
              className="object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
            />
          </div>
        </div>

        {/* Sponsor name */}
        <h4 className="font-norse text-2xl font-semibold tracking-[0.12em] text-[#E0B957] uppercase drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)]">
          {sponsor.name}
        </h4>

        {/* Sponsor title */}
        <p className="font-lora mt-1 text-[9px] tracking-[0.20em] text-[#B4873A] uppercase sm:text-xs">
          [{sponsor.title}]
        </p>
      </div>
      <div
        className={`/* Mobile click state */ absolute inset-0 flex flex-col items-center justify-center px-7 py-8 text-center transition-all duration-500 ease-out ${
          isActive ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
        } /* Desktop hover state */ [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100`}
      >
        {/* Description */}
        <ul className="font-lora w-full list-disc space-y-2 px-1 text-left text-sm leading-relaxed text-[#F1E8D5]">
          {sponsor.description.map((item, i) => (
            <li key={i} className="pl-1 marker:text-[#C9963E]">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function OtherSponsorCard({
  sponsor,
  index,
}: {
  sponsor: (typeof otherSponsors)[number];
  index: number;
}) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    // Click interaction ONLY on phones / touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsActive((prev) => !prev);
    }
  };

  return (
    <div
      className="group relative w-full cursor-pointer sm:w-[calc(50%-1rem)] md:w-[calc((100%-4rem)/3)] lg:w-[calc((100%-6rem)/4)]"
      onClick={handleClick}
    >
      {/* Outer glow */}
      <div
        className={`absolute -inset-3 rounded-lg bg-[#C9963E]/10 opacity-0 blur-2xl transition-all duration-700 [@media(hover:hover)]:group-hover:opacity-100 ${isActive ? "opacity-100" : ""} `}
      />

      {/* CARD */}
      <div className="relative h-[280px] w-full p-[6px]">
        {/* Gold borders */}
        <div className="pointer-events-none absolute inset-0 z-30 border border-[#C9963E]/80" />

        <div className="pointer-events-none absolute inset-[4px] z-30 border border-[#8F6728]/70" />

        {/* Stone card */}
        <div className="relative h-full overflow-hidden rounded-[2px]">
          {/* Stone texture */}
          <Image
            src={`/sponsors/stone-texture-${(index % 4) + 1}.png`}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover opacity-50"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-[#0b0704]/45" />

          {/* Gold atmospheric glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,150,62,0.10),transparent_65%)]" />

          {/* Content */}
          <div className="relative z-20 h-full w-full">
            <SponsorInfo sponsor={sponsor} isActive={isActive} />
          </div>

          {/* Vignette */}
          <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.45)_100%)]" />

          {/* Hover shine */}
          <div
            className={`pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent opacity-0 transition-opacity duration-700 [@media(hover:hover)]:group-hover:opacity-100 ${isActive ? "opacity-100" : ""} `}
          />
        </div>
      </div>
    </div>
  );
}

export default function OtherSponsors() {
  return (
    <div className="mt-20 w-full">
      {/* Section label */}
      <h3 className="font-norse-bold mb-10 text-center text-2xl font-semibold tracking-[0.10em] text-[#C8A24C]/80 sm:mb-12 sm:text-3xl">
        other sponsors
      </h3>

      {/* SPONSOR GRID */}
      <div className="flex w-full flex-wrap justify-center gap-8 md:gap-6">
        {otherSponsors.map((sponsor, index) => (
          <OtherSponsorCard
            key={sponsor.name}
            sponsor={sponsor}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

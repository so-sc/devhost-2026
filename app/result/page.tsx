"use client";

import React from "react";
import Image from "next/image";
import shortlistedTeams from "@/data/shortlistedTeams.json";

export interface ShortlistedTeam {
  team_name: string;
  college: string;
}

export default function ResultPage() {
  return (
    <main className="min-h-screen w-full bg-[#050403] text-white px-4 py-12 md:py-20 flex flex-col items-center">
      <div className="relative z-10 text-center flex flex-col items-center">

        {/* Heading */}
        <h1 className="font-norse-bold text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-[0.12em] uppercase">
          <span className="bg-gradient-to-r from-[#F6CC60] via-[#FFF5D0] to-[#C9963E] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(246,204,96,0.3)]">
            Selected Teams
          </span>
        </h1>

        {/* Subheading */}
        <h2 className="font-norse mt-3 text-base font-semibold tracking-[0.08em] text-[#C8A24C]/80 sm:mt-4 sm:text-lg sm:tracking-[0.12em] md:text-2xl">
          Your summons has arrived! 30 teams entered the ultimate trial.
        </h2>
      </div>

      {/* 30 Results Banners stacked one after the other */}
      <div className="mt-8 sm:mt-12 w-full max-w-xl sm:max-w-2xl md:max-w-3xl flex flex-col items-center gap-2 sm:gap-3 ">
        {shortlistedTeams.map((team: ShortlistedTeam, index: number) => {
          const rank = index + 1;
          return (
            <div
              key={rank}
              className="relative w-[85%] sm:w-[90%] md:w-full flex items-center justify-center transition-transform duration-300 hover:scale-[1.01]"
            >
              {/* Parchment Banner */}
              <Image
                src="/resultsBanner.png"
                alt={`Result Banner ${rank}`}
                width={2172}
                height={277}
                priority={index < 4}
                className="h-auto w-full object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
              />

              {/* Number on the left side edge */}
              <div className="absolute left-[7%] sm:left-[5%] md:left-[6%] top-1/2 -translate-y-1/2 select-none pointer-events-none flex items-center justify-center">
                <span className="font-norse-bold text-base sm:text-2xl md:text-3xl text-[#130801] tracking-wider drop-shadow-[0_1px_1px_rgba(255,245,210,0.4)]">
                  {rank}
                </span>
              </div>

              {/* Team Name and College Name on the right side */}
              <div className="absolute left-[13%] sm:left-[15%] md:left-[16%] right-[5%] sm:right-[7%] top-1/2 -translate-y-1/2 flex flex-col justify-center pointer-events-none select-none text-left overflow-hidden">
                <h3 className="font-lora font-bold text-[11px] sm:text-base md:text-lg lg:text-xl text-[#100802] leading-tight truncate">
                  {team.team_name}
                </h3>
                <p className="font-lora font-medium text-[8px] sm:text-xs md:text-sm text-[#100802] leading-tight truncate mt-0.5 sm:mt-1">
                  {team.college}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}

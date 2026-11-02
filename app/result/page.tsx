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
    <main className="flex min-h-screen w-full flex-col items-center bg-[#050403] px-4 py-12 text-white md:py-20">
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Heading */}
        <h1 className="font-norse-bold text-5xl font-extrabold tracking-[0.12em] uppercase sm:text-6xl md:text-8xl">
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
      <div className="mt-8 flex w-full max-w-xl flex-col items-center gap-2 sm:mt-12 sm:max-w-2xl sm:gap-3 md:max-w-3xl">
        {shortlistedTeams.map((team: ShortlistedTeam, index: number) => {
          const rank = index + 1;
          return (
            <div
              key={rank}
              className="relative flex w-[85%] items-center justify-center transition-transform duration-300 hover:scale-[1.01] sm:w-[90%] md:w-full"
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
              <div className="pointer-events-none absolute top-1/2 left-[7%] flex -translate-y-1/2 items-center justify-center select-none sm:left-[5%] md:left-[6%]">
                <span className="font-norse-bold text-base tracking-wider text-[#130801] drop-shadow-[0_1px_1px_rgba(255,245,210,0.4)] sm:text-2xl md:text-3xl">
                  {rank}
                </span>
              </div>

              {/* Team Name and College Name on the right side */}
              <div className="pointer-events-none absolute top-1/2 right-[5%] left-[13%] flex -translate-y-1/2 flex-col justify-center overflow-hidden text-left select-none sm:right-[7%] sm:left-[15%] md:left-[16%]">
                <h3 className="font-lora truncate text-[11px] leading-tight font-bold text-[#100802] sm:text-base md:text-lg lg:text-xl">
                  {team.team_name}
                </h3>
                <p className="font-lora mt-0.5 truncate text-[8px] leading-tight font-medium text-[#100802] sm:mt-1 sm:text-xs md:text-sm">
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

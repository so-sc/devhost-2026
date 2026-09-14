"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import Button from "./Button";

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
        className={`relative aspect-[2.1/1] w-full overflow-hidden scale-120`}
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
            className={`font-norse-bold font-semibold tracking-[0.10em] sm:tracking-[0.14em] text-2xl ${
              isTitle
                ? "text-[#C8A24C]"
                : "text-[#3b2414]"
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

const otherSponsors = [
  {
    logo: "/sponsors/codechef.png",
    name: "CodeChef",
    title: "CP PARTNER",
    description: [
      "Annual subscriptions for the coding competition Top 3.",
      "50% discount for all participants.",
    ],
    width: "w-[170px]",
  },
  {
    logo: "/sponsors/n8n-logo.png",
    name: "n8n",
    title: "TECHNOLOGY PARTNER",
    description: [
      "120 n8n Cloud Pro licenses for participants.",
      "Full access during the hackathon.",
    ],
    width: "w-[130px]",
  },
  {
    logo: "/sponsors/render-logo.png",
    name: "Render",
    title: "TECHNOLOGY PARTNER",
    description: [
      "$500 in credits for each winning team.",
    ],
    width: "w-[140px]",
  },
  {
    logo: "/sponsors/xyz-logo.png",
    name: ".xyz",
    title: "TECHNOLOGY PARTNER",
    description: [
      "150 .xyz domains free for the first year.",
      "Available for participants.",
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
      "Organizers: 3-month VIP memberships.",
    ],
    width: "w-[150px]",
  },
  {
    logo: "/sponsors/sarvam-logo.png",
    name: "Sarvam AI",
    title: "TECHNOLOGY PARTNER",
    description: [
      "500 credits for every participating team.",
      "10,000 bonus credits for best use of Sarvam.",
    ],
    width: "w-[150px]",
  },
];

function OtherSponsors() {
  return (
    <div className="mt-20 w-full">
      {/* Section label */}
      <h3 className="mb-10 text-center font-norse-bold text-2xl font-semibold tracking-[0.10em] text-[#C8A24C]/80 sm:mb-12 sm:text-3xl">
        other sponsors
      </h3>

      {/* SPONSOR GRID */}
      <div className="flex w-full flex-wrap justify-center gap-8">
        {otherSponsors.map((sponsor, index) => (
          <div
            key={`${sponsor.name}-${index}`}
            className="group relative w-full sm:w-[calc(50%-1rem)] lg:w-[calc((100%-4rem)/3)]"
          >
            {/* Outer glow */}
            <div className="absolute -inset-3 rounded-lg bg-[#C9963E]/10 opacity-0 blur-2xl transition-all duration-700 group-hover:opacity-100" />

            {/* CARD */}
            <div className="relative h-full p-[6px]">

              {/* GREEK / NORSE BORDER */}
              <div className="pointer-events-none absolute inset-0 z-30 border border-[#C9963E]/80" />
              <div className="pointer-events-none absolute inset-[4px] z-30 border border-[#8F6728]/70" />

              {/* STONE CARD - Added h-full flex flex-col here */}
              <div className="relative h-full flex flex-col overflow-hidden rounded-[2px]">

                {/* Stone image */}
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

                {/* Content - Changed min-h to h-full flex-1 */}
                <div className="relative z-20 flex h-full min-h-[360px] flex-1 flex-col items-center px-8 py-10 text-center">

                  {/* Logo */}
                  <div className="flex h-[95px] w-full items-center justify-center">
                    <div
                      className={`relative h-[75px] ${sponsor.width} max-w-full`}
                    >
                      <Image
                        src={sponsor.logo}
                        alt={sponsor.name}
                        fill
                        sizes="160px"
                        className="object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="my-5 h-px w-16 bg-[#C9963E]/40" />

                  {/* Sponsor name */}
                  <h4 className="font-norse text-xl font-semibold uppercase tracking-[0.12em] text-[#E0B957] drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)]">
                    {sponsor.name}
                  </h4>

                  {/* Sponsor title */}
                  <p className="mt-2 font-lora text-[9px] uppercase tracking-[0.20em] text-[#B4873A] sm:text-[10px]">
                    [{sponsor.title}]
                  </p>

                  {/* Description */}
                  <div className="flex justify-center items-center w-full">
                    <ul className="mt-4 w-full list-disc space-y-1.5 px-3 text-left font-lora text-sm leading-relaxed text-[#F1E8D5]">
                      {sponsor.description.map((item, i) => (
                        <li
                          key={i}
                          className="pl-1 marker:text-[#C9963E]"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Dark vignette */}
                <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.45)_100%)]" />

                {/* Hover shine */}
                <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
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

// function SponsorCard({
//   sponsor,
//   isTitle = false,
// }: {
//   sponsor: {
//     src: string;
//     alt: string;
//     href: string;
//   };
//   isTitle?: boolean;
// }) {
//   return (
//     <a
//       href={sponsor.href}
//       target="_blank"
//       rel="noopener noreferrer"
//       className={`group relative ${
//         isTitle ? "w-[280px] sm:w-[340px]" : "w-[230px] sm:w-[260px]"
//       }`}
//     >
//       {/* Outer glow */}
//       <div className="absolute -inset-3 rounded-md bg-[#C9963E]/10 opacity-0 blur-xl transition duration-700 group-hover:opacity-100" />

//       {/* Gold frame */}
//       <div className="relative rounded-md border border-[#C9963E]/60 p-[2px] shadow-[0_0_20px_rgba(201,150,62,0.08)] transition-all duration-500 group-hover:border-[#F6CC60] group-hover:shadow-[0_0_30px_rgba(246,204,96,0.18)]">
//         {/* Marble plaque */}
//         <div
//           className={`relative flex ${
//             isTitle ? "h-[150px] sm:h-[165px]" : "h-[125px] sm:h-[140px]"
//           } w-full items-center justify-center overflow-hidden rounded-[3px] border border-[#C9963E]/20 bg-[#11100e]`}
//         >
//           {/* Marble base */}
//           <div
//             className="absolute inset-0 opacity-80"
//             style={{
//               backgroundImage: `
//                 radial-gradient(
//                   ellipse at 20% 20%,
//                   rgba(255,255,255,0.07) 0%,
//                   transparent 35%
//                 ),
//                 radial-gradient(
//                   ellipse at 80% 70%,
//                   rgba(201,150,62,0.06) 0%,
//                   transparent 40%
//                 ),
//                 linear-gradient(
//                   135deg,
//                   #181715 0%,
//                   #0b0a09 35%,
//                   #171614 55%,
//                   #090807 100%
//                 )
//               `,
//             }}
//           />

//           {/* Marble veins */}
//           <div
//             className="pointer-events-none absolute inset-[-30%] opacity-20"
//             style={{
//               backgroundImage: `
//                 linear-gradient(
//                   125deg,
//                   transparent 25%,
//                   rgba(255,255,255,0.12) 26%,
//                   transparent 27%,
//                   transparent 48%,
//                   rgba(255,255,255,0.08) 49%,
//                   transparent 50%,
//                   transparent 72%,
//                   rgba(201,150,62,0.08) 73%,
//                   transparent 74%
//                 )
//               `,
//               transform: "rotate(-8deg) scale(1.3)",
//             }}
//           />

//           {/* Center highlight */}
//           <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.07),transparent_60%)]" />

//           {/* Sponsor logo */}
//           {/* <div className="relative z-10 h-[115px] w-[230px] sm:h-[130px] sm:w-[270px]"> 
//           <Image 
//           src={titleSponsor.src} 
//           alt={titleSponsor.alt} 
//           fill sizes="270px" 
//           className="object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)] transition-transform duration-500 group-hover:scale-[1.03]" /> 
//           */}
//           <div className="relative z-10 h-full w-full">
//             <Image
//               src={sponsor.src}
//               alt={sponsor.alt}
//               fill
//               className="drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)] transition-transform duration-500 group-hover:scale-[1.03]"
//             />
//           </div>

//           {/* Shine */}
//           <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
//         </div>
//       </div>
//     </a>
//   );
// }


// function SponsorBanners() {
//   return (
//     <div className="relative mt-16 w-full pt-3 sm:mt-20">
//       <p className="font-trajan mb-10 text-center text-[10px] tracking-[0.3em] text-[#c5a266] uppercase sm:mb-12 sm:text-xs sm:tracking-[0.4em]">
//         Supporting our vision
//       </p>

//       <div className="relative px-3 sm:px-10 lg:px-16">
//         {/* Mirrored, gold dragon-head finials at the ends of the rail. */}
//         {[false, true].map((mirrored) => (
//           <svg
//             key={String(mirrored)}
//             viewBox="0 0 100 100"
//             fill="none"
//             aria-hidden="true"
//             className={`pointer-events-none absolute -top-9 z-20 h-16 w-16 text-[#ae8646] drop-shadow-[0_2px_3px_#000] sm:-top-12 sm:h-22 sm:w-22 ${
//               mirrored
//                 ? "-right-5 -scale-x-100 sm:-right-3"
//                 : "-left-5 sm:-left-3"
//             }`}
//           >
//             <path
//               d="M94 60C73 60 74 43 60 39L49 31L57 18L42 24L33 9L32 26L16 20L24 33L10 39L5 51L16 56L26 51L36 54C46 61 31 73 38 91C43 76 67 74 60 58C72 68 81 66 94 66Z"
//               fill="#14120c"
//               stroke="currentColor"
//               strokeWidth="1.5"
//             />
//             <path
//               d="M90 62C70 63 69 47 54 44L39 34L27 36L16 43L12 50L24 46L37 48C55 53 49 68 42 76M34 28L42 31L49 24M42 39L54 35M53 49C64 52 58 68 49 72M21 53L23 60L30 54M12 40L18 41"
//               stroke="currentColor"
//               strokeWidth="1.2"
//             />
//             <path d="M27 40L35 41L29 44Z" fill="#e4c583" />
//             <path
//               d="M37 14L39 26M20 24L29 32M47 56L44 65"
//               stroke="#e2c583"
//               strokeOpacity=".5"
//             />
//           </svg>
//         ))}

//         {/* Central knotwork medallion. */}
//         <div className="pointer-events-none absolute -top-5 left-1/2 z-20 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full border border-[#b28b49]/70 bg-[#0e0d09] p-1 text-[#d0aa62] shadow-[0_0_0_4px_#080705,0_0_18px_#bd8c3026]">
//           <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
//             <circle cx="20" cy="20" r="18" stroke="currentColor" />
//             <circle
//               cx="20"
//               cy="20"
//               r="15"
//               stroke="currentColor"
//               strokeOpacity=".35"
//             />
//             <path
//               d="M20 8L9 27H31L20 8ZM14 12L25 31L31 20H9L14 12ZM20 16L14 26H26L20 16Z"
//               stroke="currentColor"
//               strokeLinejoin="round"
//             />
//           </svg>
//         </div>

//         {/* Two rows of four on small screens; one continuous rail on desktop. */}
//         <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2 md:gap-y-0">
//           {[bannerSponsors.slice(0, 4), bannerSponsors.slice(4)].map(
//             (group, row) => (
//               <div
//                 key={row}
//                 className="relative grid grid-cols-4 gap-2 px-1 pt-5 sm:gap-3 sm:px-1.5"
//               >
//                 <div
//                   aria-hidden="true"
//                   className="pointer-events-none absolute inset-x-0 top-0 h-2.5 border-y border-[#af8745]/70 bg-[linear-gradient(180deg,#76603b_0%,#16130c_25%,#292011_60%,#a17a3b_85%,#21180c_100%)] shadow-[0_3px_8px_#000]"
//                 >
//                   <div className="absolute inset-x-0 top-0.5 h-1 bg-[repeating-linear-gradient(45deg,transparent_0px,transparent_13px,#b18a4759_14px,transparent_15px),repeating-linear-gradient(-45deg,transparent_0px,transparent_13px,#b18a4759_14px,transparent_15px)]" />
//                 </div>

//                 {group.map((sponsor) => (
//                   <div
//                     key={sponsor.id}
//                     className="relative min-w-0 drop-shadow-[3px_8px_5px_rgba(0,0,0,0.7)]"
//                   >
//                     {/* Suspension ring and the leather tab above each banner. */}
//                     <div
//                       aria-hidden="true"
//                       className="absolute -top-3 left-1/2 z-10 h-3.5 w-2.5 -translate-x-1/2 rounded-full border border-[#c69c52]/80 shadow-[inset_1px_0_2px_#000]"
//                     />
//                     <div
//                       aria-hidden="true"
//                       className="absolute -top-1 left-1/2 z-10 h-4 w-1 -translate-x-1/2 border-x border-[#9c7c46]/50 bg-[#292318]"
//                     />

//                     {/* Weathered gold edge and pointed, ragged cloth hem. */}
//                     <div className="relative aspect-[0.59] w-full bg-[linear-gradient(110deg,#c4a063_0%,#332917_8%,#8c713e_45%,#302619_70%,#b99652_100%)] p-[2px] [clip-path:polygon(0_0,100%_0,98%_80%,88%_83%,86%_89%,77%_86%,68%_94%,62%_92%,51%_100%,44%_94%,38%_97%,30%_90%,23%_92%,17%_85%,3%_80%)]">
//                       <div className="absolute inset-[2px] bg-[linear-gradient(90deg,#080908_0%,#24231c_8%,#11120f_19%,#171813_45%,#0a0b09_76%,#24231a_94%,#080908_100%)] [clip-path:polygon(0_0,100%_0,98%_80%,88%_83%,86%_89%,77%_86%,68%_94%,62%_92%,51%_100%,44%_94%,38%_97%,30%_90%,23%_92%,17%_85%,3%_80%)]" />
//                       <div
//                         aria-hidden="true"
//                         className="pointer-events-none absolute inset-0 bg-[url('/images/parchment-texture.jpg')] bg-cover opacity-[0.12] mix-blend-soft-light"
//                       />
//                       <div
//                         aria-hidden="true"
//                         className="pointer-events-none absolute inset-x-[7%] top-0 bottom-[15%] border-x border-[#b18a47]/20"
//                       />
// <h3 className="font-norse text-lg font-semibold tracking-[0.10em] text-[#C8A24C]/80 sm:tracking-[0.14em] md:text-lg">
//             {sponsor.id}
//           </h3>
//                       {/* Intentionally empty logo area; insert logos in bannerSponsors above. */}
//                       <div className="relative mx-auto mt-[18%] flex w-auto h-[50%] items-center justify-center p-2">
//                         <Image src={sponsor.logo} alt={sponsor.id} fill className="p-2" />
//                       </div>
                    
//                       <svg
//                         className="relative mx-auto mt-[12%] h-auto w-[22%] text-[#b38c46]/85"
//                         viewBox="0 0 28 30"
//                         fill="none"
//                         aria-hidden="true"
//                       >
//                         <path
//                           d={sponsor.rune}
//                           stroke="currentColor"
//                           strokeWidth="1.2"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                       </svg>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ),
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useEffect, useRef } from "react";
// import SpeakerCarousel from "./SpeakerCarousel";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Button from "./Button";

// gsap.registerPlugin(ScrollTrigger);
// export default function CallForSpeakers() {
//   const sectionRef = useRef<HTMLElement>(null);
  
//   const revealRef = useRef<HTMLDivElement>(null);
//   const titleGroupRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const section = sectionRef.current;
//     if (!section) return;
//     const ctx = gsap.context(() => {
     
//       const prevSection = section.previousElementSibling as HTMLElement | null;
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: section,
//           start: "top bottom", 
//           end: "top 20%", 
//           scrub: 1,
//         },
//       });
//       if (prevSection) {
//         tl.to(prevSection, { opacity: 0, ease: "none" }, 0);
//       }
//       if (revealRef.current) {
//         tl.fromTo(
//           revealRef.current,
//           { opacity: 1 },
//           { opacity: 0, ease: "power1.inOut" },
//           0,
//         );
//       }
//       if (titleGroupRef.current) {
//         tl.fromTo(
//           titleGroupRef.current,
//           { opacity: 0, y: 36, filter: "blur(8px)" },
//           { opacity: 1, y: 0, filter: "blur(0px)", ease: "power2.out" },
//           0.2,
//         );
//       }
//     }, section);

//     return () => ctx.revert();
//   }, []);
//   return (
//     <section
//       ref={sectionRef}
//       id="speakers"
//       className="relative flex h-[100svh] max-h-[100svh] w-full max-w-full flex-col justify-center overflow-hidden bg-[#050403] text-white"
//     >
//       <div
//         className="absolute inset-0 z-0 bg-cover bg-[right_38%] bg-no-repeat sm:bg-[right_42%] md:bg-[right_center] lg:hidden"
//         style={{
//           backgroundImage: `url("/images/greek-callfs2.png")`,
//         }}
//       />
//       <div
//         className="absolute inset-0 z-0 hidden bg-cover bg-right bg-no-repeat lg:block"
//         style={{
//           backgroundImage: `url("/images/greek-callfs.png")`,
//         }}
//       />

//       <div
//         className="pointer-events-none absolute inset-0 z-[1]"
//         style={{
//           background:
//             "radial-gradient(ellipse 85% 90% at 18% 50%, transparent 0%, rgba(0,0,0,.45) 100%)",
//         }}
//       />
//       <div
//         ref={revealRef}
//         className="pointer-events-none absolute inset-0 z-30 bg-[#050403]"
//         style={{
//           background:
//             "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(20,16,10,1) 0%, rgba(5,4,3,1) 75%)",
//         }}
//       />
//       <div className="xs:px-4 xs:py-5 relative z-10 mx-auto flex h-full w-full max-w-[1700px] flex-col items-start justify-between px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-7 lg:px-12 lg:py-7 xl:px-16 xl:py-8 2xl:px-20">
//         <div
//           ref={titleGroupRef}
//           className="relative z-10 mt-15 flex w-full shrink-0 flex-col items-start"
//         >
//           <div className="relative z-10 w-full shrink-0 text-left">
//             <h2 className="font-norse-bold m-0 text-[clamp(2.15rem,9vw,2.7rem)] leading-[0.92] tracking-[0.06em] uppercase sm:text-[clamp(2.5rem,6vw,3.1rem)] md:text-[clamp(2.8rem,4.5vw,3.4rem)] lg:text-[clamp(3rem,5.4vh,4.3rem)] xl:text-[clamp(3.6rem,6vh,5.2rem)]">
//               <span className="bg-gradient-to-r from-[#F6CC60] via-[#FFF5D0] to-[#C9963E] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(246,204,96,0.3)]">
//                 Call for Speakers
//               </span>
//             </h2>

//             <h3 className="font-lora mt-1 text-[clamp(0.68rem,2.4vw,0.82rem)] leading-tight font-medium tracking-[0.20em] text-white uppercase sm:mt-1.5 sm:text-[clamp(0.72rem,1.8vw,0.88rem)] sm:tracking-[0.26em] md:text-[clamp(0.78rem,1.4vw,0.95rem)] md:tracking-[0.28em] lg:mt-1.5 lg:text-[clamp(0.68rem,1.3vh,0.92rem)] lg:tracking-[0.28em] xl:text-[clamp(0.75rem,1.4vh,1rem)]">
//               Grace the Mythic Stage of DevHost 2026
//             </h3>
//           </div>
//           <div className="relative z-10 mt-7 w-full shrink-0 sm:mt-8 md:mt-8 lg:mt-9 xl:mt-10">
//             <p
//               className="font-lora xs:text-[14px] xs:max-w-[400px] m-0 w-full max-w-[390px] text-left text-[10px] leading-[1.75] tracking-[0.015em] text-white/90 sm:max-w-[520px] sm:text-[15px] sm:leading-[1.9] sm:tracking-[0.03em] md:max-w-[600px] md:text-base md:leading-[1.9] lg:max-w-[850px] lg:text-[clamp(1.05rem,2vh,1.25rem)] lg:leading-[2] xl:max-w-[950px] xl:text-[clamp(1.15rem,2.2vh,1.4rem)] xl:leading-[2]"
//               style={{
//                 textShadow:
//                   "0 1px 2px rgba(0,0,0,.85), 0 0 12px rgba(246,204,96,.08)",
//               }}
//             >
//               Share your knowledge, research, and technical vision with
//               passionate developers, students, and industry leaders. Whether you
//               specialize in AI & Machine Learning, Open Source Infrastructure,
//               Cloud & Web3, or Software Architecture, take the stage and inspire
//               passionate developers at DevHost 2026.
//             </p>
//           </div>
//           <div className="xs:mt-9 xs:scale-100 relative z-10 mt-8 flex w-full shrink-0 origin-center scale-[0.95] justify-center sm:mt-6 sm:scale-100 md:mt-6 lg:mt-6 lg:scale-[1.2] xl:mt-7 xl:scale-[1.35]">
//             <Button
//               onClick={() => {
//                 window.location.href = "https://forms.gle/PxRYSUCY5ycXWERDA";
//               }}
//             >
//               Submit Proposal
//             </Button>
//           </div>
//         </div>
//         <div className="xs:-ml-4 xs:-mr-4 relative z-10 mt-1.5 -mr-4 -ml-4 flex min-h-0 w-screen max-w-none shrink-0 flex-col justify-end overflow-hidden sm:-mr-6 sm:-ml-6 md:-mr-8 md:-ml-8 lg:-mr-12 lg:-ml-12 xl:-mr-16 xl:-ml-16 2xl:-mr-20 2xl:-ml-20">
//           <SpeakerCarousel />
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SpeakerCarousel from "./SpeakerCarousel";
import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

// From xl (1280px) up, the whole section is laid out as if the screen were
// DESIGN_W x DESIGN_H, then scaled to fit the real screen.
const DESIGN_W = 1920;
const DESIGN_H = 1080;
const SCALE_FROM = "(min-width: 1280px)";
// 1 = the previous size. Above 1 makes everything bigger, below 1 smaller.
// Keep it under ~1.3 or the content gets taller than the screen.
const ZOOM = 1.15;

export default function CallForSpeakers() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Scale the stage to fit the section (xl and up only).
  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const fit = () => {
      if (!window.matchMedia(SCALE_FROM).matches) {
        stage.removeAttribute("style");
        return;
      }
      const s =
        Math.min(
          section.clientWidth / DESIGN_W,
          section.clientHeight / DESIGN_H,
        ) * ZOOM;
      stage.style.width = `${100 / s}%`;
      stage.style.height = `${100 / s}%`;
      stage.style.transformOrigin = "top left";
      stage.style.transform = `scale(${s})`;
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(section);
    return () => ro.disconnect();
  }, []);

  // One reveal when the section scrolls into view.
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          once: true,
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="speakers"
      className="relative min-h-svh w-full overflow-hidden bg-[#050403] text-white xl:h-svh"
    >
      {/* Background: mobile image by default, desktop image from lg up */}
      <div className="absolute inset-0 bg-[url('/images/greek-callfs2.png')] bg-cover bg-right bg-no-repeat lg:bg-[url('/images/greek-callfs.png')]" />

      {/* Darken the left side so the text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

      {/* Stage: normal flow below xl, absolutely positioned and scaled from xl up */}
      <div
        ref={stageRef}
        className="relative flex min-h-svh flex-col justify-between xl:absolute xl:top-0 xl:left-0 xl:min-h-0"
      >
        <div ref={contentRef} className="w-full px-12 pt-20 md:px-20 xl:px-30 xl:pt-24">
          <h2 className="font-norse-bold text-4xl text-[#F6CC60] md:text-6xl lg:text-6xl xl:text-8xl">
            Call for Speakers
          </h2>

          <p className="font-lora mt-2 text-sm text-white md:text-2xl xl:text-3xl">
            Grace the mythic stage of DevHost 2026
          </p>

          <p className="font-lora mt-8 max-w-xl leading-[2.2] text-white/90 lg:max-w-6xl lg:py-10 lg:text-lg xl:max-w-5xl xl:text-2xl md:leading-[2.2] md:text-2xl md:py-10 mx-[-10] px-3 text-base">
            Share your knowledge, research, and technical vision with
            developers, students, and industry leaders. Whether your focus is AI
            and machine learning, open source infrastructure, cloud and Web3, or
            software architecture, take the stage at DevHost 2026.
          </p>

          <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:mt-18 md:mt-2">
            
              <Button
                onClick={() => {
                  window.location.href = "https://forms.gle/PxRYSUCY5ycXWERDA";
                }}
              >
                Submit Proposal
              </Button>
          </div>
        </div>

        <div className="mt-10 pb-6">
          <SpeakerCarousel />
        </div>
      </div>
    </section>
  );
}
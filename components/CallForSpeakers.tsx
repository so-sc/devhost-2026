"use client";

import { useEffect, useRef } from "react";
import SpeakerCarousel from "./SpeakerCarousel";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);
export default function CallForSpeakers() {
  const sectionRef = useRef<HTMLElement>(null);
  // const titleRef = useRef<HTMLHeadingElement>(null);
  // const titleGlowRef = useRef<HTMLSpanElement>(null);
  // const captionRef = useRef<HTMLHeadingElement>(null);
  // const paragraphRef = useRef<HTMLParagraphElement>(null);
  // const buttonRef = useRef<HTMLAnchorElement>(null);
  const revealRef=useRef<HTMLDivElement>(null);
  const titleGroupRef =useRef<HTMLDivElement>(null);

  useEffect(() => {
    // let split: SplitType | null = null;
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      // split = new SplitType(paragraphRef.current!, {
      //   types: "lines",
      // });

      // split.lines?.forEach((line) => {
      //   line.style.overflow = "hidden";
      // });

      // gsap.set([titleRef.current, captionRef.current, buttonRef.current], {
      //   opacity: 0,
      //   y: 40,
      // });

      // if (split?.lines) {
      //   gsap.set(split.lines, {
      //     opacity: 0,
      //     y: 20,
      //   });
      // }

      // const tl = gsap.timeline({
      //   scrollTrigger: {
      //     trigger: sectionRef.current,
      //     start: "top 75%",
      //     toggleActions: "play none none reverse",
      //   },
      // });

      // tl.to(titleRef.current, {
      //   opacity: 1,
      //   y: 0,
      //   duration: 0.6,
      //   ease: "power3.out",
      // })
      //   .to(
      //     captionRef.current,
      //     {
      //       opacity: 1,
      //       y: 0,
      //       duration: 0.4,
      //       ease: "power2.out",
      //     },
      //     "-=0.3",
      //   )
      //   .add(() => {
      //     if (split?.lines) {
      //       gsap.to(split.lines, {
      //         opacity: 1,
      //         y: 0,
      //         stagger: 0.12,
      //         duration: 0.6,
      //         ease: "power2.out",
      //       });
      //     }
      //   })
      //   .to(
      //     buttonRef.current,
      //     {
      //       opacity: 1,
      //       y: 0,
      //       duration: 0.4,
      //       ease: "back.out(1.3)",
      //     },
      //     "-=0.1",
      //   );

      // gsap.to(titleGlowRef.current, {
      //   filter: "drop-shadow(0 0 18px rgba(246,204,96,0.6))",
      //   scale: 1.01,
      //   duration: 2.5,
      //   repeat: -1,
      //   yoyo: true,
      //   ease: "sine.inOut",
      // });

    const prevSection = section.previousElementSibling as HTMLElement | null;
    const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom", // starts as this section begins entering the viewport
          end: "top 20%",      // finishes once it's mostly in view
          scrub: 1,
        },
      });
      if (prevSection) {
        tl.to(prevSection, { opacity: 0, ease: "none" }, 0);
      }
      if (revealRef.current) {
        tl.fromTo(
          revealRef.current,
          { opacity: 1 },
          { opacity: 0, ease: "power1.inOut" },
          0
        );
      }
      if (titleGroupRef.current) {
        tl.fromTo(
          titleGroupRef.current,
          { opacity: 0, y: 36, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", ease: "power2.out" },
          0.2
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);
  return (
    <section
      ref={sectionRef}
      id="speakers"
      className="relative flex h-[100svh] max-h-[100svh] w-full max-w-full flex-col justify-center overflow-hidden bg-[#050403] text-white"
    >
      <div
        className="
          absolute inset-0 z-0 bg-cover bg-no-repeat bg-[right_38%] sm:bg-[right_42%] md:bg-[right_center] lg:hidden
        "
        style={{
          backgroundImage: `url("/images/greek-callfs2.png")`,
        }}
      />
      <div
        className="
          absolute inset-0 z-0 hidden bg-cover bg-no-repeat bg-right lg:block
        "
        style={{
          backgroundImage: `url("/images/greek-callfs.png")`,
        }}
      />
      
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 85% 90% at 18% 50%, transparent 0%, rgba(0,0,0,.45) 100%)",
        }}
      />
      <div
        ref={revealRef}
        className="pointer-events-none absolute inset-0 z-30 bg-[#050403]"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(20,16,10,1) 0%, rgba(5,4,3,1) 75%)",
        }}
      />
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1700px] flex-col items-start justify-between px-4 py-4 xs:px-4 xs:py-5 sm:px-6 sm:py-6 md:px-8 md:py-7 lg:px-12 lg:py-7 xl:px-16 xl:py-8 2xl:px-20">
        <div ref={titleGroupRef} className="relative mt-15 z-10 flex w-full shrink-0 flex-col items-start">
          <div className="relative z-10 w-full shrink-0 text-left">
            <h2
              className="
                font-norse-bold
                m-0
                uppercase
                leading-[0.92]
                tracking-[0.06em]
                text-[clamp(2.15rem,9vw,2.7rem)]
                sm:text-[clamp(2.5rem,6vw,3.1rem)]
                md:text-[clamp(2.8rem,4.5vw,3.4rem)]
                lg:text-[clamp(3rem,5.4vh,4.3rem)]
                xl:text-[clamp(3.6rem,6vh,5.2rem)]
              "
            >
              <span
                className="
                  bg-gradient-to-r from-[#F6CC60] via-[#FFF5D0] to-[#C9963E] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(246,204,96,0.3)]
                "
              >
                Call for Speakers
              </span>
            </h2>

          <h3
              className="
                font-lora
                mt-1
                font-medium
                uppercase
                leading-tight
                tracking-[0.20em]
                text-white
                text-[clamp(0.68rem,2.4vw,0.82rem)]
                sm:mt-1.5
                sm:tracking-[0.26em]
                sm:text-[clamp(0.72rem,1.8vw,0.88rem)]
                md:tracking-[0.28em]
                md:text-[clamp(0.78rem,1.4vw,0.95rem)]
                lg:mt-1.5
                lg:tracking-[0.28em]
                lg:text-[clamp(0.68rem,1.3vh,0.92rem)]
                xl:text-[clamp(0.75rem,1.4vh,1rem)]
              "
            >
              Grace the Mythic Stage of DevHost 2026
            </h3>
        </div>
        <div className="relative
              z-10
              mt-7
              w-full
              shrink-0
              sm:mt-8
              md:mt-8
              lg:mt-9
              xl:mt-10">
                <p className="
           font-lora m-0 w-full text-left text-[10px] xs:text-[14px] leading-[1.75] tracking-[0.015em] text-white/90 max-w-[390px] xs:max-w-[400px] sm:max-w-[520px] sm:text-[15px] sm:leading-[1.9] sm:tracking-[0.03em] md:max-w-[600px] md:text-base md:leading-[1.9] lg:max-w-[850px] lg:text-[clamp(1.05rem,2vh,1.25rem)] lg:leading-[2] xl:max-w-[950px] xl:text-[clamp(1.15rem,2.2vh,1.4rem)] xl:leading-[2]"
              style={{
                textShadow:
                  "0 1px 2px rgba(0,0,0,.85), 0 0 12px rgba(246,204,96,.08)",
              }}
            >
              Share your knowledge, research, and technical vision with passionate
              developers, students, and industry leaders. Whether you specialize in AI &
              Machine Learning, Open Source Infrastructure, Cloud & Web3, or Software
              Architecture, take the stage and inspire passionate developers at DevHost
              2026.
            </p>
          </div>
            <div
            className="
              relative z-10 mt-8 flex w-full shrink-0 justify-center origin-center scale-[0.95] xs:mt-9 xs:scale-100 sm:mt-6 sm:scale-100 md:mt-6 lg:mt-6 lg:scale-[1.2] xl:mt-7 xl:scale-[1.35]
            "
          >
            <Button
              onClick={() => {
                window.location.href =
                  "https://forms.gle/PxRYSUCY5ycXWERDA";
              }}
            >
              Submit Proposal
            </Button>
            </div>
            </div>
        <div
          className="
            relative z-10 flex min-h-0 w-screen max-w-none shrink-0 flex-col justify-end overflow-hidden mt-1.5 -ml-4 -mr-4 xs:-ml-4 xs:-mr-4 sm:-ml-6 sm:-mr-6 md:-ml-8 md:-mr-8 lg:-ml-12 lg:-mr-12 xl:-ml-16 xl:-mr-16 2xl:-ml-20 2xl:-mr-20
          "
        >
          <SpeakerCarousel />
        </div>
      </div>
    </section>
  );
}
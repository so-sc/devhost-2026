"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutDevhost() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const captionRef = useRef<HTMLHeadingElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  const devhostData = {
    title: "About DevHost",
    caption: "Where Ancient Wisdom Meets Future Code",
    about:
      "Devhost, the flagship event is a remarkable tech convergence by Sahyadri Open Source Community (SOSC), is set to be an exhilarating experience with an exciting mix of technical and non-technical events. It seeks to equip participants with knowledge and skills, while encouraging curiosity and fostering innovation. With a variety of tech and non-tech battles and events featuring dev talks and workshops led by industry experts, it creates opportunities for both personal development and self-exploration. Join the 36-hour live hack event to bring your ideas to fruition, with challenges designed for every level of experience.",
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(
        [
          titleRef.current,
          captionRef.current,
          aboutRef.current,
          buttonsRef.current,
        ],
        { opacity: 0, y: 30 },
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      })
        .to(
          captionRef.current,
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
          "-=0.3",
        )
        .to(
          aboutRef.current,
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          "-=0.15",
        )
        .to(
          buttonsRef.current,
          { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.2)" },
          "-=0.15",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#050403] py-12 text-white lg:px-8"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url('/images/parchment-texture.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.6,
          mixBlendMode: "soft-light",
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(246,204,96,.07),transparent_65%)]" />

      <div className="pointer-events-none absolute top-10 right-0 z-[1] hidden w-[280px] lg:block xl:w-[380px]">
        <Image
          src="/images/about-temple.png"
          alt=""
          width={1100}
          height={1100}
          className="h-auto w-full object-contain opacity-[0.12] select-none"
          style={{ objectPosition: "top right" }}
        />
      </div>

      <div className="pointer-events-none absolute top-[-30px] left-1/2 z-[1] hidden w-[180px] -translate-x-1/2 sm:block md:w-[240px]">
        <Image
          src="/images/sun-graphic.svg"
          alt=""
          width={400}
          height={400}
          className="h-auto w-full object-contain opacity-[0.12] select-none"
        />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 z-[1] hidden w-[220px] lg:block xl:w-[260px]">
        <Image
          src="/images/mythic_spartan_shield.webp"
          alt=""
          width={600}
          height={800}
          className="h-auto w-full object-contain opacity-[0.18] select-none"
          style={{ objectPosition: "bottom left" }}
        />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 z-[1] block w-[120px] sm:w-[150px] lg:hidden">
        <Image
          src="/images/mythic_spartan_shield.webp"
          alt=""
          width={600}
          height={800}
          className="h-auto w-full object-contain opacity-[0.10] select-none"
          style={{ objectPosition: "bottom left" }}
        />
      </div>

      <div className="relative z-10 mx-auto w-[80%]">
        <div className="relative mb-4 text-center sm:mb-6">
          <h2
            ref={titleRef}
            className="font-norse-bold mb-2 text-6xl font-extrabold tracking-[0.12em] uppercase md:text-8xl"
          >
            <span className="bg-gradient-to-r from-[#F6CC60] via-[#FFF5D0] to-[#C9963E] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(246,204,96,0.3)]">
              {devhostData.title}
            </span>
          </h2>

          <h3
            ref={captionRef}
            className="font-norse text-lg tracking-[0.10em] text-[#C8A24C]/80 font-semibold sm:tracking-[0.14em] md:text-2xl"
          >
            {devhostData.caption}
          </h3>
        </div>

        <div
          ref={aboutRef}
          className="relative mx-auto flex flex-col items-center pt-4 sm:w-full sm:max-w-[80%] sm:pt-8"
        >
          <div className="relative z-10 w-full text-justify">
            <p
              className="font-trajan text-md leading-relaxed tracking-[0.02em] break-words text-white sm:text-lg sm:leading-[1.75] sm:tracking-[0.03em]"
              style={{
                textShadow:
                  "0 1px 1px rgba(0,0,0,.7),0 0 12px rgba(246,204,96,.08)",
              }}
            >
              {devhostData.about}
            </p>
          </div>
        </div>

        <div
          ref={buttonsRef}
          className="mt-6 flex w-full flex-col items-center gap-3 sm:mt-8"
        >
          <a
            href="/brochure/devhost_2025.pdf"
            download
            className="group font-dalek inline-flex items-center justify-center gap-2.5 rounded-sm border border-[#C9963E] bg-gradient-to-b from-[#1C1A17] via-[#121212] to-[#080808] px-6 py-3 text-xs font-bold tracking-[0.12em] text-[#F6CC60] uppercase shadow-[0_0_16px_rgba(246,204,96,0.08),inset_0_0_0_1px_rgba(246,204,96,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[#F6CC60] hover:text-[#FFF3C1] hover:shadow-[0_0_24px_rgba(246,204,96,0.25)] active:scale-[0.98] sm:px-8 sm:py-3 sm:text-sm sm:tracking-[0.14em]"
          >
            <Download
              size={18}
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />
            <span>DevHost Brochure</span>
          </a>
        </div>
      </div>
    </section>
  );
}

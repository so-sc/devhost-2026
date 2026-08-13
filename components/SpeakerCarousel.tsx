"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const speakers = [
  {
    id: 1,
    name: "Dr. Pruthviraj Umesh",
    title: "Associate Professor @ NITK",
    img: "/speakers/dr-pruthviraj-nitk.jpeg",
    link: "https://www.linkedin.com/in/dr-pruthviraj-u",
  },
  {
    id: 2,
    name: "N. Ananthakrishnan Potti",
    title: "Leading Security Operations @ OLA",
    img: "/speakers/potti.jpg",
    link: "https://www.linkedin.com/in/ananthakrishnanpotti/",
  },
  {
    id: 3,
    name: "Aakansha Doshi",
    title: "Open Source Enthusiast",
    img: "/speakers/aakansha.jpeg",
    link: "https://www.linkedin.com/in/aa1992/",
  },
  {
    id: 4,
    name: "Charis Pinto",
    title: "Presales Solution Architect @ Niveus Solutions",
    img: "/speakers/charis-devhost.jpeg",
    link: "https://www.linkedin.com/in/charispinto/",
  },
  {
    id: 5,
    name: "Raj Raorane",
    title: "Co-Founder of Edgetributors",
    img: "/speakers/Raj Raorane.jpeg",
    link: "https://www.linkedin.com/in/raj-raorane-45b2b4166/",
  },
  {
    id: 6,
    name: "Samwin Steve Pereira",
    title: "Solution Architect @ Niveus Solutions",
    img: "/speakers/Samwin Steve Pereira.jpg",
    link: "https://www.linkedin.com/in/samwin-pereira-058417246/",
  },
  {
    id: 7,
    name: "Raghu Anand",
    title: "Head of Technology L&D / Training @ EG/AS",
    img: "/speakers/RaghuAnand.jpg",
    link: "https://www.linkedin.com/in/raghuanand16",
  },
];

const displaySpeakers = [...speakers, ...speakers];

export default function SpeakerCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const positionRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;

    if (!track) return;

    const speed = 25; // pixels per second

    const animate = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }

      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (!pausedRef.current) {
        positionRef.current -= speed * delta;

        const halfWidth = track.scrollWidth / 2;

        if (Math.abs(positionRef.current) >= halfWidth) {
          positionRef.current = 0;
        }

        track.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="relative mt-8 w-full overflow-hidden py-10 sm:mt-10">
      <h2 className="font-norse mt-6 text-center text-2xl font-extrabold tracking-wider text-[#C8A24C] uppercase sm:mt-8 sm:text-3xl">
        Past Speakers
      </h2>

      {/* Viewport */}
      <div
        className="w-full overflow-hidden"
        onMouseEnter={() => {
          pausedRef.current = true;
        }}
        onMouseLeave={() => {
          pausedRef.current = false;
          lastTimeRef.current = null;
        }}
      >
        {/* Moving track */}
        <div
          ref={trackRef}
          className="flex w-max gap-8 px-8 sm:gap-10 sm:px-10 lg:gap-14"
        >
          {displaySpeakers.map((speaker, index) => (
            <a
              key={`${speaker.id}-${index}`}
              href={speaker.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-32 flex-none flex-col items-center py-4 text-center sm:w-36"
            >
              {/* Circle photo */}
              <div className="relative aspect-square w-28 overflow-hidden rounded-full border border-[#C8A24C]/50 bg-[#151412] p-1 shadow-[0_0_18px_rgba(200,162,76,0.08)] transition-all duration-500 group-hover:scale-105 group-hover:border-[#F6CC60] group-hover:shadow-[0_0_25px_rgba(246,204,96,0.2)] sm:w-32">
                <div className="relative h-full w-full overflow-hidden rounded-full">
                  <Image
                    src={speaker.img}
                    alt={speaker.name}
                    fill
                    sizes="128px"
                    className="object-cover object-center grayscale-[15%] transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                  />

                  <div className="pointer-events-none absolute inset-0 rounded-full bg-[#F6CC60]/5 transition-opacity duration-300 group-hover:opacity-0" />
                </div>
              </div>

              {/* Name */}
              <h3 className="font-norse mt-4 line-clamp-2 min-h-10 text-base leading-tight tracking-wide text-[#F6CC60] transition-colors duration-300 group-hover:text-[#FFF5D0] sm:text-lg">
                {speaker.name}
              </h3>

              {/* Divider */}
              <div className="mt-2 h-px w-8 bg-[#C8A24C]/60 transition-all duration-300 group-hover:w-14 group-hover:bg-[#F6CC60]" />

              {/* Designation */}
              <p className="font-poppins mt-2 line-clamp-3 min-h-12 text-xs leading-relaxed text-white/60 transition-colors duration-300 group-hover:text-white/80">
                {speaker.title}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

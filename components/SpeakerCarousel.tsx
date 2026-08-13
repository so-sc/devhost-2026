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
    <div className="relative mx-auto mt-8 w-full overflow-hidden pb-4 sm:mt-10 sm:max-w-[90%] sm:py-10">
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
          className="flex w-max gap-12 px-8 sm:gap-10 sm:px-10 lg:gap-14"
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
              <div className="relative flex h-32 w-32 items-center justify-center sm:h-48 sm:w-48">
                {/* Photo */}
                <div className="relative h-24 w-24 overflow-hidden rounded-full bg-[#151412] sm:h-32 sm:w-32">
                  <Image
                    src={speaker.img}
                    alt={speaker.name}
                    fill
                    sizes="128px"
                    className="object-cover object-center grayscale-[15%] transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                  />

                  <div className="pointer-events-none absolute inset-0 rounded-full bg-[#F6CC60]/5 transition-opacity duration-300 group-hover:opacity-0" />
                </div>

                {/* Gold frame */}
                <Image
                  src="/gold-frame-greek.png"
                  alt=""
                  width={170}
                  height={170}
                  className="pointer-events-none absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 object-contain"
                />
              </div>
              {/* Name */}
              <h3 className="font-norse mt-4 line-clamp-2 min-h-10 text-base leading-tight tracking-wide text-[#F6CC60] transition-colors duration-300 group-hover:text-[#FFF5D0] sm:text-lg">
                {speaker.name}
              </h3>

              {/* Divider */}
              <div className="h-px w-8 bg-[#C8A24C]/60 transition-all duration-300 group-hover:w-14 group-hover:bg-[#F6CC60] sm:mt-2" />

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

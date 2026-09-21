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
  {
    id: 8,
    name: "Suyog Shetty",
    title: "Chief Executive Officer @ Niveus Solutions Pvt. Ltd.",
    img: "/speakers/Suyog.png",
    link: "https://www.linkedin.com/in/suyog-shetty-79693730/",
  },
  {
    id: 11,
    name: "Shashir Shetty",
    title: "Chief Growth Officer @ Niveus Solutions",
    img: "/speakers/shashir.png",
    link: "https://www.linkedin.com/in/shashirshetty/",
  },
  {
    id: 13,
    name: "Shihab Kalandar",
    title: "Co-Founder & COO, Niveus Solutions Pvt. Ltd.",
    img: "/speakers/shihab.png",
    link: "https://www.linkedin.com/in/shihab-kalandar-5228b315/",
  },
  {
    id: 14,
    name: "Amrith Shenava",
    title: "Founder of Flashmates.inc",
    img: "/speakers/amrit shenava.png",
    link: "https://www.linkedin.com/in/amritshenava/",
  },
  //   {
  //   id: 10,
  //   name: "Mohit P. Tahiliani",
  //   title: "Associate Professor, NITK Surathkal",
  //   img: "",
  //   link: "https://www.linkedin.com/in/mohittahiliani/",
  // },

  //   {
  //   id: 12,
  //   name: "Prasanna",
  //   title: "Lead, Data Center of Excellence, TCS",
  //   img: "",
  //   link: "",
  // },
  // {
  //   id: 15,
  //   name: "R Balakrishnan",
  //   title: "Principal Program Manager, Azure Microsoft, Seattle",
  //   img: "",
  //   link: "",
  // },
  // {
  //   id: 16,
  //   name: "Sagar Vaidya",
  //   title: "Chief Architect (Enterprise), Niveus Solutions Pvt. Ltd.",
  //   img: "",
  //   link: "",
  // },
  //   {
  //   id: 9,
  //   name: "Nikhil Raj",
  //   title: "Former Head of Talent Management, TCS Europe",
  //   img: "",
  //   link: "",
  // },
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
    <div className="relative mx-auto mt-8 w-full overflow-hidden sm:mt-10 sm:py-10">
      <h2 className="font-norse mb-4 text-center text-2xl font-extrabold tracking-wider text-[#C8A24C] uppercase sm:text-3xl">
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
          className="flex w-max gap-12 px-8 sm:gap-16 sm:px-10 lg:gap-26"
        >
          {displaySpeakers.map((speaker, index) => (
            <a
              key={`${speaker.id}-${index}`}
              href={speaker.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-32 flex-none flex-col items-center py-4 text-center sm:w-45"
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
              <h3 className="font-lora mt-2 line-clamp-2 w-full text-center text-[18px] leading-[1.25] font-semibold tracking-wide text-white max-sm:text-[14px]">
                {speaker.name}
              </h3>

              <p className="font-lora mt-1 line-clamp-2 block w-full text-center text-[14px] leading-[1.25] tracking-[0.01em] text-[#F6CC60]/75 max-sm:text-[11px]">
                {speaker.title}
              </p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

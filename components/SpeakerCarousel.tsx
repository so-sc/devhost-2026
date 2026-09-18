"use client";

import Image from "next/image";
import { useEffect, useRef ,useState} from "react";

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
function SpeakerAvatar({
  src,
  name,
  sizes,
  className,
}: {
  src: string;
  name: string;
  sizes: string;
  className?: string;
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    const initials = name
      .split(" ")
      .map((part) => part[0])
      .filter(Boolean)
      .join("")
      .slice(0, 2);
      return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-[#2a2416] to-[#12110e] text-[#F6CC60] font-norse font-bold text-xs select-none">
        {initials}
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={name}
      fill
      sizes={sizes}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}
function SpeakerCard({
  speaker,
  frameClassName,
  imageSizes,
  nameClassName,
  titleClassName,
  imageClassName,
  cardClassName,
}: {
  speaker: (typeof speakers)[number];
  frameClassName: string;
  imageSizes: string;
  nameClassName: string;
  titleClassName: string;
  imageClassName?: string;
  cardClassName?: string;
}) {
  return (
    <a
      href={speaker.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex flex-col items-center text-center ${cardClassName ?? ""}`}
    >
      <div
        className={`relative flex items-center justify-center ${frameClassName}`}
      >
        <div className="relative h-[69%] w-[69%] overflow-hidden rounded-full bg-[#151412]">
          <SpeakerAvatar
            src={speaker.img}
            name={speaker.name}
            sizes={imageSizes}
            className={
              imageClassName ??
              "object-cover object-center transition-transform duration-300 group-hover:scale-105"
            }
          />
        </div>

        <Image
          src="/gold-frame-greek.png"
          alt=""
          fill
          sizes={imageSizes}
          className="pointer-events-none absolute inset-0 z-10 object-contain"
        />
      </div>

      <h3 className={nameClassName}>{speaker.name}</h3>
      <p className={titleClassName}>{speaker.title}</p>
    </a>
  );
}
function AnimatedSpeakerTrack({
  items,
  speed = 20,
  reverse = false,
  pauseOnHover = false,
  gapClassName,
  cardWidthClassName,
  frameClassName,
  imageSizes,
  nameClassName,
  titleClassName,
  imageClassName,
}: {
  items: typeof speakers;
  speed?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  gapClassName: string;
  cardWidthClassName: string;
  frameClassName: string;
  imageSizes: string;
  nameClassName: string;
  titleClassName: string;
  imageClassName?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const positionRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const initializedRef = useRef(false);
  const displayItems = [
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
    ...items,
  ];

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const animate = (time: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = time;
      }

      const delta = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      if (track.scrollWidth > 0) {
        const setWidth = track.scrollWidth / 6;

        if (!initializedRef.current) {
          if (reverse) {
            positionRef.current = -setWidth;
          } else {
            positionRef.current = 0;
          }
          initializedRef.current = true;
        }

        if (!pausedRef.current) {
          if (reverse) {
            positionRef.current += speed * delta;
            if (positionRef.current >= 0) {
              positionRef.current -= setWidth;
            }
          } else {
            positionRef.current -= speed * delta;
            if (positionRef.current <= -setWidth) {
              positionRef.current += setWidth;
            }
          }

          track.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [items, speed, reverse]);

  return (
    <div
      className="relative min-w-0 w-full overflow-hidden"
      onMouseEnter={() => {
        if (pauseOnHover) pausedRef.current = true;
      }}
      onMouseLeave={() => {
        if (pauseOnHover) {
          pausedRef.current = false;
          lastTimeRef.current = null;
        }
      }}
    >
      <div
        ref={trackRef}
        className={`flex w-max items-start ${gapClassName}`}
        style={{ willChange: "transform" }}
      >
        {displayItems.map((speaker, index) => (
          <SpeakerCard
            key={`${speaker.id}-${index}`}
            speaker={speaker}
            cardClassName={`${cardWidthClassName} flex-none`}
            frameClassName={frameClassName}
            imageSizes={imageSizes}
            nameClassName={nameClassName}
            titleClassName={titleClassName}
            imageClassName={imageClassName}
          />
        ))}
      </div>
    </div>
  );
}
export default function SpeakerCarousel() {
  const mid = Math.ceil(speakers.length / 2);
  const rowOneSpeakers = speakers.slice(0, mid);
  const rowTwoSpeakers = speakers.slice(mid);

  return (
    <div className="relative flex min-h-0 w-full flex-col items-center justify-center overflow-hidden lg:items-start lg:mt-0">
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
      <h2 className=" font-norse mb-1.5 shrink-0 text-center font-extrabold uppercase tracking-[0.24em] text-[#F6CC60] text-[clamp(0.88rem,2.2svh,1.15rem)] sm:mb-2 sm:text-[clamp(0.98rem,2.3svh,1.25rem)] md:mb-2.5 md:text-[clamp(1.08rem,2.4svh,1.4rem)] lg:mb-3 lg:text-[clamp(1.5rem,3.2svh,2.4rem)] lg:text-left">
        Past Speakers
      </h2>
      </div>
      <div className="flex min-h-0 w-full flex-col justify-center gap-2 overflow-hidden sm:gap-3 md:gap-3.5 lg:hidden">
        <AnimatedSpeakerTrack
          items={rowOneSpeakers}
          speed={18}
          gapClassName="gap-3.5 xs:gap-4.5 sm:gap-5.5 md:gap-6"
          cardWidthClassName="w-[82px] xs:w-[90px] sm:w-[102px] md:w-[114px]"
          frameClassName="mx-auto h-[52px] w-[52px] xs:h-[58px] xs:w-[58px] sm:h-[66px] sm:w-[66px] md:h-[74px] md:w-[74px]"
          imageSizes="(max-width: 1024px) 82px, 114px"
          nameClassName="font-lora mt-0.5 w-full text-[8px] xs:text-[8.5px] sm:text-[9.5px] md:text-[10.5px] font-semibold leading-[1.15] tracking-wide text-white text-center line-clamp-1 sm:mt-1"
          titleClassName="font-lora mt-0.5 w-full text-[6.8px] xs:text-[7.2px] sm:text-[8px] md:text-[9px] leading-[1.15] tracking-[0.01em] text-[#F6CC60]/75 text-center line-clamp-1 block"
        />

        <AnimatedSpeakerTrack
          items={rowTwoSpeakers}
          speed={16}
          reverse
          gapClassName="gap-3.5 xs:gap-4.5 sm:gap-5.5 md:gap-6"
          cardWidthClassName="w-[82px] xs:w-[90px] sm:w-[102px] md:w-[114px]"
          frameClassName="mx-auto h-[52px] w-[52px] xs:h-[58px] xs:w-[58px] sm:h-[66px] sm:w-[66px] md:h-[74px] md:w-[74px]"
          imageSizes="(max-width: 1024px) 82px, 114px"
          nameClassName="font-lora mt-0.5 w-full text-[8px] xs:text-[8.5px] sm:text-[9.5px] md:text-[10.5px] font-semibold leading-[1.15] tracking-wide text-white text-center line-clamp-1 sm:mt-1"
          titleClassName="font-lora mt-0.5 w-full text-[6.8px] xs:text-[7.2px] sm:text-[8px] md:text-[9px] leading-[1.15] tracking-[0.01em] text-[#F6CC60]/75 text-center line-clamp-1 block"
        />
      </div> 
         <div className="hidden min-h-0 w-full lg:block">
        <AnimatedSpeakerTrack
          items={speakers}
          speed={22}
          pauseOnHover
          gapClassName="gap-6 xl:gap-8 2xl:gap-10"
          cardWidthClassName="w-[clamp(120px,13svh,190px)] xl:w-[clamp(138px,14.5svh,215px)]"
          frameClassName="mx-auto h-[clamp(90px,11svh,150px)] w-[clamp(90px,11svh,150px)] xl:h-[clamp(104px,12.5svh,172px)] xl:w-[clamp(104px,12.5svh,172px)]"
          imageSizes="(min-width: 1024px) 190px, 240px"
          nameClassName="font-lora mt-2 w-full text-[clamp(12px,1.6svh,18px)] font-semibold leading-[1.25] tracking-wide text-white text-center line-clamp-2"
          titleClassName="font-lora mt-1 w-full text-[clamp(10px,1.3svh,14.5px)] leading-[1.25] tracking-[0.01em] text-[#F6CC60]/75 text-center line-clamp-2"
          imageClassName="object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    </div>
  );
}
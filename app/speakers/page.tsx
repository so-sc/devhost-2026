"use client";

import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Calendar,
  Clock,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ClippedButton } from "@/components/ClippedButton";

const speakers = [
  {
    id: 1,
    name: "Dr. Pruthviraj Umesh",
    title: "Associate Professor @ NITK",
    bio: "Dr. Pruthviraj U, Associate Professor at National Institute of Technology Karnataka Surathkal, leads transdisciplinary R&D integrating engineering, AI, and innovation, with 17+ years of experience and major contributions in structural analysis, disaster mitigation, and sustainable technologies.",
    img: "/speakers/dr-pruthviraj-nitk.jpeg",
    link: "https://www.linkedin.com/in/dr-pruthviraj-u?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    presence: {
      place: "DevTalk",
      time: "6th November 2025, 10:30am - 11:15am",
    },
  },
  {
    id: 2,
    name: "N. Ananthakrishnan Potti",
    title: "Leading Security Operations @ OLA",
    bio: "Security Operations Engineer II at OLA with expertise in threat detection, incident response, and cloud security. A certified ethical hacker and mentor under Kerala Startup Mission, passionate about cybersecurity education.",
    img: "/speakers/potti.jpg",
    link: "https://www.linkedin.com/in/ananthakrishnanpotti/",
    presence: { place: "DevTalk", time: "7th November 2025, 9:00am - 9:45am" },
  },
  {
    id: 3,
    name: "Aakansha Doshi",
    title: "Open Source Enthusiast",
    bio: "Aakansha is a Principal Software Engineer at Prophecy and a passionate contributor to Free and Open Source Software (FOSS). She's a core maintainer of projects like Excalidraw, react-tags, and mermaid-to-excalidraw, and more libraries. She loves exploring the internals of the Web and JavaScript while mentoring and supporting the open-source community.",
    img: "/speakers/aakansha.jpeg",
    link: "https://www.linkedin.com/in/aa1992/",
    presence: {
      place: "DevTalk",
      time: "7th November 2025, 10:00am - 10:45am",
    },
  },
  {
    id: 4,
    name: "Charis Pinto",
    title: "Presales Solution Architect @ Niveus Solutions",
    bio: "Charis Pinto, a Cloud Associate at Niveus Solutions and Google Cloud Certified Professional, is a tech leader passionate about GenAI, web development, and fostering community learning through hackathons, open source, and research.",
    img: "/speakers/charis-devhost.jpeg",
    link: "https://www.linkedin.com/in/charispinto/",
    presence: {
      place: "Masterclass",
      time: "7th November 2025, 1:00pm - 4:00am",
    },
  },
  {
    id: 5,
    name: "Raj Raorane",
    title: "Co-Founder of Edgetributors",
    bio: "Raj Raorane, a blockchain developer and electronics engineer, contributes to Edgeware and the Polkadot ecosystem, building smart contracts and tools with Rust and Substrate while mentoring developers and advancing Web3 and DAO innovation.",
    img: "/speakers/Raj Raorane.jpeg",
    link: "https://www.linkedin.com/in/raj-raorane-45b2b4166/",
    presence: {
      place: "Masterclass",
      time: "6th November 2025, 1:30pm - 4:30pm",
    },
  },
  {
    id: 6,
    name: "Samwin Steve Pereira",
    title: "Solution Architect @ Niveus Solutions",
    bio: "Samwin Pereira, Presales  Data Modernization and AI at Niveus Solutions, is an AI and cloud developer passionate about Google Cloud, serverless tech, and community-driven learning through workshops and mentorship.",
    img: "/speakers/Samwin Steve Pereira.jpg",
    link: "https://www.linkedin.com/in/samwin-pereira-058417246/",
    presence: {
      place: "Masterclass",
      time: "7th November 2025, 1:00pm - 4:00am",
    },
  },
  {
    id: 7,
    name: "Raghu Anand",
    title: "Head of Technology L&D / Training @ EG/AS",
    bio: "Raghu Anand, Lead Technical Instructor at EG A/S, is an experienced tech educator specializing in software engineering, cloud, ML, and DevOps. A former learning leader at AlmaBetter, Apisero, and Edureka, he's guided thousands of developers through innovative, industry-aligned training and mentorship.",
    img: "/speakers/RaghuAnand.jpg",
    link: "https://www.linkedin.com/in/raghuanand16",
    presence: {
      place: "DevTalk",
      time: "6th November 2025, 11:30am - 12:15am",
    },
  },
  // {
  //   id: 4,
  //   name: "Vivek Keshore",
  //   title: "Software Architect @ EPAM Systems",
  //   bio: "Seasoned Python architect with 12+ years of experience in backend development and cloud architecture. A PyCon India speaker and open-source contributor, he specializes in FastAPI, Flask, and scalable systems.",
  //   img: "/speakers/vivek.jpg",
  //   link: "#",
  //   presence: {
  //     place: "Masterclass",
  //     time: "7th November 2025, 1:00pm - 4:00pm",
  //   },
  // },
];

export default function SpeakerPage() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const router = useRouter();

  const goTo = (nextIndex: number) => {
    if (nextIndex === index) return;
    setVisible(false);
    window.setTimeout(() => {
      setIndex(nextIndex);
      setVisible(true);
    }, 220);
  };

  const next = () => goTo((index + 1) % speakers.length);
  const prev = () => goTo((index - 1 + speakers.length) % speakers.length);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [index]);

  const speaker = speakers[index];
  const [datePart, timePart] = speaker.presence.time.split(",");

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#050403] text-white">
      {/* Parchment texture, matching the landing section */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url('/images/parchment-texture.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.8,
          mixBlendMode: "soft-light",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(246,204,96,.06),transparent_65%)]" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(246,204,96,.06),transparent_65%)]" />

      <div
        className="pointer-events-none absolute -top-20 right-[-60px] z-0 hidden h-[600px] w-[760px] opacity-[0.23] md:block"
        style={{
          backgroundImage: "url('/images/about-temple.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top right",
          filter: "grayscale(100%) contrast(0.8)",
          maskImage:
            "linear-gradient(to bottom, black 0%, rgba(0,0,0,0.75) 55%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, rgba(0,0,0,0.75) 55%, transparent 100%)",
        }}
      />
      {/* <div className="absolute top-5 left-5 z-10 h-10 w-10 border-t-2 border-l-2 border-[#F6CC60]/50" />
      <div className="absolute top-5 right-5 z-10 h-10 w-10 border-t-2 border-r-2 border-[#F6CC60]/50" />
      <div className="absolute bottom-5 left-5 z-10 h-10 w-10 border-b-2 border-l-2 border-[#F6CC60]/50" />
      <div className="absolute right-5 bottom-5 z-10 h-10 w-10 border-r-2 border-b-2 border-[#F6CC60]/50" /> */}

      {/* 2. BACK — small, standalone, top-left. No header bar, no border box. */}
      <button
        onClick={() => router.push("/")}
        className="text-s absolute top-5 left-5 z-30 flex items-center gap-2 tracking-[0.2em] text-[#F6CC60]/80 uppercase transition-colors hover:text-[#F6CC60] focus-visible:ring-1 focus-visible:ring-[#F6CC60] focus-visible:outline-none md:top-8 md:left-8"
      >
        <ChevronLeft size={14} />
        Back
      </button>

      {/* Main content */}
      <div className="relative z-10 mx-auto flex w-[90%] max-w-6xl flex-col-reverse items-center gap-10 pt-40 pb-8 md:min-h-[75vh] md:flex-row md:items-center md:justify-between md:gap-16 md:pt-16 md:pb-0">
        {/* Text column */}
        <div
          className={`flex-1 text-center transition-all duration-300 ease-out md:translate-y-10 md:text-left ${
            visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          <span className="font-norse text-s tracking-[0.35em] text-[#F6CC60] uppercase">
            {speaker.presence.place}
          </span>

          <h1 className="font-norse-bold mt-3 text-4xl leading-[1.05] font-extrabold tracking-[0.02em] uppercase sm:text-5xl md:text-6xl">
            <span className="bg-gradient-to-r from-[#F6CC60] via-[#FFF5D0] to-[#C9963E] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(246,204,96,0.25)]">
              {speaker.name}
            </span>
          </h1>

          <p className="font-norse text-s mt-2 tracking-[0.3em] text-zinc-400 uppercase md:text-sm">
            {speaker.title}
          </p>
          <p
            className="mt-6 max-w-xl text-center text-sm leading-relaxed tracking-[0.02em] text-white/80 sm:text-base sm:leading-[1.75] sm:tracking-[0.03em] md:text-left"
            style={{
              textShadow:
                "0 1px 1px rgba(0,0,0,.7),0 0 12px rgba(246,204,96,.08)",
            }}
          >
            {speaker.bio}
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 text-xs text-zinc-400 sm:flex-row sm:gap-6 md:justify-start">
            <span className="flex items-center gap-2">
              <Calendar size={14} className="text-[#F6CC60]" />
              {datePart}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={14} className="text-[#F6CC60]" />
              {timePart?.trim()}
            </span>
          </div>

          <div className="mt-8 flex justify-center md:justify-start">
            <ClippedButton
              onClick={() => window.open(speaker.link, "_blank")}
              className="px-6 py-3 text-sm"
            >
              View Profile <ExternalLink size={14} />
            </ClippedButton>
          </div>
        </div>

        {/* Portrait medallion */}
        <div
          className={`relative flex flex-shrink-0 translate-y-10 items-center justify-center transition-all duration-300 ease-out ${
            visible ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          <div className="relative h-64 w-64 sm:h-80 sm:w-80 md:h-[26rem] md:w-[26rem]">
            {/* dark contrast buffer directly behind the ring, on top of the temple */}
            <div
              className="absolute inset-[2%] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(5,4,3,0.75) 55%, rgba(5,4,3,0) 78%)",
              }}
            />

            {/* Slow-turning gold seal ring */}
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 h-full w-full animate-[spin_50s_linear_infinite] motion-reduce:animate-none"
            >
              <circle
                cx="50"
                cy="50"
                r="47"
                fill="none"
                stroke="#F6CC60"
                strokeOpacity="0.35"
                strokeWidth="0.6"
                strokeDasharray="2 4"
              />
            </svg>

            {/* Portrait — strongest element on the right */}
            <div className="absolute inset-[6%] overflow-hidden rounded-full border-2 border-[#F6CC60]/70 bg-[#101007] shadow-[0_10px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(246,204,96,0.12)]">
              <Image
                src={speaker.img}
                alt={speaker.name}
                fill
                className="object-cover"
                draggable={false}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Side navigation */}
      <button
        onClick={prev}
        aria-label="Previous speaker"
        className="absolute top-1/2 left-4 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#F6CC60]/45 bg-[#050403]/40 text-[#F6CC60]/80 backdrop-blur-sm transition-all duration-200 hover:border-[#F6CC60] hover:bg-[#F6CC60]/10 hover:text-[#F6CC60] focus-visible:ring-1 focus-visible:ring-[#F6CC60] focus-visible:outline-none md:left-8 md:h-12 md:w-12"
      >
        <ChevronLeft size={20} strokeWidth={1.5} />
      </button>

      <button
        onClick={next}
        aria-label="Next speaker"
        className="absolute top-1/2 right-4 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#F6CC60]/45 bg-[#050403]/40 text-[#F6CC60]/80 backdrop-blur-sm transition-all duration-200 hover:border-[#F6CC60] hover:bg-[#F6CC60]/10 hover:text-[#F6CC60] focus-visible:ring-1 focus-visible:ring-[#F6CC60] focus-visible:outline-none md:right-8 md:h-12 md:w-12"
      >
        <ChevronRight size={20} strokeWidth={1.5} />
      </button>
    </div>
  );
}

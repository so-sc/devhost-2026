"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import DecryptText from "./animated/TextAnimation";

type GalleryProps = {
  images?: string[];
};

const IMAGES = [
  "/images/IMG_1.jpg",
  "/images/IMG_2.webp",
  "/images/IMG_3.webp",
  "/images/IMG_4.webp",
  "/images/IMG_5.webp",
  "/images/IMG_6.webp",
  "/images/IMG_7.webp",
  "/images/IMG_8.webp",
  "/images/IMG_9.webp",
  "/images/IMG_10.webp",
  "/images/IMG_11.webp",
  "/images/IMG_12.webp",
  "/images/IMG_13.webp",
  "/images/IMG_14.webp",
  "/images/IMG_15.webp",
  "/images/IMG_16.webp",
  "/images/IMG_17.webp",
  "/images/IMG_18.webp",
];

export default function Gallery({ images = IMAGES }: GalleryProps) {
  const safeImages = images.length ? images : IMAGES;

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Split images into two rows for dual flowing streams
  const row1Images = [...safeImages, ...safeImages];
  const row2Images = [
    ...safeImages.slice(6),
    ...safeImages.slice(0, 6),
    ...safeImages.slice(6),
    ...safeImages.slice(0, 6),
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        },
      );

      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <style>{`
        .throwback-section {
          position: relative;
          isolation: isolate;
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          padding: 56px 0;
          background: #050403;
        }

        .marquee-rows-container {
          display: flex;
          flex-direction: column;
          gap: 24px;
          width: 100%;
          overflow: hidden;
          mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 10%,
            black 90%,
            transparent
          );
        }

        .marquee-track-row {
          display: flex;
          align-items: center;
          gap: 20px;
          width: max-content;
          will-change: transform;
        }

        .marquee-left {
          animation: marqueeScrollLeft 38s linear infinite;
        }

        .marquee-right {
          animation: marqueeScrollRight 42s linear infinite;
        }

        @keyframes marqueeScrollLeft {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @keyframes marqueeScrollRight {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        .throwback-marquee-card {
          position: relative;
          flex-shrink: 0;
          width: clamp(180px, 22vw, 290px);
          aspect-ratio: 16 / 10;
          border-radius: 12px;
          overflow: hidden;
          border: 1.5px solid rgba(246, 204, 96, 0.4);
          background:
            radial-gradient(circle at 50% 0%, rgba(246, 204, 96, 0.15), transparent 70%),
            #0d0b08;
          box-shadow:
            0 14px 38px rgba(0, 0, 0, 0.7),
            0 0 20px rgba(246, 204, 96, 0.12),
            inset 0 1px 1px rgba(255, 245, 208, 0.25);
          transition: transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease;
        }

        .throwback-card-img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          user-select: none;
          -webkit-user-drag: none;
          transition: transform 0.5s ease;
        }

        /* Golden Corner Rune Accents */
        .rune-corner {
          position: absolute;
          width: 10px;
          height: 10px;
          border-color: #f6cc60;
          border-style: solid;
          pointer-events: none;
          z-index: 10;
          opacity: 0.8;
        }
        .rune-tl { top: 5px; left: 5px; border-width: 2px 0 0 2px; }
        .rune-tr { top: 5px; right: 5px; border-width: 2px 2px 0 0; }
        .rune-bl { bottom: 5px; left: 5px; border-width: 0 0 2px 2px; }
        .rune-br { bottom: 5px; right: 5px; border-width: 0 2px 2px 0; }

        @media (max-width: 640px) {
          .throwback-section { padding: 36px 0; }
          .marquee-rows-container { gap: 16px; }
          .throwback-marquee-card {
            width: clamp(150px, 52vw, 210px);
            aspect-ratio: 16 / 10;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="throwback-section"
        aria-label="Throwback photo gallery"
      >
        {/* PARCHMENT BACKGROUND & GLOW */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: "url('/images/parchment-texture.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.5,
            mixBlendMode: "soft-light",
          }}
        />

        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(246,204,96,0.08),transparent_70%)]" />

        {/* SECTION HEADER */}
        <div ref={titleRef} className="relative z-10 mb-8 text-center sm:mb-12">
          <h2 className="font-norse-bold mb-2 text-6xl font-extrabold tracking-[0.12em] uppercase md:text-8xl">
            <span className="bg-gradient-to-r from-[#F6CC60] via-[#FFF5D0] to-[#C9963E] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(246,204,96,0.3)]">
              throwback
            </span>
          </h2>
          <h3>
            <DecryptText
              text="Echoes from the halls of Devhost 2025"
              startDelayMs={200}
              trailSize={6}
              flickerIntervalMs={50}
              revealDelayMs={100}
              className="font-norse text-lg font-semibold tracking-[0.10em] text-[#C8A24C]/80 sm:tracking-[0.14em] md:text-2xl"
            />
          </h3>
        </div>

        {/* DUAL AUTOMATIC SMOOTH INFINITE FLOWING STREAMS */}
        <div
          ref={containerRef}
          className="marquee-rows-container relative z-10"
        >
          {/* ROW 1: FLOWS LEFT */}
          <div className="marquee-track-row marquee-left">
            {row1Images.map((src, index) => (
              <div key={`r1-${index}`} className="throwback-marquee-card">
                <div className="rune-corner rune-tl" />
                <div className="rune-corner rune-tr" />
                <div className="rune-corner rune-bl" />
                <div className="rune-corner rune-br" />

                <Image
                  src={src}
                  alt={`Devhost throwback memory ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 52vw, (max-width: 1024px) 25vw, 290px"
                  className="throwback-card-img"
                  draggable={false}
                  priority={index < 4}
                />
              </div>
            ))}
          </div>

          {/* ROW 2: FLOWS RIGHT */}
          <div className="marquee-track-row marquee-right">
            {row2Images.map((src, index) => (
              <div key={`r2-${index}`} className="throwback-marquee-card">
                <div className="rune-corner rune-tl" />
                <div className="rune-corner rune-tr" />
                <div className="rune-corner rune-bl" />
                <div className="rune-corner rune-br" />

                <Image
                  src={src}
                  alt={`Devhost throwback memory ${index + 1}`}
                  fill
                  sizes="(max-width: 640px) 52vw, (max-width: 1024px) 25vw, 290px"
                  className="throwback-card-img"
                  draggable={false}
                  priority={index < 4}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

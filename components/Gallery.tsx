"use client";

import { useEffect, useState } from "react";

const images = [
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
];

export default function Gallery() {
  const [active, setActive] = useState(2);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getPosition = (index: number) => {
    let diff = index - active;

    if (diff > images.length / 2) {
      diff -= images.length;
    }

    if (diff < -images.length / 2) {
      diff += images.length;
    }

    return diff;
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#050403] py-18 sm:py-24">
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url('/images/parchment-texture.jpg')",
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          opacity: 0.6,
          mixBlendMode: "soft-light",
        }}
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(246,204,96,.07),transparent_65%)]" />

      {/* CONTENT */}
      <div
        className="
          relative mx-auto
          flex w-full
          flex-col
          items-center
          gap-4
          px-4
          sm:px-8
          md:items-center
          md:gap-4
          md:px-10
          lg:px-16
          xl:px-24
        "
      >
        {/* TITLE */}
        <div className="relative mb-4 text-center sm:mb-6">
          <h2 className="font-norse-bold mb-2 text-6xl font-extrabold tracking-[0.12em] uppercase md:text-8xl">
            <span className="bg-gradient-to-r from-[#F6CC60] via-[#FFF5D0] to-[#C9963E] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(246,204,96,0.3)]">
              throwback
            </span>
          </h2>
        </div>

        {/* CAROUSEL */}
        <div
          className="
            relative
            h-[320px]
            w-full
            min-w-0
            overflow-hidden
            sm:h-[350px]
            md:h-[350px]

          "
        >
          {images.map((src, index) => {
            const position = getPosition(index);

            if (Math.abs(position) > 2) return null;

            const isActive = position === 0;

            return (
              <div
                key={src}
                className="absolute left-1/2 top-1/2"
                style={{
                  zIndex: 20 - Math.abs(position),

                  transform: `
                    translate(-50%, -50%)
                    translateX(
                      ${
                        position === 0
                          ? "0px"
                          : position === -1
                            ? "-170px"
                            : position === 1
                              ? "170px"
                              : position === -2
                                ? "-300px"
                                : "300px"
                      }
                    )
                    scale(
                      ${
                        position === 0
                          ? "1"
                          : position === -1 || position === 1
                            ? "0.82"
                            : "0.68"
                      }
                    )
                  `,

                  opacity: position === 0 ? 1 : 0.9,

                  transition:
                    "transform 900ms cubic-bezier(0.22, 1, 0.36, 1), opacity 700ms ease",
                }}
              >
                {/* GOLD BORDER */}
                <div
                  className={`
                    rounded-[10px]
                    border
                    border-[#C9A45C]
                    bg-[#C9A45C]/10
                    p-[2px]
                    transition-all
                    duration-700
                    ${
                      isActive
                        ? "shadow-[0_8px_30px_rgba(201,164,92,0.25)]"
                        : "shadow-[0_5px_15px_rgba(0,0,0,0.12)]"
                    }
                  `}
                >
                  <div className="relative h-[240px] w-[180px] overflow-hidden rounded-[8px] bg-black sm:h-[270px] sm:w-[205px] md:h-[280px] md:w-[210px]">
                    <img
                      src={src}
                      alt={`Gallery image ${index + 1}`}
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type GalleryProps = {
  images?: string[];
  height?: number | string;
  speed?: number;
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
];

const DEFAULT_RATIO = 1;

export default function Gallery({
  images = IMAGES,
  height = "clamp(380px, 46vh, 480px)",
  speed = 0.0001,
}: GalleryProps) {
  const safeImages = images.length ? images : IMAGES;

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const angleRef = useRef(0);
  const pausedRef = useRef(false);
  const renderRef = useRef<((angle: number) => void) | null>(null);

  const [ratios, setRatios] = useState<Record<number, number>>({});
  const ratiosRef = useRef<Record<number, number>>({});

  const sunRef = useRef<HTMLDivElement>(null);
  const templeRef = useRef<HTMLDivElement>(null);
  const shieldDesktopRef = useRef<HTMLDivElement>(null);
  const shieldMobileRef = useRef<HTMLDivElement>(null);

  const repeatedIndexes = useMemo(() => {
    const copies = 4;
    const total = safeImages.length * copies;
    return Array.from(
      { length: total },
      (_, index) => index - Math.floor(total / 2),
    );
  }, [safeImages.length]);

  const panelImageIndexes = useMemo(
    () =>
      repeatedIndexes.map(
        (logicalIndex) =>
          ((logicalIndex % safeImages.length) + safeImages.length) %
          safeImages.length,
      ),
    [repeatedIndexes, safeImages.length],
  );

  const galleryHeight = typeof height === "number" ? `${height}px` : height;

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });

      intro
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power4.out" },
        )
        .fromTo(
          galleryRef.current,
          { opacity: 0, y: 45 },
          { opacity: 1, y: 0, duration: 1.15, ease: "power4.out" },
          "-=0.5",
        );

      gsap.to(sunRef.current, {
        rotate: 360,
        duration: 30,
        repeat: -1,
        ease: "none",
      });

      gsap.to(templeRef.current, {
        y: -90,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      [shieldDesktopRef.current, shieldMobileRef.current].forEach((shield) => {
        if (!shield) return;

        gsap.to(shield, {
          y: -10,
          rotation: 2,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(shield, {
          x: 5,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, sectionRef);

    return () => context.revert();
  }, []);

  // Measure every image's real aspect ratio exactly once.
  useEffect(() => {
    let cancelled = false;
    const collected: Record<number, number> = {};
    let remaining = safeImages.length;

    const flush = () => {
      if (cancelled) return;
      ratiosRef.current = { ...ratiosRef.current, ...collected };
      setRatios({ ...ratiosRef.current });
      renderRef.current?.(angleRef.current);
    };

    safeImages.forEach((src, imageIndex) => {
      const el = document.createElement("img");
      el.src = src;

      const done = () => {
        if (cancelled) return;
        if (el.naturalWidth && el.naturalHeight) {
          collected[imageIndex] = el.naturalWidth / el.naturalHeight;
        }
        remaining -= 1;
        if (remaining === 0) flush();
      };

      if (el.complete && el.naturalWidth) {
        done();
      } else {
        el.addEventListener("load", done, { once: true });
        el.addEventListener("error", done, { once: true });
      }
    });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeImages.join("|")]);

  // Carousel geometry + animation loop
  useEffect(() => {
    const gallery = galleryRef.current;
    const panels = panelRefs.current;

    if (!gallery || panels.length === 0) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const render = (angle: number) => {
      const width = gallery.clientWidth;
      const galleryHeightPx = gallery.clientHeight;

      const radius = Math.max(520, width * 0.72);

      const angleStep = width < 640 ? 0.19 : width < 900 ? 0.155 : 0.135;

      const panelHeight = Math.min(Math.max(galleryHeightPx * 0.66, 130), 300);

      panels.forEach((panel, index) => {
        if (!panel) return;

        const logicalIndex = repeatedIndexes[index];
        const theta = logicalIndex * angleStep + angle;

        const x = Math.sin(theta) * radius;
        const z = radius * (1 - Math.cos(theta));
        const yaw = (-theta * 180) / Math.PI;
        const y = (1 - Math.cos(theta)) * 18 - 6;

        const wrapped = Math.abs(Math.atan2(Math.sin(theta), Math.cos(theta)));

        const edgeFade =
          wrapped > 1.28 ? Math.max(0, 1 - (wrapped - 1.28) / 0.42) : 1;

        const imageIndex = panelImageIndexes[index];
        const ratio = ratiosRef.current[imageIndex] ?? DEFAULT_RATIO;
        const panelWidth = panelHeight * ratio;

        panel.style.width = `${panelWidth.toFixed(2)}px`;
        panel.style.height = `${panelHeight.toFixed(2)}px`;
        panel.style.opacity = edgeFade.toFixed(3);

        panel.style.transform = `
          translate3d(
            calc(-50% + ${x.toFixed(2)}px),
            calc(-50% + ${y.toFixed(2)}px),
            ${z.toFixed(2)}px
          )
          rotateY(${yaw.toFixed(2)}deg)
        `;

        panel.style.zIndex = String(Math.round((Math.cos(theta) + 1) * 100));
      });
    };

    renderRef.current = render;

    if (reducedMotion.matches) {
      angleRef.current = 0;
      render(0);
      return;
    }

    let frame = 0;
    let previous = performance.now();

    const animate = (time: number) => {
      const delta = Math.min(50, time - previous);
      previous = time;

      if (!pausedRef.current) {
        angleRef.current += delta * speed;
      }

      render(angleRef.current);

      frame = requestAnimationFrame(animate);
    };

    render(angleRef.current);
    frame = requestAnimationFrame(animate);

    const resizeObserver = new ResizeObserver(() => {
      render(angleRef.current);
    });

    resizeObserver.observe(gallery);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
    };
  }, [repeatedIndexes, panelImageIndexes, speed, ratios]);

  return (
    <>
      <style>{`
        .throwback-section {
          position: relative;
          isolation: isolate;
          width: 100%;
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          padding: 32px 0;
          background: #050400;
        }

        .throwback-title {
          margin: 0 0 35px;
          text-align: center;
          font-size: clamp(2.4rem, 8vw, 6rem);
          line-height: 0.85;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          font-weight: 800;
          color: transparent;
          background:
            linear-gradient(110deg, #a96f1d 0%, #f5cd69 27%, #fff5d0 50%, #d39b3c 76%, #8c5817 100%);
          background-clip: text;
          -webkit-background-clip: text;
          text-shadow:
            0 2px 0 rgba(255, 246, 208, 0.12),
            0 10px 30px rgba(198, 142, 45, 0.12);
        }

        .throwback-frame {
          position: relative;
          width: 100%;
          max-width: 1500px;
          margin: 0 auto;
        }

        .throwback-gallery {
          position: relative;
          width: 100%;
          height: var(--gallery-height);
          overflow: hidden;
          isolation: isolate;
          perspective: 1550px;
          perspective-origin: 50% 47%;
         
        }

        .throwback-gallery::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 30;
          pointer-events: none;
        
        }

        .throwback-gallery::after {
          content: "";
          position: absolute;
          left: -10%;
          right: -10%;
          top: -46px;
          height: 70px;
          z-index: 40;
          pointer-events: none;
         
        }

        .throwback-stage,
        .throwback-track {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
        }

        .throwback-panel {
          position: absolute;
          top: 50%;
          left: 50%;
          transform-style: preserve-3d;
          transform-origin: center center;
          will-change: transform, opacity;
          pointer-events: auto;
        }

        .throwback-image-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border: 1px solid rgba(227, 184, 93, 0.26);
          background:
            linear-gradient(145deg, rgba(255, 255, 255, 0.045), transparent 35%),
            #0d0b08;
          box-shadow:
            0 18px 42px rgba(0, 0, 0, 0.36),
            inset 0 1px 0 rgba(255, 247, 216, 0.08);
          backface-visibility: hidden;
        }

        .throwback-image {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          user-select: none;
          -webkit-user-drag: none;
          backface-visibility: hidden;
        }

        .throwback-bottom-mask {
          position: absolute;
          left: -10%;
          right: -10%;
          bottom: -46px;
          height: 70px;
          z-index: 40;
          pointer-events: none;
          background: linear-gradient(to top, rgba(5, 4, 3, 0.62), rgba(5, 4, 3, 0.3) 55%, transparent);
          border-radius: 50% 50% 0 0 / 100% 100% 0 0;
        }

        .throwback-transition {
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 50;
          height: 90px;
          pointer-events: none;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(5, 4, 3, 0.4) 30%,
            rgba(13, 13, 13, 0.85) 75%,
            #0d0d0d 100%
          );
        }

        @media (max-width: 900px) {
          .throwback-section { padding: 24px 0; }
          .throwback-title { margin-bottom: 16px; }
          .throwback-gallery { perspective: 1250px; }
        }

        @media (max-width: 640px) {
          .throwback-section { padding: 20px 0; }
          .throwback-title { margin-bottom: 14px; letter-spacing: 0.075em; }
          .throwback-gallery { perspective: 1050px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .throwback-panel { will-change: auto; }
        }
      `}</style>

      <section
        ref={sectionRef}
        className="throwback-section"
        aria-label="Throwback photo gallery"
      >
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

        <div
          ref={templeRef}
          className="pointer-events-none absolute top-10 right-0 z-[1] hidden w-[280px] lg:block xl:w-[380px]"
        >
          <Image
            src="/images/about-temple.png"
            alt=""
            width={1100}
            height={1100}
            className="h-auto w-full object-contain opacity-[0.13] select-none"
            style={{ objectPosition: "top right" }}
          />
        </div>

        <div
          ref={sunRef}
          className="pointer-events-none absolute top-[-30px] left-1/2 z-[1] hidden w-[180px] -translate-x-1/2 sm:block md:w-[240px]"
        >
          <Image
            src="/images/sun-graphic.svg"
            alt=""
            width={400}
            height={400}
            className="h-auto w-full object-contain opacity-[0.12] select-none"
          />
        </div>

        <div
          ref={shieldDesktopRef}
          className="pointer-events-none absolute bottom-[-35px] left-0 z-[1] hidden w-[220px] lg:block xl:w-[260px]"
        >
          <Image
            src="/images/mythic_spartan_shield.webp"
            alt=""
            width={600}
            height={800}
            className="h-auto w-full object-contain opacity-[0.18] select-none"
            style={{ objectPosition: "bottom left" }}
          />
        </div>

        <div
          ref={shieldMobileRef}
          className="pointer-events-none absolute bottom-[-35px] left-0 z-[1] block w-[120px] sm:w-[150px] lg:hidden"
        >
          <Image
            src="/images/mythic_spartan_shield.webp"
            alt=""
            width={600}
            height={800}
            className="h-auto w-full object-contain opacity-[0.10] select-none"
            style={{ objectPosition: "bottom left" }}
          />
        </div>

        <h2
          ref={titleRef}
          className="throwback-title font-norse-bold relative z-10"
        >
          throwback
        </h2>

        <div
          ref={galleryRef}
          className="throwback-frame relative z-10"
          style={{ "--gallery-height": galleryHeight } as React.CSSProperties}
        >
          <div className="throwback-gallery">
            <div className="throwback-stage">
              <div className="throwback-track">
                {repeatedIndexes.map((logicalIndex, index) => {
                  const imageIndex = panelImageIndexes[index];

                  return (
                    <div
                      key={`${logicalIndex}-${imageIndex}`}
                      ref={(node) => {
                        panelRefs.current[index] = node;
                      }}
                      className="throwback-panel"
                      aria-hidden="true"
                      onPointerEnter={() => {
                        pausedRef.current = true;
                      }}
                      onPointerLeave={() => {
                        pausedRef.current = false;
                      }}
                    >
                      <div className="throwback-image-wrap">
                        <Image
                          src={safeImages[imageIndex]}
                          alt=""
                          fill
                          sizes="(max-width: 640px) 42vw, (max-width: 900px) 30vw, 400px"
                          className="throwback-image"
                          draggable={false}
                          priority={index < 6}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="throwback-bottom-mask" />
          </div>
        </div>

        <div className="throwback-transition" />
      </section>
    </>
  );
}

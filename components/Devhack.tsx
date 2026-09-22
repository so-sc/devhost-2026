"use client";

import { useRef } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import Button from "./Button";
import EmberCanvas, { type EmberCanvasHandle } from "./EmberCanvas";

const CLASH_Y = 40; // % from the top where the blades meet
const SWORD_W = "min(130vw, 1400px)";

/**
 * Centres its children on the clash point.
 * Layout does the centring, so transforms are animation-only.
 */
function Anchor({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 top-0 flex items-center justify-center overflow-visible ${className}`}
      style={{ height: `${CLASH_Y * 2}%` }}
    >
      {children}
    </div>
  );
}

// DevHack assets
const ASSETS = {
  pureBackground: "/assets/devhack/pure-background.webp",
  background: "/assets/devhack/background.webp",
  swordLeft: "/assets/devhack/leftarm.png",
  swordRight: "/assets/devhack/rightarm.png",
  title: "/assets/devhack/dev-hack-logo.svg",
};

export default function DevHackSection() {
  /*
   * IMPORTANT:
   * Use a normal HTMLElement ref for useScroll.
   * Do not use useAnimate() scope as the scroll target.
   */
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const embers = useRef<EmberCanvasHandle>(null);

  /*
   * Entire animation is controlled by scroll progress.
   *
   * The section itself remains exactly 100svh,
   * so the visual section/layout is unchanged.
   */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const impactTriggered = useRef(false);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const root = sectionRef.current;

    if (!root) return;

    /*
     * Helpers
     */
    const clamp = (value: number) => Math.min(1, Math.max(0, value));

    const range = (value: number, start: number, end: number) => {
      if (end === start) {
        return value >= end ? 1 : 0;
      }

      return clamp((value - start) / (end - start));
    };

    const smooth = (value: number) => {
      const x = clamp(value);
      return x * x * (3 - 2 * x);
    };

    const easeOut = (value: number) => {
      const x = clamp(value);
      return 1 - Math.pow(1 - x, 3);
    };

    const easeIn = (value: number) => {
      const x = clamp(value);
      return x * x * x;
    };

    /*
     * IMPORTANT:
     * This is now safely scoped to the actual section element.
     */
    const setStyle = (selector: string, styles: Record<string, string>) => {
      root.querySelectorAll<HTMLElement>(selector).forEach((element) => {
        Object.assign(element.style, styles);
      });
    };

    /*
     * =========================================================
     * 1. TRANSITION OVERLAYS
     * =========================================================
     */
    setStyle(".js-darken", {
      opacity: String(easeIn(range(progress, 0, 0.15))),
    });

    setStyle(".js-bg-pure", {
      opacity: String(easeIn(range(progress, 0.05, 0.2))),
    });

    /*
     * =========================================================
     * 2. SWORDS
     * =========================================================
     *
     * LEFT:
     *   x: -100vw → -8vw
     *   y: 70 → 0
     *
     * RIGHT:
     *   x: 100vw → 8vw
     *   y: 70 → 0
     */
    const swordProgress = easeIn(range(progress, 0, 0.28));
    const leftX = -100 + 92 * swordProgress;

    const rightX = 100 - 92 * swordProgress;

    const swordY = 45 - 45 * swordProgress;
    const swordOpacity = easeOut(range(progress, 0, 0.05));
    /*
     * =========================================================
     * 3. IMPACT
     * =========================================================
     */

    /*
     * FLASH
     */
    let flashOpacity = 0;

    if (progress >= 0.27 && progress <= 0.34) {
      const p = range(progress, 0.27, 0.34);

      if (p < 0.15) {
        flashOpacity = p / 0.15;
      } else {
        flashOpacity = 1 - range(p, 0.15, 1);
      }
    }

    const flashScale =
      progress < 0.395
        ? 0.2
        : 0.2 + easeOut(range(progress, 0.395, 0.47)) * 1.6;

    setStyle(".js-flash", {
      opacity: String(clamp(flashOpacity)),
      transform: `scale(${flashScale})`,
    });

    /*
     * STREAK
     */
    const streakIn = smooth(range(progress, 0.28, 0.33));
    const streakOut = 1 - smooth(range(progress, 0.33, 0.38));
    setStyle(".js-streak", {
      opacity: String(streakIn * streakOut),
      transform: `scaleX(${streakIn})`,
    });

    /*
     * RING
     */
    const ringProgress = smooth(range(progress, 0.28, 0.42));
    const ringFade = 1 - smooth(range(progress, 0.28, 0.4));
    setStyle(".js-ring", {
      opacity: String(ringProgress * ringFade),
      transform: `scale(${0.15 + ringProgress * 3.05})`,
    });

    /*
     * SCREEN SHAKE
     */
    const mobile =
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 768px)").matches;

    const shakeK = mobile ? 0.6 : 1;

    const shakeProgress = range(progress, 0.28, 0.36);
    let shakeX = 0;
    let shakeY = 0;
    let shakeScale = 1;

    if (shakeProgress > 0 && shakeProgress < 1) {
      const decay = 1 - shakeProgress;

      shakeX = Math.sin(shakeProgress * Math.PI * 5) * 7 * shakeK * decay;

      shakeY = Math.cos(shakeProgress * Math.PI * 4) * 5 * shakeK * decay;

      shakeScale = 1 + Math.sin(shakeProgress * Math.PI) * 0.025 * shakeK;
    }

    setStyle(".js-stage", {
      transform: `translate3d(${shakeX}px, ${shakeY}px, 0) scale(${shakeScale})`,
    });

    /*
     * =========================================================
     * 4. SWORD RECOIL
     * =========================================================
     */
    const recoilProgress = range(progress, 0.28, 0.42);
    let recoilLeft = -6;
    let recoilRight = 6;

    if (recoilProgress > 0) {
      if (recoilProgress < 0.2) {
        const p = recoilProgress / 0.2;

        recoilLeft = -6 - 14 * p;

        recoilRight = 6 + 14 * p;
      } else {
        const p = easeOut(range(recoilProgress, 0.2, 1));

        recoilLeft = -20 + 14 * p;

        recoilRight = 20 - 14 * p;
      }
    }

    const recoilLeftVw = recoilLeft / 10;

    const recoilRightVw = recoilRight / 10;

    /*
     * =========================================================
     * 5. FINAL BACKGROUND + SWORD FADE
     * =========================================================
     */
    const finalBgProgress = smooth(range(progress, 0.5, 0.65));

    setStyle(".js-bg-final", {
      opacity: String(finalBgProgress),
    });

    const swordFade = 1 - smooth(range(progress, 0.52, 0.68));

    setStyle(".js-sword-l", {
      opacity: String(swordOpacity * swordFade),
      transform: `translate3d(${leftX + recoilLeftVw}vw, ${swordY}px, 0)`,
    });

    setStyle(".js-sword-r", {
      opacity: String(swordOpacity * swordFade),
      transform: `translate3d(${rightX + recoilRightVw}vw, ${swordY}px, 0)`,
    });

    /*
     * =========================================================
     * 6. TITLE GLOW
     * =========================================================
     */
    const glowIn = smooth(range(progress, 0.6, 0.72));

    const glowCool = smooth(range(progress, 0.72, 0.86));

    setStyle(".js-glow", {
      opacity: String(glowIn * (1 - glowCool * 0.5)),
      transform: `scale(${0.7 + glowIn * 0.45})`,
    });

    /*
     * =========================================================
     * 7. TITLE
     * =========================================================
     */
    const titleProgress = easeOut(range(progress, 0.62, 0.76));

    setStyle(".js-title-img", {
      opacity: String(titleProgress),

      transform: `translate3d(0, ${30 - 30 * titleProgress}px, 0) scale(${
        1.25 - 0.25 * titleProgress
      })`,

      filter: `blur(${14 - 14 * titleProgress}px)`,
    });

    /*
     * =========================================================
     * 8. DETAILS
     * =========================================================
     *
     * Three elements:
     *   1. heading
     *   2. description
     *   3. register button
     */
    const detailStarts = [0.74, 0.795, 0.85];

    const details = root.querySelectorAll<HTMLElement>(".js-detail");

    details.forEach((detail, index) => {
      const start = detailStarts[index] ?? 0.85;

      const detailProgress = easeOut(range(progress, start, start + 0.1));

      detail.style.opacity = String(detailProgress);

      detail.style.transform = `translate3d(0, ${20 - 20 * detailProgress}px, 0)`;
    });

    /*
     * =========================================================
     * 10. EXIT TRANSITION
     * =========================================================
     */
    const exitProgress = smooth(range(progress, 0.82, 1.0));
    setStyle(".js-exit", {
      opacity: String(exitProgress),
    });

    const embersFade = 1 - easeIn(range(progress, 0.85, 1.0));
    setStyle(".js-embers", {
      opacity: String(embersFade),
    });

    /*
     * =========================================================
     * 9. EMBERS
     * =========================================================
     *
     * Scroll triggers the collision once.
     * The actual particles continue running independently.
     */
    if (progress >= 0.28 && !impactTriggered.current) {
      impactTriggered.current = true;

      embers.current?.burst({
        sparks: 120,
        embers: 90,
      });

      embers.current?.trickle(2.8, 45);
    }

    /*
     * Allow another collision after scrolling
     * sufficiently far backwards.
     */
    if (progress < 0.22) {
      impactTriggered.current = false;
    }
  });

  return (
    <div
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      className="relative h-[300vh] w-full"
    >
      <section
        id="devhack"
        className="pointer-events-none sticky top-0 h-screen w-full overflow-hidden bg-transparent text-white"
        style={{ height: "100svh" }}
      >
        {/*
         * The stage is what shakes on impact.
         * Background overhangs by 32px so the shake never shows an edge.
         */}
        <div className="js-stage absolute inset-0 will-change-transform">
          {/* BACKGROUNDS */}
          <div className="absolute inset-0" style={{ inset: "-32px" }}>
            <div className="js-darken absolute inset-0 bg-[#050201] opacity-0" />

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ASSETS.pureBackground}
              alt=""
              className="js-bg-pure absolute inset-0 h-full w-full object-cover opacity-0"
            />

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ASSETS.background}
              alt=""
              className="js-bg-final absolute inset-0 h-full w-full object-cover opacity-0"
            />

            {/* EXIT TRANSITION LAYER */}
            <div className="js-exit will-change-opacity pointer-events-none absolute inset-0 opacity-0">
              <div className="absolute inset-0 bg-[#050403]" />
              <div
                className="absolute inset-0 opacity-70 mix-blend-soft-light"
                style={{
                  backgroundImage: "url('/images/parchment-sponsor.jpg')",
                  backgroundSize: "700px auto",
                  backgroundRepeat: "repeat",
                }}
              />
            </div>
          </div>

          {/* SWORDS */}
          <Anchor className="z-20">
            <div
              className="js-sword-l shrink-0 will-change-transform"
              style={{
                width: SWORD_W,
                opacity: 0,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ASSETS.swordLeft}
                alt=""
                draggable={false}
                className="block h-auto w-full"
              />
            </div>
          </Anchor>

          <Anchor className="z-20">
            <div
              className="js-sword-r shrink-0 will-change-transform"
              style={{
                width: SWORD_W,
                opacity: 0,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ASSETS.swordRight}
                alt=""
                draggable={false}
                className="block h-auto w-full"
              />
            </div>
          </Anchor>

          {/* IMPACT FX */}
          <Anchor className="z-30">
            <div
              className="js-flash shrink-0 rounded-full"
              style={{
                width: "min(70vmin, 620px)",
                height: "min(70vmin, 620px)",
                opacity: 0,
                background:
                  "radial-gradient(circle, rgba(255,250,230,1) 0%, rgba(255,190,80,0.85) 22%, rgba(255,110,30,0.35) 50%, transparent 70%)",
              }}
            />
          </Anchor>

          <Anchor className="z-30">
            <div
              className="js-streak shrink-0"
              style={{
                width: "min(95vw, 1400px)",
                height: "3px",
                opacity: 0,
                background:
                  "linear-gradient(90deg, transparent, #fff, transparent)",
                boxShadow: "0 0 18px 4px rgba(255,190,90,0.8)",
              }}
            />
          </Anchor>

          <Anchor className="z-30">
            <div
              className="js-ring shrink-0 rounded-full"
              style={{
                width: "min(30vmin, 260px)",
                height: "min(30vmin, 260px)",
                opacity: 0,
                border: "2px solid rgba(255,214,140,0.8)",
              }}
            />
          </Anchor>

          {/* TITLE GLOW */}
          <Anchor className="z-[35]">
            <div
              className="js-glow shrink-0"
              style={{
                width: "min(92vw, 1100px)",
                height: "min(42vmin, 420px)",
                opacity: 0,
                background:
                  "radial-gradient(ellipse at center, rgba(255,150,40,0.55) 0%, rgba(255,100,20,0.2) 42%, transparent 70%)",
              }}
            />
          </Anchor>

          {/* TITLE */}
          <Anchor className="z-40 px-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ASSETS.title}
              alt="DEV HACK"
              className="js-title-img block h-auto w-full max-w-[800px] drop-shadow-2xl"
              style={{
                opacity: 0,
                filter: "blur(14px)",
              }}
              draggable={false}
            />
          </Anchor>

          {/* DETAILS */}
          <div
            className="pointer-events-none absolute inset-x-0 z-40 flex flex-col items-center px-5 text-center"
            style={{ top: "56%" }}
          >
            <p
              className="js-detail font-lora text-md mb-14 max-w-2xl leading-relaxed break-words text-white sm:text-lg sm:leading-[1.75] sm:tracking-[0.03em]"
              style={{ opacity: 0 }}
            >
              DevHack is the centre of DEVHOST. Teams get a problem statement,
              36 hours, and mentors who&apos;ve shipped actual products. What
              you build in that window is up to you.
            </p>

            <div
              className="js-detail pointer-events-auto"
              style={{ opacity: 0 }}
            >
              <Button
                onClick={() => {
                  window.location.href =
                    "https://forms.gle/your-devhack-register-link";
                }}
              >
                Register
              </Button>
            </div>
          </div>

          {/* EMBERS — above everything */}
          <EmberCanvas
            ref={embers}
            originX={0.5}
            originY={CLASH_Y / 100}
            className="js-embers pointer-events-none absolute inset-0 z-50 h-full w-full"
          />
        </div>
      </section>
    </div>
  );
}

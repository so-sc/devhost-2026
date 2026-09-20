// Devhack.tsx — DEV HACK intro
//
// ORDER (exactly as specified):
//   1. Pure background fades in and holds on its own
//   2. Left sword enters from the LEFT, right sword from the RIGHT, and clash in the middle
//   3. Impact: flash + shockwave + screen shake + live embers/sparks spreading out
//   4. Title reveals letter by letter, then the details reveal one after another
//
// Everything is ONE async sequence (each step awaits the previous), so nothing can fire early.
"use client";

import { useEffect, useRef } from "react";
import { useAnimate, stagger, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import EmberCanvas, { type EmberCanvasHandle } from "./EmberCanvas";

const CLASH_Y = 40; // % from the top where the blades meet (also where embers spawn)
const SWORD_W = "min(130vw, 1400px)";

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

const wait = (s: number) => new Promise((r) => setTimeout(r, s * 1000));

function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    if (!src) return resolve();
    const img = new window.Image();
    img.onload = img.onerror = () => resolve();
    img.src = src;
    img.decode?.().then(
      () => resolve(),
      () => resolve(),
    );
    setTimeout(resolve, 2500); // never block the intro on a slow image
  });
}

/** Centres its children on the clash point. Layout does the centring, so Framer only owns transforms. */
function Anchor({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 top-0 flex items-center justify-center ${className}`}
      style={{ height: `${CLASH_Y * 2}%` }}
    >
      {children}
    </div>
  );
}

/** Sword pointing RIGHT (hilt on the left). The right-hand sword is this same art mirrored. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function SwordArt({ uid }: { uid: string }) {
  return (
    <svg
      viewBox="0 0 1000 120"
      className="block h-auto w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${uid}-steel`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6f9fc" />
          <stop offset="0.48" stopColor="#c5cedb" />
          <stop offset="0.52" stopColor="#8c97a7" />
          <stop offset="1" stopColor="#4a5361" />
        </linearGradient>
        <linearGradient id={`${uid}-gold`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fde68a" />
          <stop offset="0.5" stopColor="#d9860a" />
          <stop offset="1" stopColor="#7c3a08" />
        </linearGradient>
      </defs>
      {/* blade */}
      <path
        d="M192 46 H905 L985 60 L905 74 H192 Z"
        fill={`url(#${uid}-steel)`}
      />
      <path
        d="M215 60 H890"
        stroke="#566070"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M192 46 H905 L985 60"
        fill="none"
        stroke="#fff"
        strokeWidth="1.5"
        opacity="0.85"
      />
      {/* cross-guard */}
      <rect
        x="168"
        y="12"
        width="26"
        height="96"
        rx="10"
        fill={`url(#${uid}-gold)`}
      />
      <circle cx="181" cy="12" r="9" fill={`url(#${uid}-gold)`} />
      <circle cx="181" cy="108" r="9" fill={`url(#${uid}-gold)`} />
      {/* grip */}
      <rect x="50" y="49" width="120" height="22" rx="5" fill="#2b140a" />
      {[62, 80, 98, 116, 134, 152].map((x) => (
        <path
          key={x}
          d={`M${x} 49 L${x + 9} 71`}
          stroke="#6b3a1c"
          strokeWidth="3"
        />
      ))}
      {/* pommel */}
      <circle cx="34" cy="60" r="17" fill={`url(#${uid}-gold)`} />
      <circle cx="34" cy="60" r="6" fill="#7c2d12" />
    </svg>
  );
}

// DevHack assets
const ASSETS = {
  pureBackground: "/assets/devhack/pure-background.svg",
  background: "/assets/devhack/background.svg",
  swordLeft: "/assets/devhack/left-arm.svg",
  swordRight: "/assets/devhack/right-arm.svg",
  title: "/assets/devhack/dev-hack-logo.svg",
};

export default function DevHackSection() {
  const [scope, animate] = useAnimate();
  const embers = useRef<EmberCanvasHandle>(null);
  const isInView = useInView(scope, { once: false, amount: 0 });

  useEffect(() => {
    if (!isInView) return;

    let cancelled = false;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const shakeK = mobile ? 0.6 : 1;

    const showFinal = () => {
      const o = { duration: 0 };
      animate(".js-bg-pure", { opacity: 1 }, o);
      animate(".js-bg-final", { opacity: 1 }, o);
      animate(".js-sword-l", { x: 0, y: 0, opacity: 0 }, o);
      animate(".js-sword-r", { x: 0, y: 0, opacity: 0 }, o);
      animate(".js-glow", { opacity: 0.5, scale: 1 }, o);
      animate(
        ".js-title-img",
        { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
        o,
      );
      animate(".js-detail", { opacity: 1, y: 0 }, o);
    };

    async function run() {
      // await Promise.all([
      //   preloadImage(ASSETS.pureBackground),
      //   preloadImage(ASSETS.background),
      //   preloadImage(ASSETS.title),
      // ]);
      // if (cancelled) return;
      // if (reduced) return showFinal();

      // ── 1. PURE BACKGROUND — fades up out of black, then holds alone for a beat ──
      await animate(
        ".js-bg-pure",
        { opacity: [0, 1] },
        { duration: 1.0, ease: "easeOut" },
      );
      if (cancelled) return;


      // ── 2. SWORDS — left from the left edge, right from the right edge, accelerating into the hit ──
      const fly = {
        duration: 0.9,
        ease: "easeIn" as const,
        opacity: {
          duration: 0.1,
          ease: "linear" as const,
        },
      };
      await Promise.all([
        animate(
          ".js-sword-l",
          {
            x: ["-100vw", "-8vw"],
            y: [70, 0],
            opacity: [0, 1],
          },
          fly,
        ),

        animate(
          ".js-sword-r",
          {
            x: ["100vw", "8vw"],
            y: [70, 0],
            opacity: [0, 1],
          },
          fly,
        ),
      ]);
      if (cancelled) return;

      // ── 3. IMPACT — everything fires on the same frame the blades meet ──
      embers.current?.burst({ sparks: 120, embers: 90 });
      embers.current?.trickle(2.8, 45);
      animate(
        ".js-flash",
        { opacity: [0, 1, 0], scale: [0.2, 1.3, 1.8] },
        { duration: 0.7, times: [0, 0.15, 1], ease: "easeOut" },
      );
      animate(
        ".js-streak",
        { opacity: [0, 1, 0], scaleX: [0, 1, 1.15] },
        { duration: 0.65, times: [0, 0.2, 1], ease: "easeOut" },
      );
      animate(
        ".js-ring",
        { opacity: [0.9, 0], scale: [0.15, 3.2] },
        { duration: 1.0, ease: [0.1, 0.7, 0.2, 1] },
      );

      await wait(0.02); // hit-stop: a tiny freeze makes the hit feel heavy
      if (cancelled) return;

      const sx = 7 * shakeK;
      const sy = 5 * shakeK;
      animate(
        ".js-stage",
        {
          x: [0, -sx, sx * 0.8, -sx * 0.6, sx * 0.4, 0],
          y: [0, sy, -sy, sy * 0.6, -sy * 0.3, 0],
          scale: [1, 1, 1, 1, 1, 1],
        },
        { duration: 0.7, ease: "easeOut" },
      );
      const recoil = {
        duration: 1.0,
        ease: "easeOut" as const,
        times: [0, 0.2, 1],
      };

      animate(
        ".js-sword-l",
        {
          x: [-6, -20, -6],
        },
        recoil,
      );

      animate(
        ".js-sword-r",
        {
          x: [6, 20, 6],
        },
        recoil,
      );
      // swords sink back and fade out completely as the final background fades in
      animate(
        ".js-bg-final",
        { opacity: [0, 1] },
        { duration: 1.2, delay: 0.4, ease: "easeInOut" },
      );
      animate(
        ".js-sword-l, .js-sword-r",
        { opacity: [1, 0] },
        { duration: 1.2, delay: 0.4, ease: "easeInOut" },
      );

      await wait(0.05); // let the impact breathe briefly before title
      if (cancelled) return;

      // ── 4. TITLE — letters ignite one after another; the glow cools as it settles ──
      animate(
        ".js-glow",
        { opacity: [0, 1, 0.5], scale: [0.7, 1.15, 1] },
        { duration: 1.6, times: [0, 0.3, 1], ease: "easeOut" },
      );
      await animate(
        ".js-title-img",
        {
          opacity: [0, 1],
          y: [30, 0],
          scale: [1.25, 1],
          filter: ["blur(14px)", "blur(0px)"],
        },
        { duration: 0.7, ease: EASE_OUT },
      );
      if (cancelled) return;

      // ── 5. DETAILS — tagline, description, button, in order ──
      animate(
        ".js-detail",
        { opacity: [0, 1], y: [20, 0] },
        {
          duration: 0.7,
          delay: stagger(0.25, { startDelay: 0.1 }),
          ease: EASE_OUT,
        },
      );
    }

    run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  return (
    <section
      ref={scope}
      id="devhack"
      className="relative h-screen w-full overflow-hidden bg-[#050201] text-white"
      style={{ height: "100svh" }}
    >
      {/* The stage is what shakes on impact. Background overhangs by 32px so the shake never shows an edge. */}
      <div className="js-stage absolute inset-0 will-change-transform">
        {/* BACKGROUNDS */}
        <div className="absolute inset-0" style={{ inset: "-32px" }}>
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
        </div>

        {/* SWORDS */}
        <Anchor className="z-20">
          <div
            className="js-sword-l shrink-0 will-change-transform"
            style={{ width: SWORD_W, opacity: 0 }}
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
            style={{ width: SWORD_W, opacity: 0 }}
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

        {/* TITLE GLOW (behind the title) */}
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
            style={{ opacity: 0, filter: "blur(14px)" }}
            draggable={false}
          />
        </Anchor>

        {/* DETAILS */}
        <div
          className="absolute inset-x-0 z-40 flex flex-col items-center px-5 text-center"
          style={{ top: "56%" }}
        >
          <p
            className="js-detail mb-3 font-serif text-[10px] tracking-[0.25em] text-white sm:text-xs md:text-sm"
            style={{ opacity: 0 }}
          >
            36 HOURS. REAL PROBLEMS. WORKING CODE.
          </p>
          <p
            className="js-detail mb-6 max-w-2xl font-serif text-xs leading-relaxed text-neutral-300 sm:text-sm md:text-base"
            style={{ opacity: 0 }}
          >
            DevHack is the centre of DEVHOST. Teams get a problem statement, 36
            hours, and mentors who&apos;ve shipped actual products. What you
            build in that window is up to you.
          </p>
          <div className="js-detail" style={{ opacity: 0 }}>
            <Link
              href="https://forms.gle/your-devhack-register-link"
              className="inline-block"
            >
              <Image
                src="/assets/devhack/register-plate.svg"
                alt="Register Now"
                width={250}
                height={80}
                className="w-[200px] transition-transform hover:scale-105 md:w-[250px]"
              />
            </Link>
          </div>
        </div>

        {/* EMBERS — above everything */}
        <EmberCanvas
          ref={embers}
          originX={0.5}
          originY={CLASH_Y / 100}
          className="pointer-events-none absolute inset-0 z-50 h-full w-full"
        />
      </div>
    </section>
  );
}

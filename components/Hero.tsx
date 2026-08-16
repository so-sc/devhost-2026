import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

// function SponsorLogo({ src, alt, height = 40, screenBlend = false, scale = 1, className = "", }: {
//   src: string
//   alt: string
//   height?: number
//   screenBlend?: boolean
//   scale?: number
//   className?: string
// }) {
//   return (
//     <div className={`flex items-center justify-center ${className}`} style={{ height: `${height}px` }}>
// <Image
//   src={src}
//   alt={alt}
//   width={80}
//   height={height * scale}
//   style={{
//     height: `${height * scale}px`,
//     width: "auto",
//     maxWidth: "120px",
//     objectFit: "contain",
//     mixBlendMode: screenBlend ? "screen" : "normal",
//     filter: screenBlend ? "brightness(1.1)" : "none",
//   }}
// />    </div>
//   )
// }

function StarField() {
  const [stars, setStars] = useState<
    {
      id: number;
      x: number;
      y: number;
      size: number;
      opacity: number;
      delay: number;
    }[]
  >([]);

  useEffect(() => {
    setStars(
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        delay: Math.random() * 4,
      })),
    );
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-[#e8c250]"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.opacity,
            animation: `shimmer-gold ${2 + s.delay}s ease-in-out infinite`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function GreekLetters() {
  const lettersRef = useRef<HTMLDivElement>(null);

  const letters = [
    { char: "Α", x: 5, y: 12, size: 64, opacity: 0.08, rotate: -15, delay: 0 },
    { char: "Ω", x: 88, y: 8, size: 80, opacity: 0.07, rotate: 10, delay: 1.8 },
    {
      char: "Δ",
      x: 78,
      y: 55,
      size: 56,
      opacity: 0.06,
      rotate: -8,
      delay: 3.2,
    },
    { char: "Σ", x: 3, y: 60, size: 72, opacity: 0.08, rotate: 12, delay: 0.9 },
    {
      char: "Θ",
      x: 15,
      y: 82,
      size: 50,
      opacity: 0.07,
      rotate: -5,
      delay: 4.1,
    },
    {
      char: "Λ",
      x: 82,
      y: 80,
      size: 60,
      opacity: 0.06,
      rotate: 18,
      delay: 2.5,
    },
    {
      char: "Φ",
      x: 48,
      y: 6,
      size: 52,
      opacity: 0.05,
      rotate: -20,
      delay: 5.3,
    },
    { char: "Ψ", x: 92, y: 38, size: 66, opacity: 0.06, rotate: 8, delay: 1.2 },
    {
      char: "Ξ",
      x: 2,
      y: 35,
      size: 48,
      opacity: 0.07,
      rotate: -10,
      delay: 3.7,
    },
    { char: "Π", x: 60, y: 88, size: 70, opacity: 0.06, rotate: 5, delay: 0.4 },
    {
      char: "Γ",
      x: 30,
      y: 75,
      size: 44,
      opacity: 0.05,
      rotate: -18,
      delay: 6.1,
    },
    {
      char: "Β",
      x: 70,
      y: 18,
      size: 58,
      opacity: 0.06,
      rotate: 14,
      delay: 2.0,
    },
    {
      char: "Μ",
      x: 22,
      y: 20,
      size: 46,
      opacity: 0.05,
      rotate: -6,
      delay: 4.8,
    },
    {
      char: "Ρ",
      x: 55,
      y: 70,
      size: 54,
      opacity: 0.06,
      rotate: 22,
      delay: 1.5,
    },
  ];

  useEffect(() => {
    if (!lettersRef.current) return;

    const ctx = gsap.context(() => {
      const container = lettersRef.current;
      if (!container) return;

      const section = container.parentElement;
      if (!section) return;

      const letterElements = gsap.utils.toArray<HTMLElement>(".greek-letter");

      letterElements.forEach((letter) => {
        // Random horizontal resting position
        const finalX = gsap.utils.random(-40, 40);

        // Calculate a Y position near the bottom of THIS section
        const sectionHeight = section.offsetHeight;
        const letterHeight = letter.offsetHeight;

        const finalY = sectionHeight - letterHeight - gsap.utils.random(10, 40);

        const finalRotation = gsap.utils.random(-100, 100);
        const finalScale = gsap.utils.random(0.7, 1.15);

        gsap.to(letter, {
          x: finalX,
          y: finalY,
          rotation: finalRotation,
          scale: finalScale,
          opacity: 0.16,

          ease: "power3.in",

          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            end: "bottom top",
            scrub: 1.4,
          },
        });
      });
    }, lettersRef);

    return () => ctx.revert();
  }, []);
  return (
    <div
      ref={lettersRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {letters.map((l, i) => (
        <span
          key={i}
          className="greek-letter absolute"
          style={{
            left: `${l.x}%`,
            top: `${l.y}%`,
            fontSize: `${l.size}px`,
            opacity: l.opacity,
            transform: `rotate(${l.rotate}deg)`,
            color: "#c49a2a",
            fontFamily: "'Cinzel', serif",
            fontWeight: 700,
            lineHeight: 1,
            userSelect: "none",

            animation: `letter-glow ${4 + i * 0.35}s ease-in-out infinite`,
            animationDelay: `${l.delay}s`,
          }}
        >
          {l.char}
        </span>
      ))}
    </div>
  );
}

function Particles() {
  const [particles, setParticles] = useState<
    {
      id: number;
      x: number;
      delay: number;
      duration: number;
      size: number;
    }[]
  >([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 6 + Math.random() * 6,
        size: Math.random() * 2 + 0.5,
      })),
    );
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-[#d4a832]"
          style={{
            left: `${p.x}%`,
            bottom: "-10px",
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: 0,
            animation: `float-particle ${p.duration}s ease-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

type FlyingParticle = {
  id: number;
  glyph: string;
  top: number;
  left: number;
  size: number;
  baseOpacity: number;

  dx1: number;
  dy1: number;
  r1: number;

  dx2: number;
  dy2: number;
  r2: number;

  dx3: number;
  dy3: number;
  r3: number;

  dx4: number;
  dy4: number;
  r4: number;

  duration: number;
  delay: number;
  buzzDuration: number;
  buzzDelay: number;
  bx: number;
  by: number;
};

const GLYPHS = [
  "Α",
  "Ω",
  "Δ",
  "Λ",
  "Σ",
  "Φ",
  "Ψ",
  "Θ",
  "Ι",
  "Κ",
  "Μ",
  "Ν",
  "Ξ",
  "Π",
  "Ρ",
  "Τ",
  "ᚠ",
  "ᚢ",
  "ᚦ",
  "ᚨ",
  "ᚱ",
  "ᛏ",
  "ᚺ",
];

function FlyingGlyphs() {
  const rand = (min: number, max: number) => Math.random() * (max - min) + min;

  const [particles, setParticles] = useState<FlyingParticle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 35 }, (_, i) => ({
        id: i,
        glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        top: rand(5, 90),
        left: rand(5, 90),
        size: rand(8, 18),
        baseOpacity: rand(0.25, 0.5),

        dx1: rand(-18, 18),
        dy1: rand(-14, 14),
        r1: rand(-90, 90),

        dx2: rand(-22, 22),
        dy2: rand(-16, 16),
        r2: rand(-90, 90),

        dx3: rand(-18, 18),
        dy3: rand(-14, 14),
        r3: rand(-90, 90),

        dx4: rand(-10, 10),
        dy4: rand(-8, 8),
        r4: rand(-90, 90),

        duration: rand(45, 75),
        delay: rand(-60, 0),
        buzzDuration: rand(1.5, 3),
        buzzDelay: rand(0, 3),
        bx: rand(2, 5),
        by: rand(2, 5),
      })),
    );
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-[5] hidden overflow-hidden sm:block">
      {particles.map((p) => (
        <span
          key={p.id}
          className="flying-glyph-wrap absolute"
          style={
            {
              top: `${p.top}%`,
              left: `${p.left}%`,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
              "--dx1": `${p.dx1}vw`,
              "--dy1": `${p.dy1}vh`,
              "--r1": `${p.r1}deg`,
              "--dx2": `${p.dx2}vw`,
              "--dy2": `${p.dy2}vh`,
              "--r2": `${p.r2}deg`,
              "--dx3": `${p.dx3}vw`,
              "--dy3": `${p.dy3}vh`,
              "--r3": `${p.r3}deg`,
              "--dx4": `${p.dx4}vw`,
              "--dy4": `${p.dy4}vh`,
              "--r4": `${p.r4}deg`,
              "--base-opacity": p.baseOpacity,
            } as React.CSSProperties
          }
        >
          <span
            className="flying-glyph-buzz font-serif"
            style={
              {
                fontSize: `${p.size}px`,
                animationDuration: `${p.buzzDuration}s`,
                animationDelay: `${p.buzzDelay}s`,
                "--bx": `${p.bx}px`,
                "--by": `${p.by}px`,
              } as React.CSSProperties
            }
          >
            {p.glyph}
          </span>
        </span>
      ))}
    </div>
  );
}
export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const grd = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height * 0.52,
        0,
        canvas.width / 2,
        canvas.height * 0.52,
        canvas.width * 0.28,
      );
      grd.addColorStop(
        0,
        `rgba(196,154,42,${0.06 + 0.02 * Math.sin(t * 0.5)})`,
      );
      grd.addColorStop(
        0.5,
        `rgba(196,154,42,${0.03 + 0.01 * Math.sin(t * 0.5)})`,
      );
      grd.addColorStop(1, "rgba(196,154,42,0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      t += 0.02;
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        @keyframes shimmer-gold {
          0%,
          100% {
            opacity: 0.4;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes float-particle {
          0% {
            transform: translateY(0px) translateX(0px);
            opacity: 0;
          }
          15% {
            opacity: 0.8;
          }
          85% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-18vh) translateX(12px);
            opacity: 0;
          }
        }

        @keyframes letter-glow {
          0%,
          100% {
            text-shadow: 0 0 6px rgba(196, 154, 42, 0.13);
          }
          50% {
            text-shadow:
              0 0 14px rgba(196, 154, 42, 0.33),
              0 0 28px rgba(196, 154, 42, 0.1);
          }
        }

        @keyframes glow-pulse {
          0%,
          100% {
            filter: drop-shadow(0 0 8px rgba(196, 154, 42, 0.27));
          }
          50% {
            filter: drop-shadow(0 0 24px rgba(196, 154, 42, 0.53));
          }
        }

        @keyframes shimmer-move {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .shimmer-text {
          background: linear-gradient(
            135deg,
            #c49a2a 0%,
            #f2d98a 30%,
            #c49a2a 50%,
            #e8c250 70%,
            #c49a2a 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer-move 4s linear infinite;
        }

        .glow-gold {
          animation: glow-pulse 3s ease-in-out infinite;
        }

        // Flying glyphs animation
        @keyframes flying-wander {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg);
            opacity: 0;
          }
          8% {
            opacity: var(--base-opacity);
          }
          25% {
            transform: translate3d(var(--dx1), var(--dy1), 0) rotate(var(--r1));
          }
          50% {
            transform: translate3d(var(--dx2), var(--dy2), 0) rotate(var(--r2));
          }
          75% {
            transform: translate3d(var(--dx3), var(--dy3), 0) rotate(var(--r3));
          }
          92% {
            opacity: var(--base-opacity);
          }
          100% {
            transform: translate3d(var(--dx4), var(--dy4), 0) rotate(var(--r4));
            opacity: 0;
          }
        }

        @keyframes flying-buzz {
          0% {
            transform: translate(0, 0);
          }
          20% {
            transform: translate(var(--bx), calc(var(--by) * -1));
          }
          40% {
            transform: translate(calc(var(--bx) * -0.6), var(--by));
          }
          60% {
            transform: translate(var(--bx), var(--by));
          }
          80% {
            transform: translate(calc(var(--bx) * -1), calc(var(--by) * -0.5));
          }
          100% {
            transform: translate(0, 0);
          }
        }

        .flying-glyph-wrap {
          animation-name: flying-wander;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          will-change: transform, opacity;
        }

        .flying-glyph-buzz {
          display: inline-block;
          animation-name: flying-buzz;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          color: #ffd975;
          font-weight: 400;
          line-height: 1;
          text-shadow:
            0 0 4px rgba(255, 217, 117, 0.8),
            0 0 10px rgba(232, 194, 80, 0.55),
            0 0 18px rgba(196, 154, 42, 0.35);
          will-change: transform;
        }
      `}</style>
      <div
        className="relative flex min-h-[100svh] w-full items-center justify-center overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 50% 60%, #131008 0%, #0a0900 40%, #080808 100%)",
        }}
      >
        {/* IMAGES — behind overlay */}

        {/* Archer - bottom right */}
        {/* <div className="absolute right-0 bottom-0 z-0 w-32 hidden sm:block sm:w-48 md:w-56 lg:w-72 xl:w-80">
    <Image
      src="/archer.png"
      alt=""
      width={400}
      height={400}
      className="h-auto w-full object-contain"
    />
     <div className="absolute inset-0 bg-[#080808]/50" />
  </div> */}

        {/* Target - top left */}
        {/* <div className="absolute top-0 left-0 hidden sm:block z-0 w-32 sm:w-48 md:w-56 lg:w-72 xl:w-80">
    <Image
      src="/target.png"
      alt=""
      width={400}
      height={400}
      className="h-auto w-full object-contain"
    />
  </div> */}

        {/* DARK ATMOSPHERIC OVERLAY */}
        {/* <div
    className="pointer-events-none hidden sm:block absolute inset-0 z-[1]"
    style={{
      background:
        "radial-gradient(ellipse at 50% 60%, rgba(19,16,8,0.15) 0%, rgba(10,9,0,0.55) 40%, rgba(8,8,8,0.9) 100%)",
    }}
  />         */}
        <FlyingGlyphs />
        {/* Animated radial glow */}
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 h-full w-full"
        />

        {/* Twinkling star field */}
        <StarField />

        {/* Greek letters */}
        <GreekLetters />

        {/* Floating particles */}
        <Particles />

        {/* Bottom-left decorative image */}

        {/* Decorative horizontal rule — top */}
        <div
          className="absolute top-0 right-0 left-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, #c49a2a44, #c49a2a88, #c49a2a44, transparent)",
          }}
        />
        <div
          className="absolute top-1 right-0 left-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, #c49a2a22, #c49a2a44, #c49a2a22, transparent)",
          }}
        />

        {/* CENTER CONTENT */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-0 px-4">
          {/* Sponsor logos row */}
          <div
            className={`mr-1 mb-10 flex w-40 items-center justify-center sm:w-50`}
          >
            <Image
              src="/logo-group.png"
              alt="Logos"
              width={250}
              height={250}
              className="h-auto w-full object-contain"
            />{" "}
          </div>

          {/* <p className="mb-10 font-norse-bold relative z-10 text-sm tracking-[2px] text-white/70 sm:text-sm sm:tracking-[4px]">
        presents
      </p> */}

          {/* DevHost logo */}
          <div className="glow-gold relative mb-6 flex h-30 items-center justify-center sm:h-40">
            <Image
              src="/DVHST.png"
              alt="DevHost 2026"
              width={360}
              height={170}
              className="h-full w-auto object-contain"
            />
          </div>

          {/* Tagline */}
          <h1
            className="font-norse-bold shimmer-text text-center text-2xl font-extrabold"
            style={{
              // fontFamily: "'Cinzel Decorative', 'Cinzel', serif",
              fontWeight: 700,
              lineHeight: 1.35,
              letterSpacing: "0.05em",
              marginBottom: "0",
            }}
          >
            Ideas that Echo Through Time
          </h1>
        </div>

        {/* Bottom decorative rule */}
        <div
          className="absolute right-0 bottom-1 left-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, #c49a2a44, #c49a2a88, #c49a2a44, transparent)",
          }}
        />
        <div
          className="absolute right-0 bottom-0 left-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, #c49a2a22, #c49a2a44, #c49a2a22, transparent)",
          }}
        />
      </div>
    </>
  );
}

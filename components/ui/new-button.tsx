"use client";

import * as React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";

// ── Surface layers — warm dark, not cold iron ───────────────────────────────

const DARK_BASE = `
  linear-gradient(158deg,
    #1a1408 0%,
    #110e06 14%,
    #1c1609 26%,
    #0f0c05 40%,
    #181306 54%,
    #0d0b05 66%,
    #161107 78%,
    #100d05 90%,
    #0a0804 100%
  )
`;

const SCRATCH_LAYER = `
  repeating-linear-gradient(
    68deg,
    transparent,
    transparent 3px,
    rgba(200,160,40,0.025) 3px,
    rgba(200,160,40,0.025) 3.5px
  ),
  repeating-linear-gradient(
    -29deg,
    transparent,
    transparent 5px,
    rgba(0,0,0,0.22) 5px,
    rgba(0,0,0,0.22) 5.8px
  ),
  repeating-linear-gradient(
    112deg,
    transparent,
    transparent 8px,
    rgba(180,140,30,0.018) 8px,
    rgba(180,140,30,0.018) 8.6px
  )
`;

// Rust/age stains — warm amber-brown tones
const STAIN_LAYER = `
  radial-gradient(ellipse 70px 40px at 8% 25%, rgba(100,70,10,0.45) 0%, transparent 100%),
  radial-gradient(ellipse 50px 60px at 85% 70%, rgba(85,58,8,0.40) 0%, transparent 100%),
  radial-gradient(ellipse 90px 30px at 55% 90%, rgba(70,48,6,0.35) 0%, transparent 100%),
  radial-gradient(ellipse 40px 50px at 30% 10%, rgba(90,62,10,0.38) 0%, transparent 100%),
  radial-gradient(ellipse 18px 14px at 48% 42%, rgba(110,75,8,0.30) 0%, transparent 100%)
`;

const PIT_LAYER = `
  radial-gradient(circle 3px at 22% 55%, rgba(0,0,0,0.55) 0%, transparent 100%),
  radial-gradient(circle 2px at 67% 28%, rgba(0,0,0,0.50) 0%, transparent 100%),
  radial-gradient(circle 4px at 41% 72%, rgba(0,0,0,0.45) 0%, transparent 100%),
  radial-gradient(circle 2px at 78% 48%, rgba(0,0,0,0.40) 0%, transparent 100%),
  radial-gradient(circle 3px at 12% 82%, rgba(0,0,0,0.50) 0%, transparent 100%),
  radial-gradient(circle 3px at 88% 62%, rgba(0,0,0,0.48) 0%, transparent 100%)
`;

// Gold palette derived from the image
const GOLD = "#c8960c";
const GOLD_DIM = "rgba(200,150,12,0.22)";
const GOLD_FAINT = "rgba(180,135,10,0.12)";
const GOLD_GLOW = "rgba(210,160,20,0.65)";

export type NewButtonProps = React.ComponentProps<"button">;

const NewButton = React.forwardRef<HTMLButtonElement, NewButtonProps>(
  (
    {
      className,
      children,
      onClick,
      onMouseDown,
      onMouseUp,
      onMouseLeave,
      disabled,
      ...props
    },
    ref,
  ) => {
    const [pressed, setPressed] = useState(false);
    const [runeGlow, setRuneGlow] = useState(false);

    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
      setPressed(true);
      if (onMouseDown) onMouseDown(e);
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
      setPressed(false);
      if (onMouseUp) onMouseUp(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      setPressed(false);
      if (onMouseLeave) onMouseLeave(e);
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setRuneGlow(true);
      setTimeout(() => setRuneGlow(false), 1100);
      if (onClick) onClick(e);
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className={cn(
          "relative inline-block cursor-pointer select-none",
          className,
        )}
        style={{
          padding: 0,
          background: "none",
          border: "none",
          outline: "none",
        }}
        {...props}
      >
        {/* SVG filter defs */}
        <svg width="0" height="0" className="pointer-events-none absolute">
          <defs>
            <filter id="roughen" x="-5%" y="-5%" width="110%" height="110%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.065 0.08"
                numOctaves="4"
                seed="8"
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="2.2"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
            <clipPath id="forge-clip" clipPathUnits="objectBoundingBox">
              <path
                d="
                M0.015,0.09 L0.022,0.045 L0.038,0.025 L0.07,0.012 L0.13,0.005
                L0.28,0.002 L0.42,0.0  L0.5,0.003  L0.61,0.0  L0.75,0.004
                L0.87,0.008 L0.93,0.015 L0.962,0.028 L0.978,0.048 L0.986,0.09
                L0.993,0.19 L0.997,0.35 L1.0,0.5    L0.997,0.65 L0.993,0.80
                L0.986,0.91 L0.978,0.952 L0.962,0.972 L0.93,0.985 L0.87,0.992
                L0.75,0.996 L0.61,1.0   L0.5,0.997  L0.42,1.0   L0.28,0.998
                L0.13,0.995 L0.07,0.988 L0.038,0.975 L0.022,0.955 L0.015,0.91
                L0.007,0.80 L0.003,0.65 L0.0,0.5    L0.003,0.35 L0.007,0.19 Z
              "
              />
            </clipPath>
          </defs>
        </svg>

        <div
          className="relative"
          style={{
            width: 290,
            height: 76,
            transform: pressed
              ? "translateY(2px) scale(0.995)"
              : "translateY(0) scale(1)",
            transition: "transform 0.09s ease",
            filter: pressed
              ? `brightness(0.65) drop-shadow(0 1px 3px rgba(0,0,0,1))`
              : `brightness(0.95) drop-shadow(0 4px 18px rgba(0,0,0,1)) drop-shadow(0 0 12px rgba(180,130,8,0.12))`,
          }}
        >
          {/* Surface layers */}
          <div
            className="absolute inset-0"
            style={{ clipPath: "url(#forge-clip)", background: DARK_BASE }}
          />
          <div
            className="absolute inset-0"
            style={{
              clipPath: "url(#forge-clip)",
              background: SCRATCH_LAYER,
              opacity: 0.9,
            }}
          />
          <div
            className="absolute inset-0"
            style={{ clipPath: "url(#forge-clip)", background: STAIN_LAYER }}
          />
          <div
            className="absolute inset-0"
            style={{ clipPath: "url(#forge-clip)", background: PIT_LAYER }}
          />

          {/* Subtle warm top-catch */}
          <div
            className="absolute inset-0"
            style={{
              clipPath: "url(#forge-clip)",
              background: `
                radial-gradient(ellipse 100% 60% at 50% 0%, rgba(200,150,10,0.06) 0%, transparent 100%),
                radial-gradient(ellipse 85% 75% at 50% 50%, transparent 55%, rgba(0,0,0,0.5) 100%)
              `,
            }}
          />

          {pressed && (
            <div
              className="absolute inset-0"
              style={{
                clipPath: "url(#forge-clip)",
                background:
                  "radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0.55) 0%, transparent 80%)",
              }}
            />
          )}

          {/* Rune glow bloom on click */}
          {runeGlow && (
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                clipPath: "url(#forge-clip)",
                background: `radial-gradient(ellipse at 50% 50%, rgba(200,150,10,0.28) 0%, transparent 65%)`,
                animation: "rune-bloom 1.1s ease-out forwards",
              }}
            />
          )}

          {/* ── SVG: border frame, gouges, runes ── */}
          <svg
            className="absolute inset-0"
            width="290"
            height="76"
            viewBox="0 0 290 76"
            fill="none"
            style={{ filter: "url(#roughen)" }}
          >
            {/* Outer border — gold, thin, worn */}
            <path
              d="M9,7 L16,3.5 L274,3.5 L281,7 L285.5,13 L287,38 L285.5,63 L281,69 L274,72.5 L16,72.5 L9,69 L4.5,63 L3,38 L4.5,13 Z"
              stroke={GOLD}
              strokeWidth="1"
              fill="none"
              opacity="0.75"
            />
            {/* Inner engraved groove */}
            <path
              d="M16,11 L22,8 L268,8 L274,11 L278,17 L279,38 L278,59 L274,65 L268,68 L22,68 L16,65 L12,59 L11,38 L12,17 Z"
              stroke={GOLD_DIM}
              strokeWidth="0.7"
              fill="none"
              strokeDasharray="18 4 30 6 22 3"
            />

            {/* Gouges */}
            <line
              x1="28"
              y1="14"
              x2="118"
              y2="42"
              stroke="rgba(0,0,0,0.65)"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
            <line
              x1="29"
              y1="14"
              x2="119"
              y2="42"
              stroke="rgba(200,150,10,0.04)"
              strokeWidth="0.6"
              strokeLinecap="round"
            />
            <line
              x1="195"
              y1="22"
              x2="252"
              y2="55"
              stroke="rgba(0,0,0,0.60)"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
            <line
              x1="44"
              y1="36"
              x2="160"
              y2="40"
              stroke="rgba(0,0,0,0.45)"
              strokeWidth="0.8"
              strokeLinecap="round"
            />

            {/* Chip near top */}
            <path d="M130,5 L136,8 L132,9 Z" fill="rgba(0,0,0,0.65)" />

            {/* Corner rivets — gold-toned oxidized */}
            {(
              [
                [16, 11],
                [274, 11],
                [16, 65],
                [274, 65],
              ] as [number, number][]
            ).map(([cx, cy]) => (
              <g key={`${cx}-${cy}`}>
                <circle cx={cx} cy={cy} r="2.8" fill="rgba(140,100,8,0.6)" />
                <circle cx={cx} cy={cy} r="1.4" fill="rgba(80,56,4,0.9)" />
                <circle
                  cx={cx - 0.6}
                  cy={cy - 0.6}
                  r="0.5"
                  fill="rgba(220,170,40,0.22)"
                />
              </g>
            ))}

            {/* Rust bleed from top-left rivet */}
            <path
              d="M14,11 Q10,22 12,35"
              stroke="rgba(130,90,8,0.3)"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Rust bleed from bottom-right rivet */}
            <path
              d="M276,65 Q280,54 278,42"
              stroke="rgba(120,82,6,0.25)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />

            {/* Flanking runes — gold tones */}
            {["ᚦ", "ᚮ", "ᚱ"].map((r, i) => (
              <text
                key={r}
                x={20 + i * 11}
                y="42"
                textAnchor="middle"
                fontSize="8.5"
                fontFamily="serif"
                fill={runeGlow ? `rgba(220,168,20,0.75)` : GOLD_DIM}
                style={{ transition: "fill 0.5s ease" }}
              >
                {r}
              </text>
            ))}
            {["ᛏ", "ᚺ", "ᚢ"].map((r, i) => (
              <text
                key={r}
                x={258 + i * 11}
                y="42"
                textAnchor="middle"
                fontSize="8.5"
                fontFamily="serif"
                fill={runeGlow ? `rgba(220,168,20,0.75)` : GOLD_DIM}
                style={{ transition: "fill 0.5s ease" }}
              >
                {r}
              </text>
            ))}

            {/* Top rune strip */}
            <text
              x="145"
              y="14"
              textAnchor="middle"
              fontSize="6"
              fontFamily="serif"
              letterSpacing="7"
              fill={runeGlow ? "rgba(210,160,15,0.6)" : GOLD_FAINT}
              style={{ transition: "fill 0.5s ease" }}
            >
              ᚠ᛫ᚢ᛫ᚦ᛫ᚨ᛫ᚱ
            </text>
            {/* Bottom rune strip */}
            <text
              x="145"
              y="66"
              textAnchor="middle"
              fontSize="6"
              fontFamily="serif"
              letterSpacing="7"
              fill={runeGlow ? "rgba(210,160,15,0.6)" : GOLD_FAINT}
              style={{ transition: "fill 0.5s ease" }}
            >
              ᛇ᛫ᛈ᛫ᛉ᛫ᛊ᛫ᛏ᛫ᛒ
            </text>
          </svg>

          {/* ── Label ── */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ paddingLeft: 36, paddingRight: 36 }}
          >
            <span
              className="font-dalek uppercase"
              style={{
                fontSize: "0.95rem",
                letterSpacing: "0.2em",
                color: runeGlow ? "#e0b818" : pressed ? "#7a6008" : GOLD,
                textShadow: runeGlow
                  ? `0 0 26px ${GOLD_GLOW}, 0 1px 4px rgba(0,0,0,1)`
                  : `0 0 12px rgba(180,130,8,0.35), 0 1px 5px rgba(0,0,0,1)`,
                transition: "color 0.4s ease, text-shadow 0.4s ease",
                userSelect: "none",
                filter: "url(#roughen)",
              }}
            >
              {children || "Wield Mjölnir"}
            </span>
          </div>
        </div>

        <style jsx global>{`
          @keyframes rune-bloom {
            0% {
              opacity: 0;
            }
            15% {
              opacity: 1;
            }
            100% {
              opacity: 0;
            }
          }
        `}</style>
      </button>
    );
  },
);

NewButton.displayName = "NewButton";

export { NewButton };
export default NewButton;

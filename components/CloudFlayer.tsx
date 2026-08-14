"use client";

import { motion } from "framer-motion";

/**
 * Drifting cloud/smoke layer to sit on top of greek_bg.svg.
 * The Canva export is a flattened raster (no isolated cloud shapes),
 * so instead of animating pixels inside that SVG, we layer soft blurred
 * blobs that drift horizontally — reads as smoke/cloud motion and matches
 * the warm gold/dark palette.
 *
 * Usage:
 * <div className="relative">
 *   <img src="/greek_bg.svg" className="absolute inset-0 w-full h-full object-cover" />
 *   <CloudLayer />
 *   <YourHeroContent />
 * </div>
 */

type Cloud = {
  top: string;       // vertical position, e.g. "20%"
  width: number;      // px
  height: number;      // px
  duration: number;    // seconds for one full pass
  delay: number;        // stagger start
  opacity: number;
  blur: number;         // px
  reverse?: boolean;    // right-to-left instead of left-to-right
};

const clouds: Cloud[] = [
  { top: "18%", width: 420, height: 140, duration: 42, delay: 0, opacity: 0.25, blur: 30 },
  { top: "32%", width: 320, height: 110, duration: 55, delay: 6, opacity: 0.18, blur: 24, reverse: true },
  { top: "12%", width: 260, height: 90, duration: 34, delay: 3, opacity: 0.2, blur: 20 },
  { top: "45%", width: 500, height: 160, duration: 60, delay: 10, opacity: 0.15, blur: 36, reverse: true },
];

export default function CloudLayer() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {clouds.map((cloud, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            top: cloud.top,
            width: cloud.width,
            height: cloud.height,
            filter: `blur(${cloud.blur}px)`,
            opacity: cloud.opacity,
            background:
              "radial-gradient(ellipse at center, rgba(255,215,140,0.9) 0%, rgba(120,80,20,0.4) 55%, rgba(0,0,0,0) 75%)",
          }}
          initial={{ x: cloud.reverse ? "110vw" : "-30vw" }}
          animate={{ x: cloud.reverse ? "-30vw" : "110vw" }}
          transition={{
            duration: cloud.duration,
            delay: cloud.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
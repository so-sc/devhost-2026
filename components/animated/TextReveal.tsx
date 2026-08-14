"use client";

import { motion } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  startDelayMs?: number;
}

export default function TextReveal({
  text,
  className = "",
  startDelayMs = 0,
}: TextRevealProps) {
  return (
    <motion.div
      className={`relative inline-block overflow-hidden ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Actual text */}
      <span className="relative z-10">{text}</span>

      {/* Left temple door */}
      <motion.div
        variants={{
          hidden: { x: 0 },
          visible: {
            x: "-102%",
            transition: {
              duration: 2.5,
              delay: startDelayMs / 1000,
              ease: [0.18, 1, 0.3, 1],
            },
          },
        }}
        className="absolute left-0 top-0 z-20 h-full w-1/2"
        style={{
          background: `
            linear-gradient(
              180deg,
              #c7ae78 0%,
              #9a7b49 12%,
              #6f5535 45%,
              #4f3b25 60%,
              #8b6b40 88%,
              #d9c18f 100%
            )
          `,
          borderRight: "2px solid rgba(255,235,180,.35)",
          boxShadow:
            "inset -6px 0 10px rgba(0,0,0,.45), inset 0 2px 2px rgba(255,255,255,.15), 8px 0 20px rgba(0,0,0,.45)",
        }}
      />

      {/* Right temple door */}
      <motion.div
        variants={{
          hidden: { x: 0 },
          visible: {
            x: "102%",
            transition: {
              duration: 2.5,
              delay: startDelayMs / 1000,
              ease: [0.18, 1, 0.3, 1],
            },
          },
        }}
        className="absolute right-0 top-0 z-20 h-full w-1/2"
        style={{
          background: `
            linear-gradient(
              180deg,
              #d9c18f 0%,
              #9a7b49 12%,
              #6f5535 45%,
              #4f3b25 60%,
              #8b6b40 88%,
              #c7ae78 100%
            )
          `,
          borderLeft: "2px solid rgba(255,235,180,.35)",
          boxShadow:
            "inset 6px 0 10px rgba(0,0,0,.45), inset 0 2px 2px rgba(255,255,255,.15), -8px 0 20px rgba(0,0,0,.45)",
        }}
      />
    </motion.div>
  );
}
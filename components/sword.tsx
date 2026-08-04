"use client";

import { motion, MotionValue } from "framer-motion";

interface SwordProps {
  y: MotionValue<number>;
}

export default function Sword({ y }: SwordProps) {
  return (
    <motion.div
      style={{ y }}
      className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
    >
      <motion.img
        src="/sword.svg"
        alt="Hero Sword"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="w-[220px] drop-shadow-[0_0_50px_rgba(212,175,55,0.7)] sm:w-[280px] md:w-[320px] lg:w-[400px]"
      />
    </motion.div>
  );
}

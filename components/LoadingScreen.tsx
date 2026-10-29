"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface LoadingScreenProps {
  progress?: number; // 0 to 100 based on loaded images
  isReady?: boolean; // true when preload has resolved
  onComplete?: () => void;
}

export default function LoadingScreen({
  progress = 0,
  isReady = false,
  onComplete,
}: LoadingScreenProps) {
  // displayedProgress smoothly catches up to progress
  const [displayedProgress, setDisplayedProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Target is either the image loading progress, or 100 if isReady is true
    const target = isReady ? 100 : Math.max(0, Math.min(100, progress));

    const updateProgress = () => {
      setDisplayedProgress((prev) => {
        if (prev >= 100 && target >= 100) {
          return 100;
        }

        const diff = target - prev;

        if (diff <= 0.2) {
          return target;
        }

        // Smoothly interpolate: fast enough to feel responsive,
        // but smooth enough to never snap abruptly
        const step = Math.max(0.4, diff * 0.12);
        return Math.min(100, prev + step);
      });

      animFrameRef.current = requestAnimationFrame(updateProgress);
    };

    animFrameRef.current = requestAnimationFrame(updateProgress);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [progress, isReady]);

  // When displayedProgress reaches 100% and assets are ready, smoothly fade out
  useEffect(() => {
    if (displayedProgress >= 99.5 && isReady && !isFadingOut) {
      setDisplayedProgress(100);
      const timer = setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          onComplete?.();
        }, 350);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [displayedProgress, isReady, isFadingOut, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-350 ease-out select-none ${
        isFadingOut ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="relative flex flex-col items-center justify-center px-4 text-center">
        {/* Soft golden ambient backlight behind logo */}
        <div
          className="pointer-events-none absolute -inset-4 -z-10 opacity-40 blur-xl"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(212,175,55,0.35) 0%, rgba(212,175,55,0.08) 50%, transparent 75%)",
          }}
        />

        {/* Small DevHost 2026 Logo (from Hero section) */}
        <div className="relative z-10 w-32 sm:w-36 md:w-50">
          <Image
            src="/DVHST.png"
            alt="DevHost 2026"
            width={390}
            height={200}
            priority
            className="h-auto w-full object-contain drop-shadow-[0_2px_10px_rgba(246,204,96,0.25)]"
          />
        </div>

        {/* Progress bar */}
        <div className="relative z-10 mt-4 flex w-32 flex-col items-center sm:mt-5 sm:w-36 md:w-50">
          {/* Track */}
          <div className="relative h-1.5 w-full overflow-hidden rounded-sm border border-[#c8a24c]/30 bg-[#16120b] sm:h-2">
            {/* Filled portion */}
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#C9963E] via-[#F6CC60] to-[#FFF5D0]"
              style={{
                width: `${Math.min(100, Math.max(0, displayedProgress))}%`,
                boxShadow: "0 0 6px rgba(246, 204, 96, 0.7)",
              }}
            >
              <div className="absolute top-0 right-0 h-full w-1 bg-white/70" />
            </div>
          </div>

          {/* Percentage */}
          <div className="font-lora mt-2 flex w-full items-center justify-between text-xs tracking-[0.2em] text-[#c8a24c]/75 sm:text-sm">
            <span>LOADING</span>
            <span className="font-norse font-semibold text-[#f6cc60]">
              {Math.round(displayedProgress)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

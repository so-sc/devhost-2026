"use client";
import React, { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
  useMotionValue,
} from "framer-motion";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { markers } from "../assets/data/timeline";
import DecryptText from "./animated/TextAnimation";
import Button from "./Button";

type TimelineEvent = {
  id: string;
  displayTime: string;
  title: string;
  icon: React.ReactNode;
  speaker?: string;
  role?: string;
  description: string;
  venue?: string;
};

type TimelineDay = {
  id: string;
  events: TimelineEvent[];
};

type TimelineTabGroup = {
  id: string;
  label: string;
  days: TimelineDay[];
};
const ScrollParchmentWrapper = ({
  tabGroups,
}: {
  tabGroups: TimelineTabGroup[];
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobileRef = useRef(false);
  const containerHeight = useMotionValue(0);

  useEffect(() => {
    isMobileRef.current = window.matchMedia("(max-width: 639px)").matches;

    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => containerHeight.set(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, [containerHeight]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 80%"],
  });

  // Calculate scroll velocity and smooth it for a physical inertia feel
  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 30, // Low damping for a subtle physical settle
    stiffness: 200, // Soft stiffness for organic feeling
  });

  // Map the smoothed velocity to a tiny rotation wobble.
  // On mobile, use a tighter ±0.4deg range to prevent visible vibration
  // from native scroll momentum spikes. Desktop keeps the original ±1.5deg.
  const rollerWobble = useTransform(smoothVelocity, (v) => {
    if (isMobileRef.current) return "0deg";
    const clamped = Math.max(-0.5, Math.min(0.5, v));
    return `${(clamped / 0.5) * 1.5}deg`;
  });

  // Animates the clip path to reveal the parchment from top to bottom
  const clipPath = useTransform(scrollYProgress, (p) => {
    const clamped = Math.max(0, Math.min(1, p));
    return `inset(0px 0px calc((100% - 100px) * ${1 - clamped}) 0px)`;
  });

  // Translates the bottom roller downwards exactly in sync with the clip path,
  // with a small extra downward shift (+ 24px * p) for a subtle physical unrolling effect.
  const bottomRollerTop = useTransform(scrollYProgress, (p) => {
    if (isMobileRef.current) return "0px";
    const clamped = Math.max(0, Math.min(1, p));
    return `calc(100px + (100% - 100px) * ${clamped} + ${clamped * 24}px)`;
  });

  const bottomRollerY = useTransform(
    [scrollYProgress, containerHeight],
    ([p, h]: number[]) => {
      if (!isMobileRef.current) return 0;
      const c = Math.max(0, Math.min(1, p));
      return 100 + (h - 100) * c + c * 24;
    },
  );

  // Texture rotation to simulate physical unrolling
  const rollerTextureY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0px", "-250px"],
  );

  return (
    <div
      ref={containerRef}
      className="relative mx-auto my-10 w-full max-w-4xl sm:w-[90%] lg:w-full"
    >
      <svg width="0" height="0" className="pointer-events-none absolute">
        <filter id="torn-edge" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.03"
            numOctaves="3"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="4"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      {/* Top Roller - Fixed at the top */}
      <div className="absolute top-0 left-[-2%] z-20 h-14 w-[104%] -translate-y-1/2 drop-shadow-[0_15px_15px_rgba(0,0,0,0.9)]">
        <div className="absolute inset-0 right-6 left-6 overflow-hidden rounded-full bg-[#3d2716]">
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "repeating-linear-gradient(180deg, rgba(0,0,0,0.6) 0px, transparent 2px, transparent 6px)",
              backgroundSize: "100% 12px",
              backgroundPositionY: rollerTextureY,
            }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(60,35,15,0.5) 0%, rgba(120,80,40,0.15) 25%, rgba(200,162,76,0.15) 45%, rgba(80,50,20,0.4) 75%, rgba(30,15,5,0.7) 100%)",
              boxShadow:
                "inset 0 2px 4px rgba(200,162,76,0.1), inset 0 -4px 6px rgba(0,0,0,0.7)",
            }}
          />
        </div>
        <div
          className="absolute left-0 z-10 flex h-10 w-8 items-center justify-center rounded-full"
          style={{
            background:
              "linear-gradient(180deg, #1f140d 0%, #362215 20%, #543924 50%, #29180e 80%, #110905 100%)",
            boxShadow:
              "inset -4px 0 8px rgba(0,0,0,0.7), 4px 0 6px rgba(0,0,0,0.5)",
          }}
        >
          <div className="h-6 w-4 rounded-full bg-[#170e09] shadow-[inset_1px_1px_3px_rgba(200,162,76,0.15)]" />
        </div>
        <div
          className="absolute right-0 z-10 flex h-10 w-8 items-center justify-center rounded-full"
          style={{
            background:
              "linear-gradient(180deg, #1f140d 0%, #362215 20%, #543924 50%, #29180e 80%, #110905 100%)",
            boxShadow:
              "inset 4px 0 8px rgba(0,0,0,0.7), -4px 0 6px rgba(0,0,0,0.5)",
          }}
        >
          <div className="h-6 w-4 rounded-full bg-[#170e09] shadow-[inset_-1px_1px_3px_rgba(200,162,76,0.15)]" />
        </div>
      </div>

      {/* Parchment Surface - Fully renders but is clipped to unroll */}
      <motion.div
        className="relative z-10 w-full max-sm:transform-gpu sm:[filter:url(#torn-edge)]"
        style={{
          clipPath,
        }}
      >
        <div className="absolute inset-0 bg-[#422d1c]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/images/parchment-sponsor.jpg')",
              backgroundSize: "100% auto",
              backgroundAttachment: "local",
              opacity: 0.5,
              mixBlendMode: "multiply",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(200,162,76,0.04) 0%, transparent 60%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(200,162,76,0.08) 0%, rgba(0,0,0,0.15) 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-40"
            style={{
              background:
                "linear-gradient(90deg, rgba(60,35,15,0.15) 0%, transparent 8%, transparent 25%, rgba(60,35,15,0.08) 28%, transparent 34%, transparent 65%, rgba(60,35,15,0.06) 68%, transparent 75%, rgba(60,35,15,0.15) 100%)",
            }}
          />
          <div className="pointer-events-none absolute inset-0 shadow-[inset_15px_0_30px_rgba(70,40,20,0.25),inset_-15px_0_30px_rgba(70,40,20,0.25)]" />
          <div
            className="pointer-events-none absolute top-0 right-0 left-0 h-20"
            style={{
              background:
                "linear-gradient(180deg, rgba(30,15,5,0.8) 0%, rgba(50,30,15,0.4) 40%, transparent 100%)",
            }}
          />
          <div
            className="pointer-events-none absolute right-0 bottom-0 left-0 h-20"
            style={{
              background:
                "linear-gradient(0deg, rgba(30,15,5,0.8) 0%, rgba(50,30,15,0.4) 40%, transparent 100%)",
            }}
          />
        </div>

        {/* Content - It takes full height naturally */}
        <div className="relative z-10 px-2 py-12 sm:px-8 sm:py-16 md:px-12 lg:px-24 lg:py-20">
          {tabGroups.map((group) => (
            <TabsContent
              key={group.id}
              value={group.id}
              className="mt-0 outline-none"
            >
              <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10">
                {group.days.map((day) => (
                  <div
                    key={day.id}
                    className="flex flex-col gap-10 sm:gap-12 lg:gap-16"
                  >
                    {day.events.map((event) => (
                      <div
                        key={event.id}
                        className="relative flex flex-col items-center gap-3 border-b border-[#C8A24C]/20 pb-6 text-center last:border-b-0 sm:gap-4 sm:pb-8 lg:gap-5 lg:pb-10"
                      >
                        {/* Time */}
                        <div
                          className="text-base font-bold tracking-[0.18em] text-[#C8A24C] uppercase sm:text-lg"
                          style={{ fontFamily: "'Cinzel', serif" }}
                        >
                          {event.displayTime}
                        </div>

                        {/* Title */}
                        <h3 className="font-norse-bold mx-auto w-full text-3xl font-bold tracking-wide break-words text-[#F6CC60] sm:max-w-[85%] sm:text-4xl lg:max-w-none">
                          <span className="mr-2 mb-2 inline-flex align-middle tracking-tighter">
                            {event.icon}
                          </span>
                          {event.title}
                        </h3>

                        {/* Speaker & Role */}
                        {event.speaker || event.role ? (
                          <div className="mx-auto flex w-full flex-col items-center tracking-wide text-[#a98f6d] sm:max-w-[85%] lg:max-w-none">
                            {event.speaker ? (
                              <span className="text-center text-base font-bold break-words sm:text-lg">
                                {event.speaker}
                              </span>
                            ) : null}
                            {event.role ? (
                              <span className="mt-0.5 text-center text-sm font-semibold break-words opacity-85 sm:text-base">
                                {event.role}
                              </span>
                            ) : null}
                          </div>
                        ) : null}

                        {/* Description */}
                        {event.description ? (
                          <p className="sm:text-md font-lora mx-auto w-full text-center text-[17px] leading-relaxed font-medium break-words text-white/70 sm:max-w-[85%] lg:max-w-none">
                            {event.description}
                          </p>
                        ) : null}

                        {/* Venue */}
                        {event.venue ? (
                          <div className="mx-auto w-full text-center text-sm font-semibold tracking-wide break-words text-[#a98f6d] lg:max-w-none">
                            <span>{event.venue}</span>
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </div>
      </motion.div>

      {/* Bottom Roller - Tracks the bottom of the clip path */}
      <motion.div
        className="absolute left-[-2%] z-20 h-14 w-[104%] -translate-y-1/2 drop-shadow-[0_20px_25px_rgba(0,0,0,0.95)] max-sm:will-change-transform"
        style={{ top: bottomRollerTop, y: bottomRollerY, rotate: rollerWobble }}
      >
        <div className="absolute inset-0 right-6 left-6 overflow-hidden rounded-full bg-[#3d2716]">
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "repeating-linear-gradient(180deg, rgba(0,0,0,0.6) 0px, transparent 2px, transparent 6px)",
              backgroundSize: "100% 12px",
              backgroundPositionY: rollerTextureY,
            }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(60,35,15,0.5) 0%, rgba(80,50,20,0.4) 25%, rgba(200,162,76,0.12) 50%, rgba(100,60,30,0.2) 75%, rgba(30,15,5,0.7) 100%)",
              boxShadow:
                "inset 0 2px 4px rgba(200,162,76,0.1), inset 0 -2px 3px rgba(0,0,0,0.6)",
            }}
          />
        </div>
        <div
          className="absolute left-0 z-10 flex h-10 w-8 items-center justify-center rounded-full"
          style={{
            background:
              "linear-gradient(180deg, #1f140d 0%, #362215 20%, #543924 50%, #29180e 80%, #110905 100%)",
            boxShadow:
              "inset -4px 0 8px rgba(0,0,0,0.7), 4px 0 6px rgba(0,0,0,0.5)",
          }}
        >
          <div className="h-6 w-4 rounded-full bg-[#170e09] shadow-[inset_1px_1px_3px_rgba(200,162,76,0.15)]" />
        </div>
        <div
          className="absolute right-0 z-10 flex h-10 w-8 items-center justify-center rounded-full"
          style={{
            background:
              "linear-gradient(180deg, #1f140d 0%, #362215 20%, #543924 50%, #29180e 80%, #110905 100%)",
            boxShadow:
              "inset 4px 0 8px rgba(0,0,0,0.7), -4px 0 6px rgba(0,0,0,0.5)",
          }}
        >
          <div className="h-6 w-4 rounded-full bg-[#170e09] shadow-[inset_-1px_1px_3px_rgba(200,162,76,0.15)]" />
        </div>
      </motion.div>
    </div>
  );
};

const CyberpunkTimeline: React.FC = () => {
  const tabGroups = [
    {
      id: "phase-1",
      label: "Nov 12",
      days: markers.slice(0, Math.ceil(markers.length / 3)),
    },
    {
      id: "phase-2",
      label: "Nov 13",
      days: markers.slice(
        Math.ceil(markers.length / 3),
        Math.ceil((markers.length * 2) / 3),
      ),
    },
    {
      id: "phase-3",
      label: "Nov 14",
      days: markers.slice(Math.ceil((markers.length * 2) / 3)),
    },
  ];

  return (
    <section
      id="Timeline"
      className="relative flex w-full items-center justify-center overflow-hidden bg-[#050403] py-18 pb-24 text-white sm:py-24 sm:pb-32 lg:px-8"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url('/images/parchment-sponsor.jpg')",
          backgroundSize: "700px auto",
          backgroundRepeat: "repeat",
          opacity: 0.7,
          mixBlendMode: "soft-light",
        }}
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 h-[700px] bg-[radial-gradient(ellipse_900px_500px_at_50%_0%,rgba(246,204,96,0.08),transparent_65%)]" />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6">
        {/* Header */}
        <div className="relative py-12 text-center">
          <h2 className="font-norse-bold mb-2 text-6xl font-extrabold tracking-[0.12em] md:text-8xl">
            <span className="bg-gradient-to-r from-[#F6CC60] via-[#FFF5D0] to-[#C9963E] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(246,204,96,0.3)]">
              TIMELINE
            </span>
          </h2>
          {/* <h2 className="">
          &gt; Journey of Events
        </h2> */}
          <DecryptText
            text=" The Saga Unfolds"
            startDelayMs={200}
            trailSize={6}
            flickerIntervalMs={50}
            revealDelayMs={100}
            className="font-norse text-lg font-semibold tracking-[0.10em] text-[#C8A24C]/80 sm:tracking-[0.14em] md:text-2xl"
          />
        </div>

        <div className="mx-auto max-w-6xl px-2 sm:px-6">
          <Tabs defaultValue="phase-1" className="w-full">
            {/* Tab Navigation */}
            <TabsList className="mx-auto mb-10 flex w-full max-w-4xl justify-center gap-2 bg-transparent p-0 sm:mb-14 sm:gap-4 lg:mb-10 lg:gap-6">
              {tabGroups.map((group) => (
                <TabsPrimitive.Trigger key={group.id} value={group.id} asChild>
                  <Button className="flex justify-center transition-all duration-300 data-[state=active]:brightness-125 data-[state=active]:drop-shadow-[0_0_5px_rgba(200,160,40,0.8)] [&_div.px-8]:px-1 sm:[&_div.px-8]:px-2 lg:[&_div.px-8]:px-8 [&_span]:text-sm sm:[&_span]:text-base lg:[&_span]:text-lg [&>div]:h-[45px] [&>div]:w-[105px] sm:[&>div]:h-[50px] sm:[&>div]:w-[200px] lg:[&>div]:h-[56px] lg:[&>div]:w-[250px]">
                    {group.label}
                  </Button>
                </TabsPrimitive.Trigger>
              ))}
            </TabsList>
            {/* Tab Content */}
            <ScrollParchmentWrapper tabGroups={tabGroups} />
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default CyberpunkTimeline;

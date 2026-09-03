"use client";
import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
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
  const containerRef = useRef(null);

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

  // Map the smoothed velocity to a tiny rotation wobble
  // Clamps at 1.5 degrees so it never rotates aggressively
  const rollerWobble = useTransform(
    smoothVelocity,
    [-0.5, 0, 0.5],
    ["-1.5deg", "0deg", "1.5deg"],
  );

  // Animates the clip path to reveal the parchment from top to bottom
  const clipPath = useTransform(scrollYProgress, (p) => {
    const clamped = Math.max(0, Math.min(1, p));
    return `inset(0px 0px calc((100% - 100px) * ${1 - clamped}) 0px)`;
  });

  // Translates the bottom roller downwards exactly in sync with the clip path,
  // with a small extra downward shift (+ 24px * p) for a subtle physical unrolling effect.
  const bottomRollerTop = useTransform(scrollYProgress, (p) => {
    const clamped = Math.max(0, Math.min(1, p));
    return `calc(100px + (100% - 100px) * ${clamped} + ${clamped * 24}px)`;
  });

  // Texture rotation to simulate physical unrolling
  const rollerTextureY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0px", "-250px"],
  );

  return (
    <div ref={containerRef} className="relative mx-auto my-10 w-full max-w-4xl">
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
        className="relative z-10 w-full"
        style={{
          clipPath,
          filter: "url(#torn-edge)",
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
        <div className="relative z-10 px-8 py-20 sm:px-16 md:px-24">
          {tabGroups.map((group) => (
            <TabsContent
              key={group.id}
              value={group.id}
              className="mt-0 outline-none"
            >
              <div className="flex flex-col gap-10">
                {group.days.map((day) => (
                  <div key={day.id} className="flex flex-col gap-16">
                    {day.events.map((event) => (
                      <div
                        key={event.id}
                        className="relative flex flex-col gap-3 border-b border-[#C8A24C]/20 pb-10 last:border-b-0"
                      >
                        {/* Time */}
                        <div
                          className="text-sm font-bold tracking-[0.15em] text-[#C8A24C] uppercase"
                          style={{ fontFamily: "'Cinzel', serif" }}
                        >
                          {event.displayTime}
                        </div>

                        {/* Title and Speaker */}
                        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                          <div className="flex flex-1 items-start gap-3">
                            <div className="mt-1 flex items-center justify-center text-2xl text-[#C8A24C]">
                              {event.icon}
                            </div>
                            <h3 className="font-norse-bold text-3xl font-bold tracking-wide text-[#F6CC60]">
                              {event.title}
                            </h3>
                          </div>

                          {(event.speaker || event.role) && (
                            <div className="mt-2 flex flex-col text-sm font-semibold tracking-wide text-[#a98f6d] md:mt-0 md:max-w-[40%] md:text-right">
                              {event.speaker && <span>- {event.speaker}</span>}
                              {event.role && (
                                <span className="opacity-80">{event.role}</span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-[16px] leading-relaxed font-medium text-[#dcd1c2]">
                          {event.description}
                        </p>

                        {/* Venue */}
                        {event.venue && (
                          <div className="mt-2 flex justify-end text-sm font-semibold tracking-wide text-[#a98f6d]">
                            <span>@ {event.venue}</span>
                          </div>
                        )}
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
        className="absolute left-[-2%] z-20 h-14 w-[104%] -translate-y-1/2 drop-shadow-[0_20px_25px_rgba(0,0,0,0.95)]"
        style={{ top: bottomRollerTop, rotate: rollerWobble }}
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
      label: "Nov 6",
      days: markers.slice(0, Math.ceil(markers.length / 3)),
    },
    {
      id: "phase-2",
      label: "Nov 7",
      days: markers.slice(
        Math.ceil(markers.length / 3),
        Math.ceil((markers.length * 2) / 3),
      ),
    },
    {
      id: "phase-3",
      label: "Nov 8",
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

        <div className="mx-auto max-w-6xl px-6">
          <Tabs defaultValue="phase-1" className="w-full">
            {/* Tab Navigation */}
            <TabsList className="mx-auto mb-10 flex w-full max-w-4xl flex-wrap justify-center gap-4 bg-transparent p-0 sm:gap-6">
              {tabGroups.map((group) => (
                <TabsPrimitive.Trigger key={group.id} value={group.id} asChild>
                  <Button className="flex justify-center transition-all duration-300 data-[state=active]:brightness-125 data-[state=active]:drop-shadow-[0_0_15px_rgba(200,160,40,0.8)]">
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

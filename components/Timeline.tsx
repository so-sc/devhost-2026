"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { markers } from "../assets/data/timeline";
import DecryptText from "./animated/TextAnimation";
import localFont from "next/font/local";
import TextReveal from "./animated/TextReveal";


const CornerBorder = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 42 42"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 18V8a6 6 0 0 1 6-6h10"
      stroke="#C8A24C"
      strokeWidth="1.4"
      strokeLinecap="round"
    />

    <path
      d="M2 28V22H8V16H14"
      stroke="#C8A24C"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <circle cx="8" cy="8" r="1.8" fill="#C8A24C" />
  </svg>
);

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
    <div className="relative min-h-screen overflow-hidden pb-24">
      <div className="fixed inset-0 -z-30" 
        style={{
          background: `radial-gradient(circle at top,
          rgba(200,162,76,0.06),
          transparent 45%),  radial-gradient(circle at bottom,
          rgba(255,255,255,0.02),
          transparent 65%), linear-gradient(
          180deg,
        #1a1a1a 0%,
        #121212 50%,
        #0b0b0b 100%)`,
        }} />

       

      <div className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:"radial-gradient(circle, transparent 45%, rgba(0,0,0,.55) 100%)",

        }}/>

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
          text=" Journey of Events"
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
          <TabsList className="mx-auto mb-10 grid w-full max-w-4xl grid-cols-3 gap-4 bg-transparent p-0">
            {tabGroups.map((group) => (
              <TabsTrigger
                key={group.id}
                value={group.id}
                className="relative rounded-[3px] border border-[#a9744859] bg-gradient-to-b from-[#211c17] to-[#16130f] px-3 py-4 text-sm tracking-[0.15em] text-[#b3a793] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),inset_0_-3px_6px_rgba(0,0,0,0.5),0_3px_8px_rgba(0,0,0,0.45)] transition-all data-[state=active]:border-[#e3c98f] data-[state=active]:bg-gradient-to-b data-[state=active]:from-[#e3c98f] data-[state=active]:via-[#a97448] data-[state=active]:to-[#6e4a2c] data-[state=active]:font-semibold data-[state=active]:text-[#241a0e] data-[state=active]:shadow-[inset_0_1px_0_rgba(255,255,255,0.35),inset_0_-3px_6px_rgba(0,0,0,0.25),0_0_22px_rgba(207,169,106,0.45),0_4px_10px_rgba(0,0,0,0.5)]">
                {group.label}
                <div className="absolute left-1 top-1 h-2.5 w-2.5 border-l border-t border-[#C8A24C]/60" />
                <div className="absolute bottom-1 right-1 h-2.5 w-2.5 border-r border-b border-[#C8A24C]/60" />

              </TabsTrigger>
            ))}
          </TabsList>
          {/* Tab Content */}
          {tabGroups.map((group) => (
            <TabsContent key={group.id} value={group.id} className="mt-0">
              <div className="mx-auto max-w-4xl space-y-8">
                {group.days.map((day) => (
                  <div key={day.id} className="relative flex">
                    {/* Timeline vertical line */}
                    <div className="absolute top-1 left-[-30px] h-[calc(100%-8px)] w-[2px]"
                    style={{background:"linear-gradient(180deg, rgba(169,116,72,0), #a97448 8%, #a97448 92%, rgba(169,116,72,0))",
                      boxShadow:"0 0 8px rgba(169,116,72,0.4)",}}/>

                    {/* Events Grid */}
                    <div className="flex w-full flex-col items-center gap-12">
                      {day.events.map((event) => (
                        <div
                          key={event.id}
                          className="relative w-full max-w-4xl rounded-[20px] border border-[#a9744866] bg-gradient-to-br from-[#1c1815] via-[#131110] to-[#17130f]
                          p-6 pt-7 pl-16 shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_8px_20px_rgba(0,0,0,0.5)]">
                            <div className="absolute top-3 -left-[3.15rem] flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#e3c98f] text-[#2a1c0f]"
                            style={{background:"radial-gradient(circle at 35% 30%, #d9b378, #a97448 55%, #6e4a2c 100%)",
                              boxShadow:"0 0 0 3px #171412, 0 0 14px rgba(207,169,106,0.4), inset 0 2px 3px rgba(255,255,255,0.35), inset 0 -3px 5px rgba(0,0,0,0.4)",}}>
                                <span className="text-lg leading-none">
                                  {event.icon} 
                                  </span>
                                  </div>
                                  <CornerBorder className="absolute top-2 right-2 z-20 h-8 w-8 rotate-90" />
                                  <CornerBorder className="absolute bottom-2 left-2.5 z-20 h-8 w-8 -rotate-90" />
                          {/* Time badge */}

                          <div className="absolute -top-3 left-16">
                            <div className="rounded-[8px] border border-[#6e4a2c] px-4 py-1.5 text-[#171412] shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-2px_3px_rgba(0,0,0,0.25),0_2px_5px_rgba(0,0,0,0.4)]"
                              style={{
                                background:"linear-gradient(180deg, #e3c98f, #a97448)",
                                fontFamily: "'Cinzel', serif",
                              }}>
                              <span className="text-xs font-semibold tracking-wide">
                                {event.displayTime}
                              </span>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="mt-6 text-gray-200">
                            {/* Title row with meta on right */}
                            <div className="flex flex-col items-start justify-between sm:flex-row">
                              
                              {/* Icon + Title + Description */}
                              <div className="min-w-full flex-1 space-y-2">
                                <div className="flex w-full flex-col items-baseline justify-between gap-3 md:flex-row">
                                  <div className="flex">
                                    
                                    <h3 className="font-dalek pl-2 leading-tight font-bold">
                                      {event.title}
                                    </h3>
                                  </div>

                                  {/* Meta (speaker + role) */}
                                  <div className="flex w-full flex-col items-end text-right text-xs sm:pb-0 ">
                                    {event.speaker && (
                                      <div className="font-dalek flex items-center justify-end gap-2 text-xs sm:text-sm ">
                                        <TextReveal
                                          text={event.speaker}
                                         
                                          className="text-primary text-lg font-medium"
                                        />
                                      </div>
                                    )}
                                    {event.role && (
                                      <div className="text-primary/70">
                                        {event.role}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <p className="border-t border-[#a9744840] pt-3 pb-2 text-[15px] leading-relaxed text-[#b3a793]">
                                  {event.description}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Venue */}
                          {event.venue && (
                            <div className="mt-1 flex justify-end">
                              <div className="">
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-black/30 px-3 py-1
                                text-[11px] font-semibold text-[#2a1c0f] shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_2px_4px_rgba(0,0,0,0.4)]"
                                style={{background:"linear-gradient(180deg, #c99566, #6e4a2c)",}}>
                                  <span>@</span>
                                  <span>{event.venue}</span>
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Corner accents 
                          <div className="absolute top-0 right-0 h-6 w-6">
                            <div className="border-primary/70 absolute top-1 right-1 h-3 w-3 border-t border-r"></div>
                          </div>
                          <div className="absolute bottom-0 left-0 h-6 w-6">
                            <div className="border-primary/70 absolute bottom-1 left-1 h-3 w-3 border-b border-l"></div>
                          </div>*/}
                        </div>
                        
                        
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default CyberpunkTimeline;

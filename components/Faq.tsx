"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import DecryptText from "./animated/TextAnimation";

gsap.registerPlugin(ScrollTrigger);

const faqData = [
  {
    question: "Who is eligible to participate in the hackathon?",
    answer:
      "All students from colleges and universities are eligible to participate. Both undergraduate and graduate students can join the hackathon.",
  },
  {
    question: "Do all team members need to register and pay individually?",
    answer:
      "Yes, each team member needs to register individually and pay the registration fee separately to secure their spot in the hackathon.",
  },
  {
    question: "Can I participate as an individual or do I need a team?",
    answer:
      "You can participate both as an individual or as part of a team. Teams can have 2-4 members maximum.",
  },
  {
    question: "Can students from different colleges be in the same team?",
    answer:
      "No, all team members must be from the same college or university. Cross-college teams are not allowed.",
  },
  {
    question: "Will there be mentors or workshops during the hackathon?",
    answer:
      "Yes, we will have experienced mentors available throughout the event and conduct workshops on various technologies and development practices.",
  },
  {
    question: "What resources will be provided during the hackathon?",
    answer:
      "We provide WiFi, power outlets, meals, snacks and technical support throughout the event.",
  },
  {
    question: "How can I stay informed about event updates and announcements?",
    answer:
      "Follow our social media channels, join our Discord server, and check your registered email regularly for all updates and announcements.",
  },
];

const GreekCorner = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 42 42"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 18V8a6 6 0 0 1 6-6h10"
      stroke="#F6CC60"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <path
      d="M2 28V22H8V16H14"
      stroke="#F6CC60"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="8" cy="8" r="1.8" fill="#F6CC60" />
  </svg>
);

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (itemsRef.current) {
        const items = itemsRef.current.querySelectorAll("[data-faq-item]");
        gsap.fromTo(
          items,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: itemsRef.current,
              start: "top 20%",
              end: "bottom 30%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-[#0a0a0a] py-24 text-white md:px-8"
    >
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at top, rgba(246,204,96,0.06), transparent 45%),
            radial-gradient(circle at bottom, rgba(255,255,255,0.02), transparent 70%),
            linear-gradient(180deg,#191919 0%,#121212 55%,#090909 100%)
          `,
        }}
      />
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at center, rgba(45,45,45,.65) 0%, rgba(18,18,18,.92) 60%, #090909 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle, transparent 40%, rgba(0,0,0,.65) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-4xl">
        {/* Title */}
        <div className="relative mb-16 text-center">
          <h2 className="font-norse-bold mb-6 inline-block text-5xl text-[#F6CC60] uppercase md:text-7xl">
            FAQ
          </h2>

          <DecryptText
            text="> Answers to Common Questions"
            startDelayMs={200}
            trailSize={6}
            flickerIntervalMs={50}
            revealDelayMs={100}
            className="font-norse text-primary h-8 text-base tracking-wider text-[#F6CC60]/80 md:text-xl"
          />

          <div className="mx-auto mt-6 flex max-w-sm items-center gap-4">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#F6CC60] to-transparent" />
            <div className="h-3 w-3 rotate-45 border border-[#F6CC60]" />
            <div className="h-px flex-1" />
          </div>
        </div>

        <div ref={itemsRef}>
          <Accordion type="single" collapsible className="space-y-5">
            {faqData.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                data-faq-item
                className="group relative border-0 bg-transparent"
              >
                <div className="relative rounded-xl border border-[#6C5730] bg-[#23201A]/40 shadow-[0_20px_60px_rgba(0,0,0,.55)] backdrop-blur-md transition-all duration-300 group-hover:border-[#F6CC60]">
                  <div className="absolute top-0 left-0 h-full w-1 origin-top scale-y-0 transform transition-transform duration-300 group-hover:scale-y-100" />

                  <GreekCorner className="absolute top-1 right-1 z-20 h-7 w-7 rotate-90" />
                  <GreekCorner className="absolute right-1 bottom-1 z-20 h-7 w-7 rotate-180" />
                  <GreekCorner className="absolute bottom-1 left-1 z-20 h-7 w-7 -rotate-90" />

                  {/* Content */}
                  <AccordionTrigger className="font-trajan relative px-8 py-6 text-left text-base font-medium text-zinc-200 transition-all duration-300 group-hover:pl-12 group-hover:text-[#F6CC60] md:text-lg">
                    <span className="relative z-10">{faq.question}</span>
                  </AccordionTrigger>

                  <AccordionContent className="font-trajan relative px-8 pb-6 text-sm leading-relaxed text-zinc-300">
                    {/* Divider line */}
                    <div className="mb-6 h-px w-full bg-gradient-to-r from-[#F6CC60] via-[#C89D47]/60 to-[#F6CC60] shadow-[0_0_5px_rgba(246,204,96,.25)]" />

                    <div
                      className="border border-[#6C5730] bg-[#181818]/70 p-4 text-sm leading-relaxed text-zinc-300 backdrop-blur-md"
                      style={{
                        clipPath:
                          "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
                      }}
                    >
                      {faq.answer}
                    </div>
                  </AccordionContent>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

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

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (itemsRef.current) {
        const items = itemsRef.current.querySelectorAll("[data-faq-item]");

        gsap.fromTo(
          items,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: itemsRef.current,
              start: "top 75%",
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
      {/* Background */}
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

     

     

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        {/* Heading */}

        <div className="mb-16 text-center">
      <h2 className="font-norse-bold mb-2 text-6xl font-extrabold tracking-[0.12em] uppercase md:text-8xl">
  <span className="bg-gradient-to-r from-[#F6CC60] via-[#FFF5D0] to-[#C9963E] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(246,204,96,0.3)]">
    FAQ
  </span>
</h2>

      <h3 className="mt-4">
  <DecryptText
    text="Answers to Common Questions"
    startDelayMs={200}
    trailSize={6}
    flickerIntervalMs={50}
    revealDelayMs={100}
    className="font-norse text-lg tracking-[0.10em] text-[#C8A24C]/80 sm:tracking-[0.14em] md:text-2xl"
  />
</h3>
        </div>

        <div ref={itemsRef}>
          <Accordion type="single" collapsible className="space-y-5">
            {faqData.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                data-faq-item
                className="overflow-hidden rounded-xl border border-[#5A4A2B] bg-[#1B1A18]/60 backdrop-blur-md transition-all duration-300 hover:bg-[#23211D]/70"
              >
                <AccordionTrigger className="group px-8 py-6 text-left no-underline hover:no-underline">
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-5">
                      {/* Number */}
                      <span className="font-norse-bold text-2xl leading-none text-[#F6CC60]/80 md:text-2xl">
                        {["Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ", "Ⅵ", "Ⅶ"][index]}
                      </span>

                      {/* Divider */}
                      <div className="h-8 w-px bg-[#F6CC60]/25" />

                      {/* Question */}
                      <h3 className="font-trajan text-base text-zinc-200 transition-all duration-300 md:text-lg">
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-8 pb-7">
                  {/* thin divider */}
                  <div className="mb-6 h-px bg-gradient-to-r from-[#F6CC60]/70 via-[#F6CC60]/20 to-transparent" />

                  <p className="font-trajan max-w-3xl leading-8 text-zinc-400">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

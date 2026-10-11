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
    <section className="relative w-full overflow-visible bg-black px-4 py-18 sm:px-6 sm:py-32">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background: `
    radial-gradient(circle at top,
      rgba(200,162,76,0.06),
      transparent 45%),
    radial-gradient(circle at bottom,
      rgba(255,255,255,0.02),
      transparent 65%),
    linear-gradient(
      180deg,
      #000000 0%,
      #1a1a1a 70%,
      #000000 100%
    )
  `,
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle, transparent 45%, rgba(0,0,0,.95) 100%)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, rgba(45,45,45,0.65) 0%, rgba(22,22,22,0.95) 55%, #000000 100%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        {/* Heading */}

        <div className="mb-16 text-center">
          <h2 className="font-norse-bold mb-2 text-6xl font-extrabold tracking-[0.12em] uppercase md:text-8xl">
            <span className="from-gold via-gold-light to-gold-deep bg-gradient-to-r bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(246,204,96,0.3)]">
              FAQ
            </span>
          </h2>

          <h3 className="font-norse text-gold-antique/80 text-lg font-semibold tracking-[0.10em] sm:tracking-[0.14em] md:text-2xl">
            Answers to Common Questions
          </h3>
        </div>

        <div className="font-lora px-4 pb-8" ref={itemsRef}>
          <Accordion type="single" collapsible className="space-y-5">
            {faqData.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                data-faq-item
                className="border-gold-bronze bg-dark-card/60 last:border-gold-bronze hover:bg-dark-card-hover/70 relative overflow-hidden rounded-xl border backdrop-blur-md transition-all duration-300 last:border-b"
              >
                <AccordionTrigger className="group px-8 py-6 text-left no-underline hover:no-underline">
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-5">
                      {/* Number */}
                      <span className="font-norse-bold text-gold/80 text-2xl leading-none md:text-2xl">
                        {["Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ", "Ⅵ", "Ⅶ"][index]}
                      </span>

                      {/* Divider */}
                      <div className="bg-gold/25 h-8 w-px" />

                      {/* Question */}
                      <h3 className="text-base text-zinc-200 transition-all duration-300 md:text-lg">
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-8 pb-7">
                  {/* thin divider */}
                  <div className="from-gold/70 via-gold/20 mb-6 h-px bg-gradient-to-r to-transparent" />

                  <p className="max-w-3xl text-base text-zinc-300 md:text-lg">
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

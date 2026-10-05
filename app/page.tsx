"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
// import Counter from "@/components/Counter";
import TimelineSection from "@/components/Timeline";
import Footer from "@/components/Footer";
import FAQ from "@/components/Faq";
import Map from "@/components/Map";
import Events from "@/components/Events";
// import LoadingSpinner from "@/components/LoadingSpinner";
import SponsorsLogo from "@/components/Sponsors";
import CallForSpeakers from "@/components/CallForSpeakers";
import Gallery from "@/components/Gallery";
import Devhack from "@/components/Devhack";

const criticalImages = [
  // ── Hero ──────────────────────────────────────────────
  "/DVHST.png",
  "/hero/herobackground.png",
  "/hero/hero-section-wheel.png",
  "/hero/soldier-left.png",
  "/hero/soldier-right.png",
  "/hero/mobile_hero.png",
  "/hero/mobile_soldier_left.png",
  "/hero/mobile_soldier_right.png",
  "/sosc_logo.svg",
  "/synergia_logo.svg",
  "/sahyadri-logo.png",

  // ── DevHack ───────────────────────────────────────────
  "/assets/devhack/pure-background.webp",
  "/assets/devhack/background.webp",
  "/assets/devhack/leftarm.png",
  "/assets/devhack/rightarm.png",
  "/assets/devhack/DEVHACK.svg",
  "/assets/devhack/dev-hack-logo.svg",

  // ── Sponsors ──────────────────────────────────────────
  "/sponsors/titlesponsor.png",
  "/sponsors/cosponsor.png",
  "/sponsors/acic-logo.png",
  "/sponsors/greek-border.png",
  "/images/sponsor-ornament.png",
  "/images/parchment-sponsor.jpg",
  "/images/parchment-texture.jpg",
  "/sponsor_brick.png",
  "/sponsors/codechef.png",
  "/sponsors/n8n-logo.png",
  "/sponsors/render-logo.png",
  "/sponsors/xyz-logo.png",
  "/sponsors/codecrafters-logo.png",
  "/sponsors/unstop-logo.png",
  "/sponsors/stone-texture-1.png",
  "/sponsors/stone-texture-2.png",
  "/sponsors/stone-texture-3.png",
  "/sponsors/stone-texture-4.png",

  // ── Speakers ──────────────────────────────────────────
  "/gold-frame-greek.png",
  "/speakers/dr-pruthviraj-nitk.jpeg",
  "/speakers/potti.jpg",
  "/speakers/aakansha.jpeg",
  "/speakers/charis-devhost.jpeg",
  "/speakers/Raj Raorane.jpeg",
  "/speakers/Samwin Steve Pereira.jpg",
  "/speakers/RaghuAnand.jpg",
  "/speakers/Suyog.png",
  "/speakers/shashir.png",
  "/speakers/shihab.png",
  "/speakers/amrit shenava.png",
  "/speakers/vivek.jpg",
  "/speakers/swapnil_a.jpg",
  "/images/speakers_ornament.png",

  // ── Events ────────────────────────────────────────────
  "/event/BGMI.png",
  "/event/SOT.png",
  "/event/VOO.png",
  "/event/tst.png",
  "/event/BFF.png",
  "/event/content.jpeg",

  // ── Gallery ───────────────────────────────────────────
  "/images/IMG_1.jpg",
  "/images/IMG_2.webp",
  "/images/IMG_3.webp",
  "/images/IMG_4.webp",
  "/images/IMG_5.webp",
  "/images/IMG_6.webp",
  "/images/IMG_7.webp",
  "/images/IMG_8.webp",
  "/images/IMG_9.webp",
  "/images/IMG_10.webp",
  "/images/IMG_11.webp",
  "/images/IMG_12.webp",
  "/images/IMG_13.webp",
  "/images/IMG_14.webp",
  "/images/IMG_15.webp",
  "/images/IMG_16.webp",
  "/images/IMG_17.webp",
  "/images/IMG_18.webp",

  // ── Footer ────────────────────────────────────────────
  "/footer-background/temple.webp",
  "/footer-background/Greek-ring-h.png",
  "/footer-background/background.webp",

  // ── Map ───────────────────────────────────────────────
  "/images/map.png",

  // ── Misc ──────────────────────────────────────────────
  "/logo-group.png",
  "/images/greek-callfs.png",
  "/images/greek-callfs2.png",
  "/images/gold-ribbon.png",
  "/gold-frame-greek.png",
  "/bg-greek.svg",
];

function preloadImages(images: string[]) {
  return Promise.all(
    images.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();

          img.onload = async () => {
            try {
              await img.decode();
            } catch {
              // Image loaded even if decode isn't available/fails
            }
            resolve();
          };

          img.onerror = () => resolve();
          img.src = src;

          if (img.complete) {
            resolve();
          }
        }),
    ),
  );
}

export default function Home() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    preloadImages(criticalImages).then(() => {
      if (mounted) {
        setReady(true);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="text-center">
          <div className="border-primary mx-auto h-12 w-12 animate-spin rounded-full border-b-2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <Hero />
      {/* <Counter /> */}
      {/* <AboutDevhost /> */}
      {/* <SpeakersInfo /> */}
      <CallForSpeakers />
      <div className="relative z-10">
        <SponsorsLogo />
      </div>
      <div className="pointer-events-none relative z-10 -mt-[100vh]">
        <Devhack />
      </div>
      <TimelineSection />
      <Events />
      <Gallery />
      <FAQ />
      <Map />
      <Footer />
    </div>
  );
}

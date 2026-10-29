"use client";

import { Suspense, useEffect, useState } from "react";
import Hero from "@/components/Hero";
// import Counter from "@/components/Counter";
import TimelineSection from "@/components/Timeline";
import Footer from "@/components/Footer";
import FAQ from "@/components/Faq";
import Map from "@/components/Map";
import Events from "@/components/Events";
import LoadingSpinner from "@/components/LoadingSpinner";
import LoadingScreen from "@/components/LoadingScreen";
import SponsorsLogo from "@/components/Sponsors";
import CallForSpeakers from "@/components/CallForSpeakers";
import Gallery from "@/components/Gallery";
import Devhack from "@/components/Devhack";

const criticalImages = [
  "/DVHST.png",
  "/hero/hero-section-wheel.png",
  "/hero/herobackground.png",
  "/hero/mobile_hero.png",
  "/hero/mobile_soldier_left.png",
  "/hero/mobile_soldier_right.png",
  "/hero/soldier-left.png",
  "/hero/soldier-right.png",

  // DevHack
  "/assets/devhack/pure-background.webp",
  "/assets/devhack/background.webp",
  "/assets/devhack/leftarm.png",
  "/assets/devhack/rightarm.png",
  "/assets/devhack/dev-hack-logo.svg",
];

function preloadImages(
  images: string[],
  onProgress?: (loaded: number, total: number) => void
) {
  let loaded = 0;
  const total = images.length;

  return Promise.all(
    images.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();

          const handleDone = () => {
            loaded++;
            onProgress?.(loaded, total);
            resolve();
          };

          img.onload = async () => {
            try {
              await img.decode();
            } catch {
              // Image loaded even if decode isn't available/fails
            }
            handleDone();
          };

          img.onerror = () => handleDone();
          img.src = src;

          if (img.complete) {
            handleDone();
          }
        }),
    ),
  );
}

export default function Home() {
  const [imagesReady, setImagesReady] = useState(false);
  const [loadingFinished, setLoadingFinished] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let mounted = true;

    preloadImages(criticalImages, (loaded, total) => {
      if (mounted) {
        setProgress(Math.round((loaded / total) * 100));
      }
    }).then(() => {
      if (mounted) {
        setImagesReady(true);
        setProgress(100);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  if (!loadingFinished) {
    return (
      <LoadingScreen
        progress={progress}
        isReady={imagesReady}
        onComplete={() => setLoadingFinished(true)}
      />
    );
  }

  return (
    <div className="relative">
      <Suspense fallback={<LoadingSpinner />}>
        <Hero />
        {/* <Counter /> */}
        {/* <Final /> */}
        {/* <AboutDevhost /> */}
        {/* <div className="relative h-[30vh]">
          <div className="absolute top-0 h-24 w-full bg-gradient-to-b from-black/95 via-black/80 to-transparent" />
        </div> */}
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
      </Suspense>

      {/* Background grid */}
      {/*<div className="pointer-events-none fixed inset-0 -z-10 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(#a3ff12 2px, transparent 1px),
              linear-gradient(90deg, #a3ff12 2px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
            backgroundPosition: "center",
          }}
        ></div>
      </div>*/}
    </div>
  );
}

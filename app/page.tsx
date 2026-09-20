"use client";

import { Suspense, useEffect, useState } from "react";
import Hero from "@/components/Hero";
import AboutDevhost from "@/components/AboutDevhost";
// import Counter from "@/components/Counter";
import TimelineSection from "@/components/Timeline";
import Footer from "@/components/Footer";
import FAQ from "@/components/Faq";
import Map from "@/components/Map";
import Events from "@/components/Events";
import LoadingSpinner from "@/components/LoadingSpinner";
import SponsorsLogo from "@/components/Sponsors";
import CallForSpeakers from "@/components/CallForSpeakers";
import Gallery from "@/components/Gallery";
import Devhack from "@/components/Devhack";

const criticalImages = [
  "/logo-group.png",
  "/DVHST.png",

  // DevHack
  "/assets/devhack/pure-background.webp",
  "/assets/devhack/background.webp",
  "/assets/devhack/left-arm.png",
  "/assets/devhack/right-arm.png",
  "/assets/devhack/dev-hack-logo.svg",
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
      <Suspense fallback={<LoadingSpinner />}>
        <Hero />
        {/* <Counter /> */}
        {/* <Final /> */}
        <AboutDevhost />
        {/* <div className="relative h-[30vh]">
          <div className="absolute top-0 h-24 w-full bg-gradient-to-b from-black/95 via-black/80 to-transparent" />
        </div> */}
        {/* <SpeakersInfo /> */}
        <CallForSpeakers />
        <div className="relative z-0">
          <SponsorsLogo />
        </div>
        <div className="relative z-10 -mt-[100vh]">
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

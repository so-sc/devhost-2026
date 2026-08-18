"use client";

import { Suspense, useEffect, useState } from "react";
import Hero from "@/components/Hero";
import AboutDevhost from "@/components/AboutDevhost";
import Footer from "@/components/Footer";
import FAQ from "@/components/Faq";
import Map from "@/components/Map";
import Events from "@/components/Events";
import LoadingSpinner from "@/components/LoadingSpinner";
import SponsorsLogo from "@/components/Sponsors";
import CallForSpeakers from "@/components/CallForSpeakers";
import Gallery from "@/components/Gallery";

const criticalImages = ["/logo-group.png", "/DVHST.png"];

function preloadImages(images: string[]) {
  return Promise.all(
    images.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();

          img.src = src;

          if (img.complete) {
            resolve();
          } else {
            img.onload = () => resolve();
            img.onerror = () => resolve();
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
        {/* <AboutHackathon />
        <TimelineSection /> */}
        {/* <SpeakersInfo /> */}
        <CallForSpeakers />
        <SponsorsLogo />
        <Events />
        <Gallery />
        <FAQ />
        <Map />
        <Footer />
      </Suspense>
    </div>
  );
}

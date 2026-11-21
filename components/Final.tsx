import Image from "next/image";
import React from "react";
import { ClippedCard } from "./ClippedCard";

export default function Final() {
  return (
    <section
      id="sponsors"
      className="bg-dark-obsidian relative w-full overflow-hidden pt-18 text-white"
    >
      <div className="w-full px-2 sm:px-4">
        <ClippedCard>
          <Image
            src="/thanks.jpeg"
            alt="banner"
            width={1200}
            height={675}
            className="h-auto w-full object-cover"
            priority
          />
        </ClippedCard>
      </div>
      <h2 className="font-norse-bold mt-2 text-center text-3xl font-extrabold tracking-[0.12em] uppercase md:text-6xl">
        <span className="from-gold via-gold-light to-gold-deep bg-gradient-to-r bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(246,204,96,0.3)]">
          See You Next Time !
        </span>
      </h2>
    </section>
  );
}

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/hackathon/register",
        destination:
          "https://unstop.com/p/devhack-2026-devhost-2026-sahyadri-open-source-community-1759829",
        permanent: false,
      },
      {
        source: "/ctf/register",
        destination: "https://unstop.com/p/siege-of-troy-ctf-devhost-2026-sahyadri-open-source-community-1738040",
        permanent: false,
      },
      {
        source: "/cp/register",
        destination: "https://unstop.com/p/the-sphinx-trial-cp-devhost-2026-sahyadri-open-source-community-1738042",
        permanent: false,
      },
      {
        source: "/tech-pitch/register",
        destination: "https://unstop.com/p/voice-of-the-oracle-tech-pitch-devhost-2026-sahyadri-open-source-community-1738041",
        permanent: false,
      },
      {
        source: "/content-creation/register",
        destination: "https://unstop.com/p/mythic-canvas-content-creation-competition-devhost-2026-sahyadri-open-source-community-1760229?section=contact",
        permanent: false,
      },
      {
        source: "/bgmi/register",
        destination: "https://unstop.com/p/arena-of-ares-bgmi-devhost-2026-sahyadri-open-source-community-1737815",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

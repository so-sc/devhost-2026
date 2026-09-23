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
        destination: "https://unstop.com/m/opportunity/1738040/step3",
        permanent: false,
      },
      {
        source: "/cp/register",
        destination: "https://unstop.com/m/opportunity/1738042/step3",
        permanent: false,
      },
      {
        source: "/tech-pitch/register",
        destination: "https://unstop.com/m/opportunity/1738041/step3",
        permanent: false,
      },
      {
        source: "/content-creation/register",
        destination: "https://unstop.com/m/opportunity/1760229/step3",
        permanent: false,
      },
      {
        source: "/bgmi/register",
        destination: "https://unstop.com/m/opportunity/1737815/step3",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
